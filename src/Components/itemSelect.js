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
        <div>
        <div>
        
            <div>Select your item</div>
            
        </div>
        <div>
          <div>{this.state.error}</div>
          <div>
            <div>
              <button
                onClick={() => {
                  this.props.setItem(heal);
                }}
              >
                heal ( +6 hp )
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                    this.props.setItem(buff);
            
                }}
              >
                buff ( +6 dmg next attack )
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                    this.props.setItem(swift);
                
                }}
              >
                swift ( +6 dex next attack )
              </button>
            </div>
          </div>
        </div>
      </div>
   
     </div> );
  }
}

export default itemSelect;
