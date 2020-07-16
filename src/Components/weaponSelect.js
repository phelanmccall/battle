import React, { Component } from "react";
import selectScreens from "../images/selectScreens.png";

import items from "./items";
let { dagger, longsword, axe } = items;
class weaponSelect extends Component {
  state = {
    error: "",
  };
  render() {
    return (
      <div className="scene">
        <img id="background" src={selectScreens} />

        <div id="selectArea">
          <h2 className="selectTitle">Select your weapon</h2>
          <img
            className="avatarImage"
            alt="player Avatar"
            src={this.props.player.avatar}
          ></img>
          <table>
            <thead>
              <tr>
                
                <th>Str:</th>
                <th>Dex:</th>
                
              </tr>
            </thead>
            <tbody>
              <tr>
             
                <td>{this.props.player.str}</td>
                <td>{this.props.player.dex}</td>
              
              </tr>
            </tbody>
          </table>

          <div className="selectTitle row justify-content-center m-auto">
            <div className="col-3 col-lg-2 border">
              
            <img
                alt="Dagger"
                src={dagger.img}
                
              ></img>
              <button className="btn button border" onClick={() => {
                  this.props.setWeapon(dagger);
                }}>{dagger.name}</button>
              <br />
              
              <p>
                Dmg: {dagger.attackMin}-{dagger.attackMax}
                <br />
                Min str: {dagger.minStr}
              </p>
            </div>
            <div className="col-3 col-lg-2 border">
            <img
                alt="Long Sword"
                src={longsword.img}
                
              ></img>
              <button className="btn button border" onClick={() => {
                  if (this.props.player.str >= longsword.minStr) {
                    this.props.setWeapon(longsword);
                  } else {
                    this.setState({ error: "Error: Insufficient Strength" });
                  }
                }}>{longsword.name}</button>
              <br />
              
              <p>
                Dmg: {longsword.attackMin}-{longsword.attackMax}
                <br />
                Min str: {longsword.minStr}
              </p>
            </div>
            <div className="col-3 col-lg-2 border">
            <img
                alt="Axe"
                src={axe.img}
                
              ></img>
           <button className="btn button border" onClick={() => {
                  if (this.props.player.str >= axe.minStr) {
                    this.props.setWeapon(axe);
                  } else {
                    this.setState({ error: "Error: Insufficient Strength" });
                  }
                }}>{axe.name}</button>
              <br />

              
              <p>
                Dmg: {axe.attackMin}-{axe.attackMax}
                <br />
                Min str: {axe.minStr}
              </p>
            </div>
          </div>

          <div className="selectTitle">{this.state.error}</div>
        </div>
      </div>
    );
  }
}

export default weaponSelect;
