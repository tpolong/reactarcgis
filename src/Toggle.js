import * as React from "react";

export default class  Toggle extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: true
        };

        // 这边绑定是必要的，这样 `this` 才能在回调函数中使用
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {

        this.setState({
            isToggleOn: !this.state.isToggleOn
        });
        if(this.state.isToggleOn){
            console.log('2d')
        }else{
            console.log('3d')
        }
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