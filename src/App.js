import React, { Component } from "react";
import "./styles/App.css";
import armorSelect from "./Components/armorSelect";
import battle from "./Components/battle";
import splashScene from "./Components/splashScene";
import weaponSelect from "./Components/weaponSelect";
import statSelect from "./Components/statSelect";
import avatarSelect from "./Components/avatarSelect";
import itemSelect from "./Components/itemSelect";
import items from "./Components/items";
let {
  dagger,
  longsword,
  axe,
  dragonClaw,
  cloth,
  leather,
  plate,
  dragonSkin,
  heal,
  buff,
  swift,
} = items;
let itemArray = [ dagger,
  longsword,
  axe,
  dragonClaw,
  cloth,
  leather,
  plate,
  dragonSkin,
  heal,
  buff,
  swift];
class App extends Component {
  constructor(props) {
    super(props);
    let checkpoint = false;
    if(typeof(Storage) !== "undefined"){
      if(localStorage.checkpoint){
        checkpoint = true;
      }
    }
    this.state = {
      currentComponent: splashScene,
      checkpoint: checkpoint,
      error: "",
      player: {
        items: [],
        defending: 1,
        dodge: 0,
        str: 6,
        dex: 6,
        move: 4,
        avatar: "https://via.placeholder.com/300x300",
        default: "https://via.placeholder.com/300x300",
        weapon: {
          name: "hands",
          attackMin: 0,
          attackMax: 5,
          minStr: 0,
        },
        armor: { 
          name: "skin",
        defense: 0,
        move: 0,
        dex: 0,},
        lvl: 0,
        exp: 0,
      },
    };
  }

  start = () => {
    this.changeCurrent(avatarSelect);
  }

  startOver = () => {
    let checkpoint = false;
    if(typeof(Storage) !== "undefined"){
      if(localStorage.checkpoint){
        checkpoint = true;
      }
    }
    this.setState({
      checkpoint: checkpoint,
      error: "",
      level:0,
      currentComponent: avatarSelect,
      player: {
        items: [],
        defending: 1,
        dodge: 0,
        str: 6,
        dex: 6,
        move: 4,
        avatar: "https://via.placeholder.com/300x300",
        default: "https://via.placeholder.com/300x300",
        weapon: {
          name: "hands",
          attackMin: 0,
          attackMax: 5,
          minStr: 0,
        },
        armor: { 
          name: "skin",
        defense: 0,
        move: 0,
        dex: 0,},
        lvl: 0,
        exp: 0,
      },
    });
  };
  changeCurrent = (newComponent) => {
    this.setState({ currentComponent: newComponent, error: "" });
  };
  setAvatar = (avatar) => {
    let newPlayer = this.state.player;
    newPlayer.default = avatar;
    newPlayer.avatar = avatar;
    this.setState({error: "",
      player: newPlayer,
      currentComponent: statSelect,
    });
  };
  setWeapon = (weapon) => {
    let newPlayer = this.state.player;
    newPlayer.weapon = weapon;
    this.setState({error: "", player: newPlayer, currentComponent: armorSelect });
  };

  setArmor = (armor) => {
    let newPlayer = this.state.player;
    newPlayer.armor = armor;
    this.setState({error: "", player: newPlayer, currentComponent: itemSelect });
  };
  setItem = (item) => {
    let newPlayer = this.state.player;
    if (newPlayer.items.length < 3) {
      newPlayer.items.push(item);
      this.setState({error: "", player: newPlayer, currentComponent: battle });
    }
  };

  changeStr = (num) => {
    let newPlayer = this.state.player;
    newPlayer.str += num;
    this.setState({error: "", player: newPlayer });
  };
  changeDex = (num) => {
    let newPlayer = this.state.player;
    newPlayer.dex += num;
    this.setState({error: "", player: newPlayer });
  };

  setStats = () => {
    this.setState({error: "", currentComponent: weaponSelect });
  };

  componentDidMount() {}

  checkPlayer = (player) =>{
  
    let equipmentPass = true;
  

    let itemsPass = true;

    for(let i in player.weapon){

      console.log(i);
      console.log(player.weapon[i] === items[player.weapon.name][i]);
      equipmentPass = player.weapon[i] === items[player.weapon.name][i];
      if(!equipmentPass){
        break;
      }
    }
    for(let i in player.armor){
      console.log(i);

      console.log(player.armor[i] === items[player.armor.name][i]);

      equipmentPass = player.armor[i] === items[player.armor.name][i];
      if(!equipmentPass){
        break;
      }
    }
    
    
    for(let i in player.items){

      for(let k in player.items[i]){
        console.log(k);
        console.log(player.items[i][k] === items[player.items[i].name][k]);

        itemsPass = player.items[i][k] === items[player.items[i].name][k];
        if(!itemsPass){
          break;
        }
      }
      if(!itemsPass){
        break;
      }
    }
    if(player.items.length > 3){
      player.items.splice(3);
    }
    console.log(equipmentPass);
    console.log(itemsPass);
    console.log(equipmentPass && itemsPass);

    return equipmentPass && itemsPass;
  }

  load = () => {

    if(typeof(Storage) !== "undefined"){
      if(localStorage.checkpoint){
        let checkpoint = JSON.parse(localStorage.checkpoint);
        let playerCheck = this.checkPlayer(checkpoint.player);
        console.log(playerCheck);
        if(playerCheck){
          this.setState({
            player: checkpoint.player,
            level: checkpoint.level,
            currentComponent: battle
          })
        }else{
          this.setState({ error: "Error with saved player."})
        }

      }else{
        this.setState({ error: "No checkpoint saved."});
      }
    }else{
     this.setState({error: "No storage available."})
    }

  }
  save = (checkpoint) => {
    if(typeof(Storage) !== "undefined"){
        try{
          localStorage.removeItem("checkpoing")
          localStorage.setItem("checkpoint", JSON.stringify(checkpoint));
          return "Checkpoint saved.";
        } catch {
          return "Error";
        }
    }else{
      return "No storage available";
    }
  }


  render() {
    return (
      <div className="App">
        <this.state.currentComponent
          start={this.start}
          changeStr={this.changeStr}
          changeDex={this.changeDex}
          setWeapon={this.setWeapon}
          setArmor={this.setArmor}
          setItem={this.setItem}
          setStats={this.setStats}
          setAvatar={this.setAvatar}
          startOver={this.startOver}
          player={this.state.player}
          level={this.state.level}
          checkpoint={this.state.checkpoint}
          save={this.save}
          load={this.load}
        />
        <div>{this.state.error}</div>
      </div>
    );
  }
}

export default App;
