import React, { Component } from "react";
import candle from "../images/candle.png";
import bartender from "../images/bartender.png";
import items from "../Components/items";
import selectScreens   from "../images/selectScreens.png";
let {axe, plate} = items;
class avatarSelect extends Component {
  render() {
    return (
      <div className="scene">
       <img id="background"  src={selectScreens }/>

          <div id="selectArea">
            
          <h2 className="selectTitle">
                Select your Avatar
            </h2>
                
                <input
                className="avatarImage"
                alt="Avatar of a candle"
                type="image"
                  src={candle}
                  onClick={() => {
                    this.props.setAvatar(candle);
                  }}
                ></input>
              
                <input
                className="avatarImage"
                alt="Avatar of a bartender"
                type="image"
                  src={bartender}
                  onClick={() => {
                    this.props.setAvatar(bartender);
                  }}
                ></input>
   
          </div>
          {
            this.props.checkpoint ? <button id="loadButton" className="btn border" onClick={this.props.load}>Load checkpoint</button> : ""
          }
          {/* <button onClick={()=>{
            this.props.save({
              player: {
                items: [],
                defending: 1,
                dodge: 0,
                str: 18,
                dex: 18,
                move: 4,
                avatar: bartender,
                default: bartender,
                weapon: axe,
                armor: plate,
                lvl: 15,
                exp: 650,
              },
              level: 20
            })
          }}>prop</button> */}
      </div>  
    );
  }
}

export default avatarSelect;
