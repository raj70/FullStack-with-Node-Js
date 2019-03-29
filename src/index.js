import React from 'react';
import ReactDOM from 'react-dom';

import App from "./components/App";
ReactDOM.render(    
    /* the initialdata is made by serverRender.js */
    <App initialContests={window.initialData} />,
    document.getElementById("root")
);
