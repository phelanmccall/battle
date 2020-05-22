import React, { Component } from "react";
import items from "./items";
let { cloth, leather, plate } = items;
class armorSelect extends Component {
  render() {
    return (
      <div>
        <img alt="Player Avatar" src={this.props.player.avatar}></img>
      <div>Str: {this.props.player.str}</div>
      <div>dex: {this.props.player.dex}</div>
      <div>Weapon: {this.props.player.weapon.name}</div>
      <table className="selectTable">
        <thead><tr><th></th><th>Select your armor</th><th></th></tr></thead>
        <tbody>
          <tr>
          <td>
            <button
              onClick={() => {
                this.props.setArmor(cloth);
              }}
            >
              Cloth
            </button>
          </td>
          <td>
            <button
              onClick={() => {
                this.props.setArmor(leather);
              }}
            >
              Leather
            </button>
          </td>
          <td>
            <button
              onClick={() => {
                this.props.setArmor(plate);
              }}
            >
              Plate
            </button>
          </td>
          </tr>
        </tbody>
      </table>
    
      </div>
    );
  }
}

export default armorSelect;
