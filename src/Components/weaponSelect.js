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

        <table className="selectTable">
        <thead>
          <tr>
            <th></th>
            <th>Select your weapon</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><div>{this.state.error}</div></td>
          </tr>
          <tr>
            <td>
              <button
                onClick={() => {
                  this.props.setWeapon(dagger);
                }}
              >
                Dagger
              </button>
            </td>
            <td>
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
            </td>
            <td>
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
            </td>
          </tr>
        </tbody>
      </table>
   
     </div> );
  }
}

export default weaponSelect;
