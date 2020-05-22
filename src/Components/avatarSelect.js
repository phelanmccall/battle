import React, { Component } from "react";
import noble from "../images/noble.jpg";
import candle from "../images/candle.png";
import bartender from "../images/bartender.png";

class avatarSelect extends Component {
  render() {
    return (
      <div>
       
            <h2>
                Select your Avatar
            </h2>
          <div>
                <input
                className="avatarImage"
                alt="Avatar of a noble"
                type="image"
                  src={noble}
                  onClick={() => {
                    this.props.setAvatar(noble);
                  }}
                ></input>
              
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
      
      </div>
    );
  }
}

export default avatarSelect;
