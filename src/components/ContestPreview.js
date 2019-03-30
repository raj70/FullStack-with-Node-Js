import React, { Component } from 'react';

import PropTypes from 'prop-types';


class ContestPreview extends Component {

    state = {

    };

    handleClick = () => {
        console.log(this.props.contest.contestName);
    };

    render() {
        return (
            <div className="link ContestPreview" onClick={this.handleClick}>
                <div className="category-name">
                    {this.props.contest.categoryName}
                </div>
                <div className="contest-name">
                    {this.props.contest.contestName}
                </div>
            </div>
        );   
    };
};

/*
const ContestPreview = (props) => (
    <div className="ContestPreview">        
        <div className="category-name">
                {props.contest.categoryName}
        </div>
        <div className="contest-name">
                {props.contest.contestName}
            </div>
       </div>
    );

*/

ContestPreview.propTypes = {
    categoryName: PropTypes.string.isRequired,
    contestName: PropTypes.string.isRequired,

};

ContestPreview.defaultProps = {
    categoryName: "",
    contestName: ""
}


export default ContestPreview;