import React, { Component } from "react";
import items from "./items";
import skeleton from "../images/skeleton.jpg";
import daggerPic from "../images/dagger.gif";
import axePic from "../images/axe.jpg";

let { dagger, longsword, axe, cloth, leather, plate } = items;

let daggerCloth = {
  image: daggerPic,
  hp: 8,
  str: 8,
  dex: 16,
  move: 4,
  weapon: dagger,
  armor: cloth,
};

let longswordLeather = {
  image: skeleton,
  hp: 10,
  str: 10,
  dex: 14,
  move: 4,
  weapon: longsword,
  armor: leather,
};

let axePlate = {
  image: axePic,
  hp: 14,
  str: 14,
  dex: 10,
  move: 4,
  weapon: axe,
  armor: plate,
};

let enemies = [daggerCloth, longswordLeather, axePlate];

class battle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      level: 0,
      playerHp: this.props.player.str,
      player: this.props.player,
      enemy: enemies[0],
      console: [],
    };
  }
  componentDidMount = () => {
    this.updateConsole(`Level ${this.state.level + 1}!`);
    this.updateConsole(`Fight!`)
  };

  componentWillUnmount = () => {
    enemies.map((val,ind)=>{
      val.hp = val.str;
      return val;
    })
  }
  reset = () => {
    let newLevel = this.state.level;
    let newState;
    if (newLevel > 1 || this.state.playerHp <= 0) {
      newLevel = 0;
      newState = {
        playerHp: this.state.player.str,
        level: newLevel,
        enemy: enemies[newLevel],
      };
    } else {
      newLevel++;
      newState = {
        level: newLevel,
        enemy: enemies[newLevel],
      };
    }

    enemies[newLevel].hp = enemies[newLevel].str;

    this.setState(newState, () => {
      this.updateConsole(`Level ${this.state.level + 1}!`);
      this.updateConsole(`Fight!`);
    });
  };

  rollDice = (num, min, max) => {
    let total = 0;
    for (let i = 0; i < num; i++) {
      total += Math.floor(Math.random() * max) + min;
    }
    return total;
  };

  updateConsole = (newText) => {
    let newConsole = this.state.console;
    if (newConsole.length > 4) {
      newConsole.shift();
    }
    newConsole.push(newText);
    this.setState({
      console: newConsole,
    });
  };

  playerAttacks = (defended) => {
    let { player, enemy } = this.state;

    let playerAttack =
      Math.floor(Math.random() * player.weapon.attackMax) +
      player.weapon.attackMin -
      enemy.armor.defense;
    if (playerAttack <= 0) {
      playerAttack = 0;
      this.updateConsole(`Player does ${playerAttack} damage.`);
    } else {
      this.updateConsole(`Player does ${playerAttack} damage.`);

      enemy.hp = enemy.hp - playerAttack < 0 ? 0 : enemy.hp - playerAttack;
      this.setState({ enemy: enemy }, () => {
        if (this.state.enemy.hp <= 0) {
          this.updateConsole("Enemy Dies!");
        }
      });
    }
    return playerAttack;
  };
  enemyAttacks = (defended) => {
    let { player, enemy } = this.state;
    let newPlayerHp = this.state.playerHp;
    let enemyAttack =
      Math.floor(Math.random() * enemy.weapon.attackMax) +
      enemy.weapon.attackMin -
      player.armor.defense;
    if (enemyAttack <= 0) {
      enemyAttack = 0;
      this.updateConsole(`Enemy does ${enemyAttack} damage.`);
    } else {
      this.updateConsole(`Enemy does ${enemyAttack} damage.`);

      newPlayerHp =
        this.state.playerHp - enemyAttack < 0
          ? 0
          : this.state.playerHp - enemyAttack;
      this.setState({ playerHp: newPlayerHp }, () => {
        if (newPlayerHp <= 0) {
          this.updateConsole("Player Dies!");
        }
      });
    }

    return enemyAttack;
  };
  attack = () => {
    let { player, enemy } = this.state;

    let playerHits = this.rollDice(3, 1, 6) < player.dex ? true : false;
    let enemyHits = this.rollDice(3, 1, 6) < enemy.dex ? true : false;
    if (player.dex + player.armor.dex >= enemy.dex + enemy.armor.dex) {
      if (this.state.enemy.hp > 0) {
        if (playerHits) {
          let oldHp = this.state.enemy.hp;
          let dmg = this.playerAttacks();
          let newHp = this.state.enemy.hp;
          let sameHp = oldHp === newHp;
          if(sameHp && dmg > 0){
            if(this.state.enemy.hp -dmg > 0 ){
              if (enemyHits) {
                this.enemyAttacks();
              }else{
                this.updateConsole("Enemy misses.");
              }
            }
          }else{
            if (enemyHits) {
              this.enemyAttacks();
            }else{
              this.updateConsole("Enemy misses.");
            }
          }
          
        } else {
          this.updateConsole("Player misses.");
          if (enemyHits) {
            this.enemyAttacks();
          } else {
            this.updateConsole("Enemy misses.");
          }
        }
      }
    } else {
      if (this.state.playerHp > 0) {
        if (enemyHits) {
          let oldHp = this.state.playerHp;
          let dmg = this.enemyAttacks();
          let newHp = this.state.playerHp;
          let sameHp = oldHp === newHp;
          if (sameHp && dmg > 0) {
            if(this.state.playerHp - dmg > 0){
              if (playerHits) {
                this.playerAttacks();
              } else {
                this.updateConsole("Player misses.");
              }
            }
          }else{
            if (playerHits) {
              this.playerAttacks();
            } else {
              this.updateConsole("Player misses.");
            }
          }
        } else {
          this.updateConsole("Enemy misses.");
          if (playerHits) {
            this.playerAttacks();
          } else {
            this.updateConsole("Player misses.");
          }
        }
      }
    }
  };

  render() {
    return (
      <div>
        <h2>Battle</h2>
        {this.state.playerHp <= 0 ? (
          <div>
            <button onClick={this.reset}>Try Again</button>
            <button onClick={this.props.startOver}>Reset Character</button>
          </div>
        ) : this.state.enemy.hp <= 0 ? (
          <button onClick={this.reset}>Keep Fighting</button>
        ) : (
          ""
        )}
        <table id="playerTable">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>HP:</th>
              <th>Str:</th>
              <th>Dex:</th>
              <th>Weapon:</th>
              <th>Armor:</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div
                  style={{
                    margin: "0 auto",
                    backgroundColor: "red",
                    height: "100%",
                    width: `${
                      (this.state.playerHp / this.state.player.str) * 100
                    }%`,
                  }}
                >
                  HP
                </div>
                <img alt="Player avatar" src={this.state.player.avatar}></img>
              </td>

              <td>{this.state.playerHp}</td>
              <td>{this.state.player.str}</td>
              <td>{this.state.player.dex}</td>
              <td>{this.state.player.weapon.name}</td>
              <td>{this.state.player.armor.name}</td>
            </tr>
          </tbody>
        </table>

        <table>
          <thead>
            <tr>
              <th>Enemy</th>
              <th>HP:</th>
              <th>Str:</th>
              <th>Dex:</th>
              <th>Weapon:</th>
              <th>Armor:</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {" "}
                <div
                  style={{
                    margin: "0 auto",
                    backgroundColor: "red",
                    height: "100%",
                    width: `${
                      (this.state.enemy.hp / this.state.enemy.str) * 100
                    }%`,
                  }}
                >
                  HP
                </div>
                <img alt="enemy avatar" src={this.state.enemy.image}></img>
              </td>
              <td>{this.state.enemy.hp}</td>
              <td>{this.state.enemy.str}</td>
              <td>{this.state.enemy.dex}</td>
              <td>{this.state.enemy.weapon.name}</td>
              <td>{this.state.enemy.armor.name}</td>
            </tr>
          </tbody>
        </table>
        <div>
          {this.state.console.map((val, ind) => {
            return <div key={ind}>{val}</div>;
          })}
        </div>

        <div>
          {this.state.playerHp <= 0 || this.state.enemy.hp <= 0 ? (
            " "
          ) : (
            <button onClick={this.attack}>Attack</button>
          )}
        </div>
      </div>
    );
  }
}

export default battle;
