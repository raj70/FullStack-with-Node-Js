import React from 'react';

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


export default ContestPreview;