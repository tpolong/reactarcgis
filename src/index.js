import React from 'react';
import ReactDOM from 'react-dom';
import MapControl  from './components/MapControl';
import Toggle from './components/Toggle';

let node =document.getElementById('root')
ReactDOM.render(
    <div><MapControl view={{value:true}}/><Toggle/></div>
    ,
node);


