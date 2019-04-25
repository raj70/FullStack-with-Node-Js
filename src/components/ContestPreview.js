import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ContestPreview extends Component {
  handleClick = () => {
    this.props.onClick(this.props._id);
  };
  render() {
    return (
      <div className="link ContestPreview" onClick={this.handleClick}>
        <div className="category-name">
          {this.props.categoryName}
        </div>
        <div className="contest-name">
          {this.props.contestName}
        </div>
      </div>
    );
  }
}

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
  _id: PropTypes.string,
  categoryName: PropTypes.string.isRequired,
  contestName: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

ContestPreview.defaultProps = {
  categoryName: '',
  contestName: ''
};


export default ContestPreview;