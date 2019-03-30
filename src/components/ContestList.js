
import React from 'react';
import PropTypes from 'prop-types';

import ContestPreview from './ContestPreview';


const ContestList = (props) => {
    return (
        <div className="ContestList">
            {props.contests.map(c =>
                <ContestPreview key={c.id} contest={c} />
            )}
        </div>
    );
};

ContestList.proptypes = {
    contests: PropTypes.array,
};

export default ContestList;