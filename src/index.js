import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

ReactDOM.render(    
    /* the initialdata is made by serverRender.js */
    <App initialData={window.initialData} />,
    document.getElementById('root')
);
