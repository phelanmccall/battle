import React, { Component } from "react";
import "../styles/statSelect.css";
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
      this.setState({ error: "Error: Can't add points" });
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
      this.setState({ error: "Error: Can't subtract points" });
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
      <div>
        <div>
          <img
            className="avatarImage"
            alt="Player Avatar"
            src={this.props.player.avatar}
          ></img>
          <div
            style={{
              backgroundColor: "red",
              margin: "0 auto",
              width: `${(this.props.player.str / 18) * 100}%`,
            }}
          >
            STR
          </div>

          <div
            style={{
              color: "white",
              backgroundColor: "blue",
              margin: "0 auto",
              width: `${(this.props.player.dex / 18) * 100}%`,
            }}
          >
            DEX
          </div>
        </div>

        <h2>Set your STATS</h2>

        <h5>Points:</h5>
        <div>{this.state.points}/12</div>
        <div style={{ width: "100vw" }}>
          <button name="str" onClick={this.Min}>
            {" "}
            MIN
          </button>

          <button name="str" onClick={this.minHalf}>
            -1/2{" "}
          </button>

          <button onClick={this.DownStr}>-</button>
          <span> STR </span>
          <button onClick={this.UpStr}>+</button>

          <button name="str" onClick={this.addHalf}>
            +1/2{" "}
          </button>

          <button name="str" onClick={this.Max}>
            MAX
          </button>
        </div>
        <div>
          <button name="dex" onClick={this.Min}>
            {" "}
            MIN
          </button>

          <button name="dex" onClick={this.minHalf}>
            -1/2{" "}
          </button>

          <button onClick={this.DownDex}>-</button>
          <span> DEX </span>
          <button onClick={this.UpDex}>+</button>

          <button name="dex" onClick={this.addHalf}>
            +1/2{" "}
          </button>

          <button name="dex" onClick={this.Max}>
            MAX
          </button>
        </div>
        <div>
          <button onClick={this.props.setStats}>Done</button>
          <div> {this.state.error}</div>
        </div>
      </div>
    );
  }
}

export default statSelect;
