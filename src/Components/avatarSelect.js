import React, { Component } from "react";
import noble from "../images/noble.jpg";
import candle from "../images/candle.png";
import bartender from "../images/bartender.png";

class avatarSelect extends Component {
  render() {
    return (
      <div>
       
        <table className="selectTable">
            <thead>
                <tr><td></td><th>Select your Avatar</th><td></td></tr>
            </thead>
          <tbody>
            <tr>
              <td>
                <input
                alt="Avatar of a noble"
                type="image"
                  src={noble}
                  onClick={() => {
                    this.props.setAvatar(noble);
                  }}
                ></input>
              </td>
              <td>
                <input
                alt="Avatar of a candle"
                type="image"
                  src={candle}
                  onClick={() => {
                    this.props.setAvatar(candle);
                  }}
                ></input>
              </td>
              <td>
                <input
                alt="Avatar of a bartender"
                type="image"
                  src={bartender}
                  onClick={() => {
                    this.props.setAvatar(bartender);
                  }}
                ></input>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default avatarSelect;
