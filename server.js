/* importing component that is used in server */
import config, {  nodeEnv} from './config';
/* importing router from /api/index/js*/
import apiRouter from './api';

/* this serverRender helps us to render react's content if user has disabled javascript on their browser */
import serverRender from './serverRender';

/* importing from library */
import express from 'express';
import sassMidware from 'node-sass-middleware';
import path from 'path';
import bodyParser from 'body-parser';
/* or
/var path = require('path'); */

/*  */
const server = express();

/* middleware */
server.use(
  sassMidware({
    src: path.join(__dirname, 'sass'),
    dest: path.join(__dirname, 'public'),
    debug: true,
    outputStyle: 'compressed',
  })
);

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
  extended: true
}));


/* setting up the EJS */
server.set('view engine', 'ejs');


server.get(['/', '/contest/:contestId'], (req, res) => {
  //res.send("Hello Express");
  serverRender()
    .then(({
      initialData,
      initialDom
    }) => {
      return res.render('index', {
        /*ejs will look index.ejs in views folder */
        initialData: initialData,
        initialDom: initialDom
      });
    })
    .catch(error =>{
      res.status(404).send('Bad Request');
    });
});

/* use router from /api/index.js */
server.use('/api', apiRouter);

/* express has static method that can server static file from a folder */
server.use(express.static('public'));

//server.get("/about.html", (req, res) => {
//    fs.readFile('./about.html', (error, data) => {
//        res.send(data.toString());
//    });
//});

server.listen(config.port, config.host, () => {
  console.info('Express listening on port ', config.port, config.host);
});