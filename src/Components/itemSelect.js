import React, { Component } from "react";
import selectScreens from "../images/selectScreens.png";

import items from "./items";

let { heal, buff, swift } = items;
class itemSelect extends Component {
  render() {
    return (
      <div className="scene">
        <img id="background" src={selectScreens} />

        <div id="selectArea">
          <h2 className="selectTitle">Select your item</h2>
          <img className="avatarImage" alt="player Avatar" src={this.props.player.avatar}></img>
          <table>
            <thead>
              <tr>
                <th>Str:</th>
                <th>Dex:</th>
                <th>Weapon:</th>
                <th>Armor:</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.props.player.str}</td>
                <td>{this.props.player.dex}</td>
                <td>
                  <img
                    alt={this.props.player.weapon.name}
                    src={this.props.player.weapon.img}
                  ></img>
                </td>
                <td>
                  <img
                    alt={this.props.player.armor.name}
                    src={this.props.player.armor.img}
                  ></img>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="selectTitle row justify-content-center m-auto">
          <div className="col-3 col-lg-2 border">
          <img
                alt="heal"
                src={heal.img}
                
              ></img><button className="btn button border" 
                  onClick={() => {
                    this.props.setItem(heal);
                  }}
                >
                  heal 
                </button>
                <p>heals 6 hp immediately</p>
              </div>
              <div className="col-3 col-lg-2 border">
              <img
                alt="buff"
                src={buff.img}
                
              ></img>
                <button className="btn button border" 
                  onClick={() => {
                    this.props.setItem(buff);
                  }}
                >
                  buff
                </button>
                <p> +6 dmg next attack</p>
              </div>
              <div className="col-3 col-lg-2 border">
              <img
                alt="swift"
                src={swift.img}
                
              ></img>
                <button className="btn button border" 
                  onClick={() => {
                    this.props.setItem(swift);
                  }}
                >
                  swift 
                </button>
                <p>+6 dex next attack</p>
              </div>
            
          </div>
        </div>
      </div>
    );
  }
}

export default itemSelect;
