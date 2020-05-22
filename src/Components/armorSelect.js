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
      <div>
        <div>Select your armor</div>
        <div>
        
          <div>
            <button
              onClick={() => {
                this.props.setArmor(cloth);
              }}
            >
              Cloth
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                this.props.setArmor(leather);
              }}
            >
              Leather
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                this.props.setArmor(plate);
              }}
            >
              Plate
            </button>
          </div>
          
        </div>
      </div>
    
      </div>
    );
  }
}

export default armorSelect;
