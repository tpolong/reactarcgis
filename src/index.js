import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

let nodeName='view'
let node =document.getElementById(nodeName)
ReactDOM.render( <App node={nodeName}/>,node);


