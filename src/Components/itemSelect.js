import React, { Component } from "react";
import items from "./items";
let { heal, buff, swift } = items;
class itemSelect extends Component {
  state = {
    error: "",
  };
  render() {
    return (
     <div>
       <img alt="player Avatar" src={this.props.player.avatar}></img>
       <div>Str: {this.props.player.str}</div>
       <div>dex: {this.props.player.dex}</div>
    <div>Weapon: {this.props.player.weapon.name}</div>
    <div>Armor: {this.props.player.armor.name}</div>
        <table className="selectTable">
        <thead>
          <tr>
            <th></th>
            <th>Select your item</th>
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
                  this.props.setItem(heal);
                }}
              >
                heal ( +6 hp )
              </button>
            </td>
            <td>
              <button
                onClick={() => {
                    this.props.setItem(buff);
            
                }}
              >
                buff ( +6 dmg next attack )
              </button>
            </td>
            <td>
              <button
                onClick={() => {
                    this.props.setItem(swift);
                
                }}
              >
                swift ( +6 dex next attack )
              </button>
            </td>
          </tr>
        </tbody>
      </table>
   
     </div> );
  }
}

export default itemSelect;
