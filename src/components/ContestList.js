
import React from 'react';
import PropTypes from 'prop-types';

import ContestPreview from './ContestPreview';


const ContestList = ({ contests, onContestClick }) => (
    <div className="ContestList">
      {Object.keys(contests).map(contestId =>
        <ContestPreview
          key={contestId}
          onClick={onContestClick}
          {...contests[contestId]} />
      )}
    </div>
  );

/* defination of array */
ContestList.proptypes = {
  contests: PropTypes.object,
  onContestClick: PropTypes.func.isRequired,
};

export default ContestList;