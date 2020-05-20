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
   if(this.state.points > 0){
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
   }else{
     this.setState({
       error: "Error: No points."
     })
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
        <img alt="Player Avatar" src={this.props.player.avatar}></img>
        <table className="selectTable">
          <thead>
            <tr><th>Set your STATS</th></tr>
            <tr>
              <th>Points:</th>
              <th>{this.state.points}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>STR</td>
              <td>
                <button onClick={this.DownStr}>-</button>
              </td>
              <td>
                {this.props.player.str}
                {/* <input
                  name="str"
                  type="number"
                  min="6"
                  onChange={this.SetStr}
                  defaultValue={this.props.player.str}
                ></input> */}
              </td>
              <td>
                <button onClick={this.UpStr}>+</button>
              </td>
              <td>
                <button name="str" onClick={this.Max}>
                  MAX
                </button>
              </td>
            </tr>
            <tr>
              <td>DEX</td>
              <td>
                <button onClick={this.DownDex}>-</button>
              </td>
              <td>
                {this.props.player.dex}
                {/* <input
                  name="dex"
                  type="number"
                  min="6"
                  onChange={this.SetDex}
                  defaultValue={this.props.player.dex}
                ></input> */}
              </td>
              <td>
                <button onClick={this.UpDex}>+</button>
              </td>
              <td>
                <button name="dex" onClick={this.Max}>
                  MAX
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <button onClick={this.props.setStats}>Done</button>
        <div> {this.state.error}</div>
      </div>
    );
  }
}

export default statSelect;
