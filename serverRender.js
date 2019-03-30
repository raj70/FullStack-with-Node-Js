//fetch data from api and make them available for client (index.js)

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import axios from 'axios'

import config from './config';
import App from './src/components/App';


const serverRender = () =>
    axios.get(`${config.getServerUrl()}/api/contests`)
        .then(resp => {
            return {
                initialData: resp.data.data,
                initialDom: ReactDOMServer.renderToString( <App initialContests={resp.data.data} /> ),  /* if the client has turn off javascript on their browser*/                     
            };
        })
        .catch(console.error);

export default serverRender;