import React from "react";
import emitter from './events';

export default class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: true
        };
      this.handleClick =this.handleClick.bind(this)
    }

    handleClick=()=>{
        this.setState({
            isToggleOn: !this.state.isToggleOn
        });
        emitter.emit('ViewChange',this.state.isToggleOn)
    }

    render() {
        return (
            <div id = "infoDiv" >
                <input className = "esri-component esri-widget&#45;&#45;button esri-widget esri-interactive"
                       type = "button" id = "switch-btn" value = {this.state.isToggleOn ? '2D' : '3D'} onClick={this.handleClick} />
            </div>
        );
    }
}

