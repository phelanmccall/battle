import React, { Component } from "react";
import selectScreens from "../images/selectScreens.png";

class statSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxPoints: 12,
      points: 12,
      error: "",
    };
  }
  componentDidMount = () => {};

  Max = (e) => {
    if (this.state.points > 0) {
      let name = e.target.name;
      switch (name) {
        case "str":
          this.props.changeStr(this.state.points);
          this.setState({
            points: 0,
            error: "",
          });
          break;
        case "dex":
          this.props.changeDex(this.state.points);
          this.setState({
            points: 0,
            error: "",
          });
          break;
        default:
          break;
      }
    } else {
      this.setState({
        error: "Error: No points.",
      });
    }
  };
  Min = (e) => {
    let name = e.target.name;
    if (this.props.player[name] > 6) {
      let dif = 6 - this.props.player[name];
      let newPoints = this.state.points + Math.abs(dif);
      switch (name) {
        case "str":
          this.props.changeStr(dif);
          this.setState({
            points: newPoints,
            error: "",
          });
          break;
        case "dex":
          this.props.changeDex(dif);
          this.setState({
            points: newPoints,
            error: "",
          });
          break;
        default:
          break;
      }
    } else {
      this.setState({
        error: "Error: Stat at minimum.",
      });
    }
  };
  minHalf = (e) => {
    let name = e.target.name;

    if (this.props.player[name] > 6) {
      let dif = Math.floor((6 - this.props.player[name]) / 2);
      let newPoints = this.state.points + Math.abs(dif);
      switch (name) {
        case "str":
          this.props.changeStr(dif);
          this.setState({
            points: newPoints,
            error: "",
          });
          break;
        case "dex":
          this.props.changeDex(dif);
          this.setState({
            points: newPoints,
            error: "",
          });
          break;
        default:
          break;
      }
    } else {
      this.setState({
        error: "Error: Stat at minimum.",
      });
    }
  };
  addHalf = (e) => {
    if (this.state.points > 0) {
      let name = e.target.name;
      let dif = Math.ceil(this.state.points / 2);
      let newPoints = Math.floor(this.state.points / 2);

      switch (name) {
        case "str":
          this.props.changeStr(dif);
          this.setState({
            points: newPoints,
            error: "",
          });
          break;
        case "dex":
          this.props.changeDex(dif);
          this.setState({
            points: newPoints,
            error: "",
          });
          break;
        default:
          break;
      }
    } else {
      this.setState({
        error: "Error: No points.",
      });
    }
  };

  UpStr = () => {
    if (this.state.points > 0) {
      this.props.changeStr(1);
      this.setState({
        points: this.state.points - 1,
        error: "",
      });
    } else {
      this.setState({ error: "Error: Out of points." });
    }
  };
  DownStr = () => {
    if (this.state.points < this.state.maxPoints && this.props.player.str > 6) {
      this.props.changeStr(-1);
      this.setState({
        points: this.state.points + 1,
        error: "",
      });
    } else {
      this.setState({ error: "Error: Stat can't go lower." });
    }
  };
  // SetStr = (e) => {
  //   let newStr = e.target.value;
  //   if (newStr >= 6) {
  //     let oldStr = this.props.player.str;
  //     let { points } = this.state;
  //     let change = newStr - oldStr;
  //     console.log("NewStr " + newStr);
  //     if (change > 0) {
  //       if (points - change >= 0) {
  //         this.props.changeStr(change);
  //         this.setState({
  //           points: points - change,
  //           error: "",
  //         });
  //       } else {
  //         this.setState({
  //           error: "Can't use that value.",
  //         });
  //       }
  //     } else if (change < 0) {
  //       if (newStr + this.props.player.dex < 24) {
  //         this.props.changeStr(change);
  //         this.setState({
  //           points: points - change,
  //           error: "",
  //         });
  //       } else {
  //         this.setState({
  //           error: "Can't.",
  //         });
  //       }
  //     }
  //   } else {
  //     this.setState({
  //       error: "Can't use that value.",
  //     });
  //   }
  // };

  UpDex = () => {
    if (this.state.points > 0) {
      this.props.changeDex(1);
      this.setState({
        points: this.state.points - 1,
        error: "",
      });
    } else {
      this.setState({ error: "Error: Can't add points" });
    }
  };
  DownDex = () => {
    if (this.state.points < this.state.maxPoints && this.props.player.dex > 6) {
      this.props.changeDex(-1);
      this.setState({
        points: this.state.points + 1,
        error: "",
      });
    } else {
      this.setState({ error: "Error: Can't subtract points" });
    }
  };
  // SetDex = (e) => {
  //   let newDex = e.target.value;
  //   if (newDex >= 6) {
  //     let oldDex = this.props.player.dex;
  //     let { points } = this.state;
  //     let change = newDex - oldDex;
  //     console.log(change);
  //     if (change > 0) {
  //       if (points - change >= 0) {
  //         this.props.changeDex(change);
  //         this.setState({
  //           points: points - change,
  //           error: "",
  //         });
  //       } else {
  //         this.setState({
  //           error: "Can't use that value.",
  //         });
  //       }
  //     } else {
  //       this.props.changeStr(change);
  //       this.setState({
  //         points: points - change,
  //         error: "",
  //       });
  //     }
  //   } else {
  //     this.setState({
  //       error: "Can't use that value.",
  //     });
  //   }
  // };

  render() {
    return (
      <div className="scene">
        <img id="background" src={selectScreens} />

        <div id="selectArea">
          
          <h2 className="selectTitle">Set your STATS</h2>
          
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
                
              </tr>
            </thead>
            <tbody>
              <tr>
             
                <td>{this.props.player.str}</td>
                <td>{this.props.player.dex}</td>
              
              </tr>
            </tbody>
          </table>
          <h5 className="selectTitle">Points: {this.state.points}/12</h5>
          <div>
       

            <div className="selectTitle row justify-content-center">
              <div className="col-6 col-lg-4 border">
                <button
                className="btn border button "
                onClick={this.DownStr}
              >
                -
              </button>
              <span>STR:</span>
              <button
                className="btn border button "
                onClick={this.UpStr}
              >
                +
              </button><div> {this.props.player.str}</div></div>
              <div className="col-6 col-lg-4 border">
              <button
                className="btn border button "
                onClick={this.DownDex}
              >
                -
              </button>
              <span>DEX:</span>
              <button
                className="btn border button"
                onClick={this.UpDex}
              >
                +
              </button>
              <div>{this.props.player.dex}</div>
              </div>
            </div>

          </div>
          <div>
            <button className="btn border button" onClick={this.props.setStats}>
              Done
            </button>
            <div className="selectTitle"> {this.state.error}</div>
            <div className="selectTitle">
              STR: Determines your HP and what weapons you can wield.
              <br />
              DEX: Determines who attacks first and accuracy.
              <br />
              Tip: Make sure you have enough STR to survive and enough DEX to
              hit your enemy.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default statSelect;
