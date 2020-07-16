import React, { Component} from "react";
import splashScreen from "../images/splashscreen.png";

class splashScene extends Component {
    render() {
      return (<div className="scene">
          <img id="background"  src={splashScreen}/>
        <button className="btn border" id="startButton" onClick={this.props.start}>Press to START</button>
    </div>);
    }
}

export default splashScene;
