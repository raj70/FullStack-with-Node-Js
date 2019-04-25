import React from 'react';
import Proptypes from 'prop-types';

import Header from './Header';
import ContestList from './ContestList';
import Contest from './Contest';
import * as api from '../api';


//import axios from 'axios';

/** placing to browser history */
const pushState = (obj, url) =>
  window.history.pushState(obj, '', url);

const onPopState = handle=>{
  window.onpopstate = handle;
};

class App extends React.Component {

    static propTypes = {
      initialData: Proptypes.object,
      currentContestId: Proptypes.Number
    };

    state = this.props.initialData;
   
    /*
      state = {
          pageHeader: "Naming Contests",
          contests: this.props.initialContests || []
      };
      */

    componentDidMount() {
      onPopState(event => {
        this.setState({
          currentContestId: (event.state || {}).currentContestId
        });
      });
      //console.log("Mounted");
      // debugger;
      /* this is ok if the client goes to get data from server */
      //axios.get('/api/contests')
      //    .then(result => {
      //        this.setState(
      //            {
      //                contests: result.data.data,
      //            }
      //        );
      //        //console.log(result.data.data);
      //    })
      //    .catch(console.error);
    }

    componentWillUnmount() {
      onPopState(null);
    }

    fetchContest = (contestId) => {
      pushState(
        { currentContestId: contestId },
        `/contest/${contestId}`
      );
      api.fetchContest(contestId).then(contest => {
            
        /* console.log('fetchContest', contest); */

        this.setState({
          currentContestId: contest._id,
          contests: {
            ...this.state.contests,
            [contest._id]: contest
          }
        }, () =>{ });
      });
    };

      /** place root to browser history and setstate */
      fetchContestList = () => {
        pushState(
          { currentContestId: null },
          '/'
        );
        api.fetchContestList().then(contests => {
          this.setState({
            currentContestId: null,
            contests
          });
        });
      };

      /** get names from db based on ids: 
       * Note the nameIds must match with nameIds with nameId in Contest.js */
      fetctNames = (nameIds) =>{ 
        if(nameIds.length === 0 ){
          return ;
        }
        api.fetchNames(nameIds).then(names=>{
          this.setState({
            names
          });
        }).catch(console.error);
      };

      lookupName = (nameId) =>{
        if(!this.state.names || !this.state.names[nameId])
        {
          return {name:'...'};
        }
        return this.state.names[nameId];
      }

      addName = (newName, contestId)=>{
        api.newName(newName, contestId).then(res => 
          this.setState({
              contests:{
                ...this.state.contests,
                [res.updatedContest._id]: res.updatedContest
              },
              names:{
                [res.newName._id]: res.newName
              }
          })
        )
      }


      currentContest() {
        return this.state.contests[this.state.currentContestId];
      }
      
      pageHeader() {
        if (this.state.currentContestId) {
          return this.currentContest().contestName;
        }
    
        return 'Naming Contests';
      }
      currentContent() {
        if (this.state.currentContestId) {
          return <Contest  
                contestListClick={this.fetchContestList} 
                fetchNames={this.fetctNames} 
                lookupName={this.lookupName}
                addName={this.addName}
                {...this.currentContest()} />;
        }
    
        return <ContestList onContestClick={this.fetchContest} contests={this.state.contests} />;
      }

      render() {
        return (
          <div className="App">
            <Header message={this.pageHeader()} />
            {this.currentContent()}
          </div>
        );
      }
}


export default App;