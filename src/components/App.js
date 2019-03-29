import React from 'react';
import Proptypes from 'prop-types';

import Header from "./Header";
import ContestPreview from './ContestPreview';


//import axios from 'axios';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pageHeader: "Naming Contests",
            contests: this.props.initialContests || []
        };
    }

    /*
    state = {
        pageHeader: "Naming Contests",
        contests: this.props.initialContests || []
    };
    */

    componentDidMount() {
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
    };

    componentWillUnmount() {
        //console.log("will unmount");
       // debugger;
    };

    render() {    
        return (           
            <div className="App" >
                <Header message={this.state.pageHeader} />
                <div>
                    {this.props.initialContests.map(c =>
                        <ContestPreview key={c.id} contest={c} />
                    )}                    
                </div>
            </div>
        );
    };
}

App.propTypes = {
    initialContests: Proptypes.array
}

export default App;
