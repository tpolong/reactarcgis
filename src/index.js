import React from 'react';
import ReactDOM from 'react-dom';


import {Scene } from '@esri/react-arcgis';
import BermudaTriangle from './BermudaTriangle';
import Toggle from './Toggle';


ReactDOM.render(
    <div id='r'>
        <BermudaTriangle/>
        <Toggle/>
    </div>
    ,
  document.getElementById('root')
);

