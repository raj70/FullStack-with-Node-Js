/** https://github.com/mongodb/node-mongodb-native */

import express from 'express';
import { MongoClient, ObjectID } from 'mongodb';
import assert from 'assert';
import config from '../config';


const dbName = 'contestdb';

/* create Router */
const router = express.Router();

/* listner for root */
router.get('/contests', (req, res) => {
  let c = {};
  MongoClient.connect(config.mongodbUri,  { useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);  
    db.collection('contests')
      .find({}) /* all contests */      
      .project({
        categoryName: 1,
        contestName: 1
      })
      .each((error, contest)=>{
        assert.equal(null, error);

        if(!contest){
          res.send({contests: c});
          return;
        }      

        c[contest._id] = contest;
      });
    client.close();
  });
});

router.get('/names/:nameIds', (req, res) => {
  let namesIds = req.params.nameIds.split(',').map(ObjectID);
  let names = {};
  MongoClient.connect(config.mongodbUri,  { useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);  

    db.collection('names')
      .find({_id: {$in: namesIds}}) /* find all names for given Ids */  
      .each((error, name)=>{
        assert.equal(null, error);
        if(!name){
          res.send({names});
          return;
        }      

        names[name._id] = name;
      });
    client.close();
  });
});

router.get('/contests/:contestId', (req, res) => { 
  MongoClient.connect(config.mongodbUri,  { useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);  
    db.collection('contests')
      .findOne({_id: ObjectID(req.params.contestId)})
      .then(contest =>{return res.send(contest);})
      .catch(console.error);
    client.close();
  });
});

router.post('/names', (req, res)=>{

  const contestId = (req.body.contestId);
  const name = req.body.newName;

  if(!contestId || !name || name === ''){
    res.status(400).send('Required Name');
  }

  MongoClient.connect(config.mongodbUri,  { useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);

    const db = client.db(dbName);
    db.collection('names').insertOne({ name, timestamp: new Date() }).then(result => {
      console.log('REsult ' , result.ops[0]._id);
      db.collection('contests').findOneAndUpdate(
        {_id : ObjectID(contestId)},
        {$push: {nameIds: result.ops[0]._id}},
        {new: true}
      ).then((error, doc) =>{ 
        console.log(error, doc);
        res.send({
          updatedContest: doc.value,
          newName: { 
            _id: result.insertedId, name
          }
        });
      }).catch(console.error);
    }).catch(error =>{
      //console.log(error);
      res.status(404).send('Bad request');
    });

    client.close();
  });
});

/* export router as default component */
export default router;