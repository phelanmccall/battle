import React, { Component } from "react";
import items from "./items";
let { dagger, longsword, axe } = items;
class weaponSelect extends Component {
  state = {
    error: "",
  };
  render() {
    return (
     <div>
       <img alt="player Avatar" src={this.props.player.avatar}></img>
       <div>Str: {this.props.player.str}</div>
       <div>dex: {this.props.player.dex}</div>

    <div>
        <div>
          Select your weapon
           
        </div>
        <div>
        <div>{this.state.error}</div>
        
            <div>
              <button
                onClick={() => {
                  this.props.setWeapon(dagger);
                }}
              >
                Dagger
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  if (this.props.player.str >= longsword.minStr) {
                    this.props.setWeapon(longsword);
                  } else {
                    this.setState({ error: "Error: Insufficient Strength" });
                  }
                }}
              >
                Long Sword
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  if (this.props.player.str >= axe.minStr) {
                    this.props.setWeapon(axe);
                  } else {
                    this.setState({ error: "Error: Insufficient Strength" });
                  }
                }}
              >
                Axe
              </button>
            </div>
          
        </div>
      </div>
   
     </div> );
  }
}

export default weaponSelect;
