import React, { Component } from "react";
import "./styles/App.css";
import armorSelect from "./Components/armorSelect";
import battle from "./Components/battle";
import weaponSelect from "./Components/weaponSelect";
import statSelect from "./Components/statSelect";
import avatarSelect from "./Components/avatarSelect";
import itemSelect from "./Components/itemSelect";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentComponent: avatarSelect,
      player: {
        items: [],
        defending: 1,
        dodge: 0,
        str: 6,
        dex: 6,
        move: 4,
        avatar: "",
        default: "",
        weapon: {},
        armor: {},
        lvl: 0,
        exp: 0
      },
    };
  }
  startOver = () => {
    this.setState({
      currentComponent: avatarSelect,
      player: {
        items: [],
        str: 6,
        dex: 6,
        move: 4,
        avatar: "",
        default: "",
        weapon: {},
        armor: {},
        lvl: 0,
        exp: 0
      },
    });
  };
  changeCurrent = (newComponent) => {
    this.setState({ currentComponent: newComponent });
  };
  setAvatar = (avatar) => {
    let newPlayer = this.state.player;
    newPlayer.default = avatar;
    newPlayer.avatar = avatar;
    this.setState({
      player: newPlayer,
      currentComponent: statSelect,
    });
  };
  setWeapon = (weapon) => {
    let newPlayer = this.state.player;
    newPlayer.weapon = weapon;
    this.setState({ player: newPlayer, currentComponent: armorSelect });
  };

  setArmor = (armor) => {
    let newPlayer = this.state.player;
    newPlayer.armor = armor;
    this.setState({ player: newPlayer, currentComponent: itemSelect });
  };
  setItem = (item) => {
    let newPlayer = this.state.player;
    if(newPlayer.items.length < 3){
      newPlayer.items.push(item);
      this.setState({ player: newPlayer, currentComponent: battle})
    }
  }

  changeStr = (num) => {
    let newPlayer = this.state.player;
    newPlayer.str += num;
    this.setState({ player: newPlayer });
  };
  changeDex = (num) => {
    let newPlayer = this.state.player;
    newPlayer.dex += num;
    this.setState({ player: newPlayer });
  };

  setStats = () => {
    this.setState({ currentComponent: weaponSelect });
  };

  componentDidMount() {}

  render() {
    return (
      <div className="App">
        <this.state.currentComponent
          changeStr={this.changeStr}
          changeDex={this.changeDex}
          setWeapon={this.setWeapon}
          setArmor={this.setArmor}
          setItem={this.setItem}
          setStats={this.setStats}
          setAvatar={this.setAvatar}
          startOver={this.startOver}
          player={this.state.player}
        />
      </div>
    );
  }
}

export default App;
