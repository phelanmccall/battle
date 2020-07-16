import React, { Component } from "react";
import selectScreens from "../images/selectScreens.png";

import items from "./items";
let { cloth, leather, plate } = items;
class armorSelect extends Component {
  render() {
    return (
      <div className="scene">
        <img id="background" src={selectScreens} />

        <div id="selectArea">
          <h2 className="selectTitle">Select your armor</h2>

          <img
            className="avatarImage"
            alt="Player Avatar"
            src={this.props.player.avatar}
          ></img>
          <table>
            <thead>
              <tr>
                <th>Str:</th>
                <th>Dex:</th>
                <th>Weapon:</th>
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
                
              </tr>
            </tbody>
          </table>
          <div className="selectTitle row justify-content-center m-auto">
            <div className="col-3 col-lg-2 border">
            <img
                alt="cloth"
                src={cloth.img}
                
              ></img>
              <button className="btn button border"  onClick={() => {
                  this.props.setArmor(cloth);
                }}>{cloth.name}</button>
              <br />
             
              <p>
                Def: {cloth.defense}
                <br />
                Dex effect: {cloth.dex}
              </p>
            </div>
            <div className="col-3 col-lg-2 border">
            <img
                alt="leather"
                src={leather.img}
                
              ></img>
              <button className="btn button border"  onClick={() => {
                  this.props.setArmor(leather);
                }}>{leather.name}</button>
              <br />
              
              <p>
                Def: {leather.defense}
                <br />
                Dex effect: {leather.dex}
              </p>
            </div>
            <div className="col-3 col-lg-2 border">
            <img
                alt="plate"
                src={plate.img}
                
              ></img>
              <button className="btn button border"  onClick={() => {
                  this.props.setArmor(plate);
                }}>{plate.name}</button >
              <br />
              
              <p>
                Def: {plate.defense}
                <br />
                Dex effect: {plate.dex}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default armorSelect;
