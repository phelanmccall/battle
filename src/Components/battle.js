import React, { Component } from "react";
import items from "./items";
import skeleton from "../images/skeleton.jpg";
import daggerPic from "../images/dagger.gif";
import axePic from "../images/axe.jpg";
import boss from "../images/boss.png";
import damaged from "../images/damaged.png";
import missed from "../images/missed.png";
import nodamage from "../images/nodamage.png";
import dead from "../images/dead.png";
let {
  dagger,
  longsword,
  axe,
  cloth,
  leather,
  plate,
  heal,
  buff,
  swift,
} = items;

let daggerCloth = {
  image: daggerPic,
  default: daggerPic,
  hp: 8,
  str: 8,
  dex: 16,
  move: 4,
  weapon: dagger,
  armor: cloth,
  exp: 5,
};

let longswordLeather = {
  image: skeleton,
  default: skeleton,

  hp: 10,
  str: 10,
  dex: 14,
  move: 4,
  weapon: longsword,
  armor: leather,
  exp: 5,
};

let axePlate = {
  image: axePic,
  default: axePic,

  hp: 14,
  str: 14,
  dex: 10,
  move: 4,
  weapon: axe,
  armor: plate,
  exp: 15,
};
let bossGuy = {
  image: boss,
  default: boss,
  hp: 16,
  str: 16,
  dex: 14,
  weapon: longsword,
  armor: plate,
  exp: 25,
};

let enemies = [
  Object.assign({}, daggerCloth),
  Object.assign({}, daggerCloth),
  Object.assign({}, longswordLeather),
  Object.assign({}, daggerCloth),
  Object.assign({}, longswordLeather),
  Object.assign({}, axePlate),
  Object.assign({}, axePlate),
  Object.assign({}, axePlate),
  Object.assign({}, axePlate),
  Object.assign({}, axePlate),
  Object.assign({}, bossGuy), //125
  Object.assign({}, daggerCloth),
  Object.assign({}, longswordLeather),
  Object.assign({}, axePlate),
  Object.assign({}, bossGuy),
  Object.assign({}, daggerCloth),
  Object.assign({}, longswordLeather),
  Object.assign({}, axePlate),
  Object.assign({}, bossGuy),
  Object.assign({}, daggerCloth),
  Object.assign({}, longswordLeather),
  Object.assign({}, axePlate),
  Object.assign({}, bossGuy),
];

class battle extends Component {
  constructor(props) {
    super(props);
    console.log("Constructing " + this.props.player.lvl);
    let total = 0;
    enemies.map((val) => {
      total += val.exp;
      return 0;
    });
    console.log(total);
    this.resetEnemies();
    this.state = {
      checkpoint: { player: Object.assign({}, this.props.player), level: 0 },
      use: [],
      levelUp: false,
      selectItem: false,
      level: 0,
      playerHp: this.props.player.str,
      player: Object.assign({}, this.props.player),
      enemy: enemies[0],
      console: [],
    };
  }
  enemyTimeout;
  playerTimeout;
  componentDidMount = () => {
    this.updateConsole(`Level ${this.state.level + 1}!`);
    this.updateConsole(`Fight!`);
  };

  componentWillUnmount = () => {
    enemies.map((val, ind) => {
      val.hp = val.str;
      return val;
    });
  };
  levelUp = (e) => {
    let { level } = this.state;
    let newPlayer = Object.assign({}, this.state.player);
    level++;
    newPlayer[e.target.name]++;
    newPlayer.lvl++;

    enemies[level].hp = enemies[level].str;
    this.setState(
      {
        levelUp: false,
        player: newPlayer,
        playerHp: newPlayer.str,
        level: level,
        enemy: enemies[level],
      },
      () => {
        this.updateConsole(`Level ${this.state.level + 1}!`);
        this.updateConsole(`Fight!`);
        let newCheckpoint = {
          player: Object.assign({}, this.state.player),
          level: this.state.level,
        };
        this.setState({
          checkpoint: newCheckpoint,
        });
      }
    );
  };
  addItem = (e) => {
    let newPlayer = this.state.player;
    if (newPlayer.items.length < 3) {
      switch (e.target.name) {
        case "heal":
          newPlayer.items.push(heal);
          break;
        case "buff":
          newPlayer.items.push(buff);

          break;
        case "swift":
          newPlayer.items.push(swift);

          break;
        default:
          break;
      }
      this.setState({
        player: newPlayer,
        selectItem: false,
        levelUp: true,
      });
    } else {
      let newState = {
        player: newPlayer,
        levelUp: true,
      };
      this.setState(newState);
    }
  };
  removeItem = (item) => {
    console.log("removing...");
    let newPlayer = this.state.player;
    let newUse = this.state.use;

    if (newPlayer.items.length) {
      let newItems = [...newPlayer.items];
      newUse.splice(newUse.indexOf(item), 1);
      console.log(newItems.indexOf(item));
      newItems.splice(newItems.indexOf(item), 1);
      console.log(newItems.length);
      newPlayer.items = newItems;
      console.log(newPlayer.items.length);
      console.log(newUse.length);
      this.setState(
        {
          player: newPlayer,
          use: newUse,
        },
        () => {
          console.log(this.state.player.items.length);
          console.log(this.state.use.length);
        }
      );
    }
  };
  applyItem = (e) => {
    let newPlayer = this.state.player;
    let newHp = this.state.playerHp;
    let newUse = [...this.state.use];
    if (e.target.checked) {
      switch (e.target.id) {
        case "heal":
          if (newHp < newPlayer.str) {
            newHp = this.state.playerHp;
            newHp += heal.value;
            if (newHp > newPlayer.str) {
              newHp = newPlayer.str;
            }
            this.updateConsole("Healed " + heal.value);
            e.target.checked = false;

            this.removeItem(heal);
          } else {
            this.updateConsole("Full health.");
            e.target.checked = false;
          }
          break;
        case "buff":
          if (newPlayer.items.includes(buff)) {
            newUse.push(buff);
          }
          break;
        case "swift":
          if (newPlayer.items.includes(swift)) {
            newUse.push(swift);
          }
          break;
        default:
          break;
      }
      this.setState({
        playerHp: newHp,
        player: newPlayer,
        use: newUse,
      });
    } else {
      switch (e.target.id) {
        case "buff":
          if (newUse.includes(buff)) {
            newUse.splice(newUse.indexOf(buff), 1);
          }
          break;
        case "swift":
          if (newUse.includes(swift)) {
            newUse.splice(newUse.indexOf(swift), 1);
          }
          break;
        default:
          break;
      }
      this.setState({
        player: newPlayer,
        use: newUse,
      });
    }
  };
  resetEnemies = () => {
    enemies.map((val, ind) => {
      val.hp = val.str;
      val.image = val.default;
      return val;
    });
  };
  tryAgain = () => {
    let newLevel = this.state.checkpoint.level;
    let newPlayer = Object.assign({}, this.state.checkpoint.player);
    console.log(newPlayer.exp);
    newPlayer.avatar = newPlayer.default;
    this.resetEnemies();

    this.setState(
      {
        level: newLevel,
        playerHp: newPlayer.str,
        player: newPlayer,
        enemy: enemies[newLevel],
        console: [],
      },
      () => {
        this.updateConsole(`Level ${this.state.level + 1}!`);
        this.updateConsole(`Fight!`);
      }
    );
    // switch (newPlayer.lvl) {
    //   case 1:
    //     enemies[2].hp = enemies[2].str;
    //     this.setState(
    //       {
    //         level: 2,
    //         playerHp: newPlayer.str,
    //         player: newPlayer,
    //         enemy: enemies[2],
    //         console: [],
    //       },
    //       () => {
    //         this.updateConsole(`Level ${this.state.level + 1}!`);
    //         this.updateConsole(`Fight!`);
    //       }
    //     );
    //     break;
    //     case 2:
    //       enemies[5].hp = enemies[5].str;
    //       this.setState(
    //         {
    //           level: 5,
    //           playerHp: newPlayer.str,
    //           player: newPlayer,
    //           enemy: enemies[5],
    //           console: [],
    //         },
    //         () => {
    //           this.updateConsole(`Level ${this.state.level + 1}!`);
    //           this.updateConsole(`Fight!`);
    //         }
    //       );
    //       break;
    //   case 0:
    //   default:
    //     enemies[0].hp = enemies[0].str;
    //     this.setState(
    //       {
    //         level: 0,
    //         playerHp: newPlayer.str,
    //         player: newPlayer,
    //         enemy: enemies[0],
    //         console: [],
    //       },
    //       () => {
    //         this.updateConsole(`Level ${this.state.level + 1}!`);
    //         this.updateConsole(`Fight!`);
    //       }
    //     );
    //     break;

    // }
  };
  keepFighting = () => {
    let level = this.state.level;
    level++;

    if (enemies[level]) {
      let newPlayer = this.state.player;
      newPlayer.exp += this.state.enemy.exp;
      newPlayer.avatar = newPlayer.default;
      switch (true) {
        case newPlayer.exp >= 10 && newPlayer.lvl < 1:
        case newPlayer.exp >= 25 && newPlayer.lvl < 2:
        case newPlayer.exp >= 50 && newPlayer.lvl < 3:
        case newPlayer.exp >= 100 && newPlayer.lvl < 4:
        case newPlayer.exp >= 150 && newPlayer.lvl < 5:
        case newPlayer.exp >= 200 && newPlayer.lvl < 6:
        case newPlayer.exp >= 250 && newPlayer.lvl < 7:
          if (newPlayer.lvl % 2 === 0 && newPlayer.items.length < 3) {
            let newState = {
              player: newPlayer,
              selectItem: true,
            };
            this.setState(newState);
          } else {
            let newState = {
              player: newPlayer,
              levelUp: true,
            };
            this.setState(newState);
          }
          break;
        default:
          enemies[level].hp = enemies[level].str;
          this.setState(
            {
              player: newPlayer,
              level: level,
              enemy: enemies[level],
            },
            () => {
              this.updateConsole(`Level ${this.state.level + 1}!`);
              this.updateConsole(`Fight!`);
            }
          );
          break;
      }
    } else {
      this.setState({
        win: true,
      });
    }
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

  playerAttacks = () => {
    let { player, enemy, use } = this.state;
    let itemEffect = 0;
    let newUse = [...use];
    let damage =
      Math.floor(Math.random() * player.weapon.attackMax) +
      player.weapon.attackMin;
    if (use.includes(buff)) {
      for (let i = 0; i < newUse.length; i++) {
        if (newUse[i].name === "buff") {
          itemEffect += newUse[i].value;
          this.updateConsole("Buff applied.");
          this.removeItem(newUse[i]);
        }
      }
    }
    let { defense } = enemy.armor;
    console.log("Player attack " + damage + " - enemy defense " + defense);
    let dmg = damage - defense;
    return dmg > 0 ? dmg + itemEffect : 0 + itemEffect;
  };
  enemyAttacks = () => {
    let { player, enemy } = this.state;
    let attack =
      Math.floor(Math.random() * enemy.weapon.attackMax) +
      enemy.weapon.attackMin;
    let { defense } = player.armor;
    console.log("Enemy attack " + attack + " - player defense " + defense);
    let dmg = attack - defense;
    return dmg > 0 ? dmg : 0;
  };
  defend = () => {
    this.updateConsole("Player defends.");
    let { enemy } = this.state;
    let dif = enemy.dex;
    let die = this.rollDice(3, 1, 6);
    console.log(die + " < " + dif + " = ");
    console.log(die < dif);
    let enemyHits = die < dif;
    //1 - enemy counters
    if (enemyHits) {
      //1 - enemy makes contact
      let dmg2 = this.enemyAttacks();
      dmg2 = Math.ceil(dmg2 / 2);
      if (dmg2 > 0) {
        //1 - enemy does damage
        this.updateConsole(`Enemy does ${dmg2} damage.`);
        if (this.state.playerHp - dmg2 <= 0) {
          //1 - player dies
          let newPlayer = this.state.player;
          newPlayer.avatar = dead;
          this.setState(
            {
              player: newPlayer,
              playerHp: 0,
            },
            () => {
              this.updateConsole("Player dies.");
            }
          );
        } else {
          //1 - player lives
          let newPlayer = this.state.player;
          newPlayer.avatar = damaged;
          let newHp = this.state.playerHp - dmg2;
          this.setState(
            {
              //1 - update player
              player: newPlayer,
              playerHp: newHp,
            },
            () => {
              if (this.playerTimeout) {
                //1 - timer to reset
                clearTimeout(this.playerTimeout);
              }
              this.playerTimeout = setTimeout(() => {
                let newPlayer = this.state.player;
                if (
                  newPlayer.avatar !== dead &&
                  newPlayer.avatar !== newPlayer.default
                ) {
                  newPlayer.avatar = newPlayer.default;
                  this.setState({
                    player: newPlayer,
                  });
                }
              }, 100); //1 - end timer
            }
          );
        }
      } else {
        this.updateConsole("Enemy does no damage.");
        let newPlayer = this.state.player;
        newPlayer.avatar = nodamage;
        this.setState(
          {
            //1 - update player
            player: newPlayer,
          },
          () => {
            if (this.playerTimeout) {
              //1 - set reset timer
              clearTimeout(this.playerTimeout);
            }
            this.playerTimeout = setTimeout(() => {
              let newPlayer = this.state.player;
              if (
                newPlayer.avatar !== dead &&
                newPlayer.avatar !== newPlayer.default
              ) {
                newPlayer.avatar = newPlayer.default;
                this.setState({
                  player: newPlayer,
                });
              }
            }, 10); //1 - end timer
          }
        );
      }
    } else {
      //1 - enemy misses
      this.updateConsole("Enemy misses.");
      let newPlayer = this.state.player;
      newPlayer.avatar = missed;
      this.setState(
        {
          //1 - update player
          player: newPlayer,
        },
        () => {
          if (this.playerTimeout) {
            //1 - reset timer
            clearTimeout(this.playerTimeout);
          }
          this.playerTimeout = setTimeout(() => {
            let newPlayer = this.state.player;
            if (
              newPlayer.avatar !== dead &&
              newPlayer.avatar !== newPlayer.default
            ) {
              newPlayer.avatar = newPlayer.default;
              this.setState({
                player: newPlayer,
              });
            }
          }, 100); //1 - end timer
        }
      );
    }
  };
  dodge = () => {
    let { enemy, player } = this.state;
    this.updateConsole("Player dodges.");
    let dif = enemy.dex - Math.floor(player.dex / 2);
    let die = this.rollDice(3, 1, 6);
    console.log(die + " < " + dif + " = ");
    console.log(die < dif);
    let enemyHits = die < dif;
    //1 - enemy counters
    if (enemyHits) {
      //1 - enemy makes contact
      let dmg2 = this.enemyAttacks();
      //1 - enemy does damage
      this.updateConsole(`Enemy does ${dmg2} damage.`);
      if (this.state.playerHp - dmg2 <= 0) {
        //1 - player dies
        let newPlayer = this.state.player;
        newPlayer.avatar = dead;
        this.setState(
          {
            player: newPlayer,
            playerHp: 0,
          },
          () => {
            this.updateConsole("Player dies.");
          }
        );
      } else {
        //1 - player lives
        let newPlayer = this.state.player;
        newPlayer.avatar = damaged;
        let newHp = this.state.playerHp - dmg2;
        this.setState(
          {
            //1 - update player
            player: newPlayer,
            playerHp: newHp,
          },
          () => {
            if (this.playerTimeout) {
              //1 - timer to reset
              clearTimeout(this.playerTimeout);
            }
            this.playerTimeout = setTimeout(() => {
              let newPlayer = this.state.player;
              if (
                newPlayer.avatar !== dead &&
                newPlayer.avatar !== newPlayer.default
              ) {
                newPlayer.avatar = newPlayer.default;
                this.setState({
                  player: newPlayer,
                });
              }
            }, 100); //1 - end timer
          }
        );
      }
    } else {
      this.updateConsole("Enemy misses.");
      let newPlayer = this.state.player;
      newPlayer.avatar = missed;
      this.setState(
        {
          //1 - update player
          player: newPlayer,
        },
        () => {
          if (this.playerTimeout) {
            //1 - set reset timer
            clearTimeout(this.playerTimeout);
          }
          this.playerTimeout = setTimeout(() => {
            let newPlayer = this.state.player;
            if (
              newPlayer.avatar !== dead &&
              newPlayer.avatar !== newPlayer.default
            ) {
              newPlayer.avatar = newPlayer.default;
              this.setState({
                player: newPlayer,
              });
            }
          }, 10); //1 - end timer
        }
      );
    }
  };

  attack = () => {
    if (!this.state.attacking) {
      this.setState(
        {
          attacking: true,
        },
        () => {
          let { player, enemy, use } = this.state;
          console.log(player.items.length);
          console.log(use.length);
          let bonus = 0;

          if (use.length) {
            let removedItems = [];
            for (let i = 0; i < use.length; i++) {
              if (use[i] === swift) {
                bonus += use[i].value;
                this.updateConsole("Swift applied.");
                removedItems.push(use[i]);
              }
            }
            removedItems.map((val) => {
              this.removeItem(val);
              return 0;
            });
          }

          let playerRoll = this.rollDice(3, 1, 6);
          let enemyRoll = this.rollDice(3, 1, 6);

          let enemyHits = enemyRoll < enemy.dex;
          let playerHits = playerRoll < player.dex + bonus;
          console.log("enemyRoll " + enemyRoll + " < " + enemy.dex + " = ");
          console.log("enemyHits= " + enemyHits);

          console.log(
            "playerRoll " + playerRoll + " < " + (player.dex + bonus) + " = "
          );
          console.log("playerHits= " + playerHits);

          if (
            player.dex + player.armor.dex + bonus >
            enemy.dex + enemy.armor.dex
          ) {
            //1 - player attacks first
            if (enemy.hp > 0) {
              //1 - enemy is still alive
              if (playerHits) {
                //1 - player makes contact
                let dmg = this.playerAttacks();

                if (dmg > 0) {
                  //1 - player does damage
                  this.updateConsole(`Player does ${dmg} damage.`);
                  if (enemy.hp - dmg <= 0) {
                    //1 - enemy dies
                    enemy.hp = 0;
                    enemy.image = dead;
                    this.setState(
                      {
                        //1 - update enemy
                        enemy: enemy,
                      },
                      () => {
                        this.updateConsole(`Enemy dies.`);
                      }
                    );
                  } else {
                    //1 - enemy lives
                    enemy.hp -= dmg;
                    enemy.image = damaged;
                    this.setState(
                      {
                        //1 - update enemy
                        enemy: enemy,
                      },
                      () => {
                        //1 - set timer to reset enemy image
                        if (this.enemyTimeout) {
                          clearTimeout(this.enemyTimeout);
                        }
                        this.enemyTimeout = setTimeout(() => {
                          let newEnemy = this.state.enemy;
                          if (
                            newEnemy.image !== dead &&
                            newEnemy.image !== newEnemy.default
                          ) {
                            newEnemy.image = newEnemy.default;
                            this.setState({
                              enemy: newEnemy,
                            });
                          }
                        }, 100); //1 - end set timer

                        //1 - enemy counters
                        if (enemyHits) {
                          //1 - enemy makes contact
                          let dmg2 = this.enemyAttacks();

                          if (dmg2 > 0) {
                            //1 - enemy does damage
                            this.updateConsole(`Enemy does ${dmg2} damage.`);
                            if (this.state.playerHp - dmg2 <= 0) {
                              //1 - player dies
                              let newPlayer = this.state.player;
                              newPlayer.avatar = dead;
                              this.setState(
                                {
                                  player: newPlayer,
                                  playerHp: 0,
                                },
                                () => {
                                  this.updateConsole("Player dies.");
                                }
                              );
                            } else {
                              //1 - player lives
                              let newPlayer = this.state.player;
                              newPlayer.avatar = damaged;
                              let newHp = this.state.playerHp - dmg2;
                              this.setState(
                                {
                                  //1 - update player
                                  player: newPlayer,
                                  playerHp: newHp,
                                },
                                () => {
                                  if (this.playerTimeout) {
                                    //1 - timer to reset
                                    clearTimeout(this.playerTimeout);
                                  }
                                  this.playerTimeout = setTimeout(() => {
                                    let newPlayer = this.state.player;
                                    if (
                                      newPlayer.avatar !== dead &&
                                      newPlayer.avatar !== newPlayer.default
                                    ) {
                                      newPlayer.avatar = newPlayer.default;
                                      this.setState({
                                        player: newPlayer,
                                      });
                                    }
                                  }, 100); //1 - end timer
                                }
                              );
                            }
                          } else {
                            this.updateConsole("Enemy does no damage.");
                            let newPlayer = this.state.player;
                            newPlayer.avatar = nodamage;
                            this.setState(
                              {
                                //1 - update player
                                player: newPlayer,
                              },
                              () => {
                                if (this.playerTimeout) {
                                  //1 - set reset timer
                                  clearTimeout(this.playerTimeout);
                                }
                                this.playerTimeout = setTimeout(() => {
                                  let newPlayer = this.state.player;
                                  if (
                                    newPlayer.avatar !== dead &&
                                    newPlayer.avatar !== newPlayer.default
                                  ) {
                                    newPlayer.avatar = newPlayer.default;
                                    this.setState({
                                      player: newPlayer,
                                    });
                                  }
                                }, 10); //1 - end timer
                              }
                            );
                          }
                        } else {
                          //1 - enemy misses
                          this.updateConsole("Enemy misses.");
                          let newPlayer = this.state.player;
                          newPlayer.avatar = missed;
                          this.setState(
                            {
                              //1 - update player
                              player: newPlayer,
                            },
                            () => {
                              if (this.playerTimeout) {
                                //1 - reset timer
                                clearTimeout(this.playerTimeout);
                              }
                              this.playerTimeout = setTimeout(() => {
                                let newPlayer = this.state.player;
                                if (
                                  newPlayer.avatar !== dead &&
                                  newPlayer.avatar !== newPlayer.default
                                ) {
                                  newPlayer.avatar = newPlayer.default;
                                  this.setState({
                                    player: newPlayer,
                                  });
                                }
                              }, 100); //1 - end timer
                            }
                          );
                        }
                      }
                    );
                  }
                } else {
                  this.updateConsole("Player does no damage.");
                  let newEnemy = this.state.enemy;
                  newEnemy.image = nodamage;
                  this.setState(
                    //1 - update enemy
                    {
                      enemy: newEnemy,
                    },
                    () => {
                      //1 - set timer to reset enemy image
                      if (this.enemyTimeout) {
                        clearTimeout(this.enemyTimeout);
                      }
                      this.enemyTimeout = setTimeout(() => {
                        let newEnemy = this.state.enemy;
                        if (
                          newEnemy.image !== dead &&
                          newEnemy.image !== newEnemy.default
                        ) {
                          newEnemy.image = newEnemy.default;
                          this.setState({
                            enemy: newEnemy,
                          });
                        }
                      }, 100); //1 - end set timer
                      //1 - enemy counters
                      if (enemyHits) {
                        //1 - enemy makes contact
                        let dmg2 = this.enemyAttacks();

                        if (dmg2 > 0) {
                          //1 - enemy does damage
                          this.updateConsole(`Enemy does ${dmg2} damage.`);
                          if (this.state.playerHp - dmg2 <= 0) {
                            //1 - player dies
                            let newPlayer = this.state.player;
                            newPlayer.avatar = dead;
                            this.setState(
                              {
                                player: newPlayer,
                                playerHp: 0,
                              },
                              () => {
                                this.updateConsole("Player dies.");
                              }
                            );
                          } else {
                            //1 - player lives
                            let newPlayer = this.state.player;
                            newPlayer.avatar = damaged;
                            let newHp = this.state.playerHp - dmg2;
                            this.setState(
                              {
                                //1 - update player
                                player: newPlayer,
                                playerHp: newHp,
                              },
                              () => {
                                if (this.playerTimeout) {
                                  //1 - timer to reset
                                  clearTimeout(this.playerTimeout);
                                }
                                this.playerTimeout = setTimeout(() => {
                                  let newPlayer = this.state.player;
                                  if (
                                    newPlayer.avatar !== dead &&
                                    newPlayer.avatar !== newPlayer.default
                                  ) {
                                    newPlayer.avatar = newPlayer.default;
                                    this.setState({
                                      player: newPlayer,
                                    });
                                  }
                                }, 100); //1 - end timer
                              }
                            );
                          }
                        } else {
                          this.updateConsole("Enemy does no damage.");
                          let newPlayer = this.state.player;
                          newPlayer.avatar = nodamage;
                          this.setState(
                            {
                              //1 - update player
                              player: newPlayer,
                            },
                            () => {
                              if (this.playerTimeout) {
                                //1 - set reset timer
                                clearTimeout(this.playerTimeout);
                              }
                              this.playerTimeout = setTimeout(() => {
                                let newPlayer = this.state.player;
                                if (
                                  newPlayer.avatar !== dead &&
                                  newPlayer.avatar !== newPlayer.default
                                ) {
                                  newPlayer.avatar = newPlayer.default;
                                  this.setState({
                                    player: newPlayer,
                                  });
                                }
                              }, 10); //1 - end timer
                            }
                          );
                        }
                      } else {
                        //1 - enemy misses
                        this.updateConsole("Enemy misses.");
                        let newPlayer = this.state.player;
                        newPlayer.avatar = missed;
                        this.setState(
                          {
                            //1 - update player
                            player: newPlayer,
                          },
                          () => {
                            if (this.playerTimeout) {
                              //1 - reset timer
                              clearTimeout(this.playerTimeout);
                            }
                            this.playerTimeout = setTimeout(() => {
                              let newPlayer = this.state.player;
                              if (
                                newPlayer.avatar !== dead &&
                                newPlayer.avatar !== newPlayer.default
                              ) {
                                newPlayer.avatar = newPlayer.default;
                                this.setState({
                                  player: newPlayer,
                                });
                              }
                            }, 100); //1 - end timer
                          }
                        );
                      }
                    }
                  );
                }
              } else {
                this.updateConsole("Player misses.");
                let oldImage = enemy.default;
                if (enemy.image !== missed) {
                  enemy.image = missed;
                }
                this.setState({ enemy: enemy }, () => {
                  //1 - update enemy
                  //1 - set timer
                  if (this.enemyTimeout) {
                    clearTimeout(this.enemyTimeout);
                  }
                  this.enemyTimeout = setTimeout(() => {
                    if (enemy.image !== oldImage && enemy.image !== dead) {
                      enemy.image = oldImage;
                    }

                    this.setState({
                      enemy: enemy,
                    });
                  }, 100); //1 - end timer
                  //1 - enemy counters
                  if (enemyHits) {
                    //1 - enemy makes contact
                    let dmg2 = this.enemyAttacks();

                    if (dmg2 > 0) {
                      //1 - enemy does damage
                      this.updateConsole(`Enemy does ${dmg2} damage.`);
                      if (this.state.playerHp - dmg2 <= 0) {
                        //1 - player dies
                        let newPlayer = this.state.player;
                        newPlayer.avatar = dead;
                        this.setState(
                          {
                            player: newPlayer,
                            playerHp: 0,
                          },
                          () => {
                            this.updateConsole("Player dies.");
                          }
                        );
                      } else {
                        //1 - player lives
                        let newPlayer = this.state.player;
                        newPlayer.avatar = damaged;
                        let newHp = this.state.playerHp - dmg2;
                        this.setState(
                          {
                            //1 - update player
                            player: newPlayer,
                            playerHp: newHp,
                          },
                          () => {
                            if (this.playerTimeout) {
                              //1 - timer to reset
                              clearTimeout(this.playerTimeout);
                            }
                            this.playerTimeout = setTimeout(() => {
                              let newPlayer = this.state.player;
                              if (
                                newPlayer.avatar !== dead &&
                                newPlayer.avatar !== newPlayer.default
                              ) {
                                newPlayer.avatar = newPlayer.default;
                                this.setState({
                                  player: newPlayer,
                                });
                              }
                            }, 100); //1 - end timer
                          }
                        );
                      }
                    } else {
                      this.updateConsole("Enemy does no damage.");
                      let newPlayer = this.state.player;
                      newPlayer.avatar = nodamage;
                      this.setState(
                        {
                          //1 - update player
                          player: newPlayer,
                        },
                        () => {
                          if (this.playerTimeout) {
                            //1 - set reset timer
                            clearTimeout(this.playerTimeout);
                          }
                          this.playerTimeout = setTimeout(() => {
                            let newPlayer = this.state.player;
                            if (
                              newPlayer.avatar !== dead &&
                              newPlayer.avatar !== newPlayer.default
                            ) {
                              newPlayer.avatar = newPlayer.default;
                              this.setState({
                                player: newPlayer,
                              });
                            }
                          }, 10); //1 - end timer
                        }
                      );
                    }
                  } else {
                    //1 - enemy misses
                    this.updateConsole("Enemy misses.");
                    let newPlayer = this.state.player;
                    newPlayer.avatar = missed;
                    this.setState(
                      {
                        //1 - update player
                        player: newPlayer,
                      },
                      () => {
                        if (this.playerTimeout) {
                          //1 - reset timer
                          clearTimeout(this.playerTimeout);
                        }
                        this.playerTimeout = setTimeout(() => {
                          let newPlayer = this.state.player;
                          newPlayer.avatar = newPlayer.default;
                          this.setState({
                            player: newPlayer,
                          });
                        }, 100); //1 - end timer
                      }
                    );
                  }
                });
              }
            } //1 - else enemy is already dead
          } else {
            //2 - enemy attacks first
            if (this.state.playerHp > 0) {
              //2 - player is still alive
              if (enemyHits) {
                //2 - enemy makes contact
                let dmg = this.enemyAttacks();
                if (dmg > 0) {
                  //2 - enemy does damage
                  this.updateConsole(`Enemy does ${dmg} damage.`);

                  if (this.state.playerHp - dmg > 0) {
                    //2 - player lives
                    let newPlayer = this.state.player;
                    newPlayer.avatar = damaged;
                    let newHp = this.state.playerHp - dmg;
                    this.setState(
                      {
                        //2 - update player
                        player: newPlayer,
                        playerHp: newHp,
                      },
                      () => {
                        if (this.playerTimeout) {
                          //2 - timer to reset
                          clearTimeout(this.playerTimeout);
                        }
                        this.playerTimeout = setTimeout(() => {
                          let newPlayer = this.state.player;
                          newPlayer.avatar = newPlayer.default;
                          this.setState({
                            player: newPlayer,
                          });
                        }, 100); //2 - end timer
                        //2 - player counters
                        if (playerHits) {
                          //2 - player makes contact
                          let dmg = this.playerAttacks();

                          if (dmg > 0) {
                            //2 - player does damage
                            this.updateConsole(`Player does ${dmg} damage.`);
                            if (enemy.hp - dmg <= 0) {
                              //2 - enemy dies
                              enemy.hp = 0;
                              enemy.image = dead;
                              this.setState(
                                {
                                  //2 - update enemy
                                  enemy: enemy,
                                },
                                () => {
                                  this.updateConsole(`Enemy dies.`);
                                }
                              );
                            } else {
                              //2 - enemy lives
                              enemy.hp -= dmg;
                              enemy.image = damaged;
                              this.setState(
                                {
                                  //2 - update enemy
                                  enemy: enemy,
                                },
                                () => {
                                  //2 - set timer to reset enemy image
                                  if (this.enemyTimeout) {
                                    clearTimeout(this.enemyTimeout);
                                  }
                                  this.enemyTimeout = setTimeout(() => {
                                    let newEnemy = this.state.enemy;
                                    if (
                                      newEnemy.image !== dead &&
                                      newEnemy.image !== newEnemy.default
                                    ) {
                                      newEnemy.image = newEnemy.default;
                                      this.setState({
                                        enemy: newEnemy,
                                      });
                                    }
                                  }, 100); //2 - end set timer
                                }
                              );
                            }
                          } else {
                            this.updateConsole("Player does no damage.");
                            let newEnemy = this.state.enemy;
                            newEnemy.image = nodamage;
                            this.setState(
                              //2 - update enemy
                              {
                                enemy: newEnemy,
                              },
                              () => {
                                //2 - set timer to reset enemy image
                                if (this.enemyTimeout) {
                                  clearTimeout(this.enemyTimeout);
                                }
                                this.enemyTimeout = setTimeout(() => {
                                  let newEnemy = this.state.enemy;
                                  if (
                                    newEnemy.image !== dead &&
                                    newEnemy.image !== newEnemy.default
                                  ) {
                                    newEnemy.image = newEnemy.default;
                                    this.setState({
                                      enemy: newEnemy,
                                    });
                                  }
                                }, 100); //2 - end set timer
                              }
                            );
                          }
                        } else {
                          this.updateConsole("Player misses.");
                          let oldImage = enemy.default;
                          if (enemy.image !== missed) {
                            enemy.image = missed;
                          }
                          this.setState({ enemy: enemy }, () => {
                            //2 - update enemy
                            //2 - set timer
                            if (this.enemyTimeout) {
                              clearTimeout(this.enemyTimeout);
                            }
                            this.enemyTimeout = setTimeout(() => {
                              if (
                                enemy.image !== oldImage &&
                                enemy.image !== dead
                              ) {
                                enemy.image = oldImage;
                                this.setState({
                                  enemy: enemy,
                                });
                              }
                            }, 100); //2 - end timer
                          });
                        }
                      }
                    );
                  } else {
                    //2 - player dies
                    let newPlayer = this.state.player;
                    newPlayer.avatar = dead;
                    this.setState(
                      {
                        player: newPlayer,
                        playerHp: 0,
                      },
                      () => {
                        this.updateConsole("Player dies.");
                      }
                    );
                  }
                } else {
                  this.updateConsole("Enemy does no damage.");
                  let newPlayer = this.state.player;
                  newPlayer.avatar = nodamage;
                  this.setState({ player: newPlayer }, () => {
                    //2 - update player
                    if (this.playerTimeout) {
                      //2 - set timer
                      clearTimeout(this.playerTimeout);
                    }
                    this.playerTimeout = setTimeout(() => {
                      if (
                        newPlayer.avatar !== dead &&
                        newPlayer.avatar !== newPlayer.default
                      ) {
                        newPlayer.avatar = newPlayer.default;
                        this.setState({
                          player: newPlayer,
                        });
                      }
                    }, 100); //2 - end timer
                    //2 - player counters
                    if (playerHits) {
                      //2 - player makes contact
                      let dmg = this.playerAttacks();

                      if (dmg > 0) {
                        //2 - player does damage
                        this.updateConsole(`Player does ${dmg} damage.`);
                        if (enemy.hp - dmg <= 0) {
                          //2 - enemy dies
                          enemy.hp = 0;
                          enemy.image = dead;
                          this.setState(
                            {
                              //2 - update enemy
                              enemy: enemy,
                            },
                            () => {
                              this.updateConsole(`Enemy dies.`);
                            }
                          );
                        } else {
                          //2 - enemy lives
                          enemy.hp -= dmg;
                          enemy.image = damaged;
                          this.setState(
                            {
                              //2 - update enemy
                              enemy: enemy,
                            },
                            () => {
                              //2 - set timer to reset enemy image
                              if (this.enemyTimeout) {
                                clearTimeout(this.enemyTimeout);
                              }
                              this.enemyTimeout = setTimeout(() => {
                                let newEnemy = this.state.enemy;
                                if (newEnemy.image !== dead) {
                                  newEnemy.image = newEnemy.default;
                                  this.setState({
                                    enemy: newEnemy,
                                  });
                                }
                              }, 100); //2 - end set timer
                            }
                          );
                        }
                      } else {
                        this.updateConsole("Player does no damage.");
                        let newEnemy = this.state.enemy;
                        newEnemy.image = nodamage;
                        this.setState(
                          //2 - update enemy
                          {
                            enemy: newEnemy,
                          },
                          () => {
                            //2 - set timer to reset enemy image
                            if (this.enemyTimeout) {
                              clearTimeout(this.enemyTimeout);
                            }
                            this.enemyTimeout = setTimeout(() => {
                              let newEnemy = this.state.enemy;
                              if (
                                newEnemy.image !== dead &&
                                newEnemy.image !== newEnemy.default
                              ) {
                                newEnemy.image = newEnemy.default;
                                this.setState({
                                  enemy: newEnemy,
                                });
                              }
                            }, 100); //2 - end set timer
                          }
                        );
                      }
                    } else {
                      this.updateConsole("Player misses.");
                      let oldImage = enemy.default;
                      if (enemy.image !== missed) {
                        enemy.image = missed;
                      }
                      this.setState({ enemy: enemy }, () => {
                        //2 - update enemy
                        //2 - set timer
                        if (this.enemyTimeout) {
                          clearTimeout(this.enemyTimeout);
                        }
                        this.enemyTimeout = setTimeout(() => {
                          if (
                            enemy.image !== oldImage &&
                            enemy.image !== dead
                          ) {
                            enemy.image = oldImage;
                            this.setState({
                              enemy: enemy,
                            });
                          }
                        }, 100); //2 - end timer
                      });
                    }
                  });
                }
              } else {
                this.updateConsole("Enemy misses.");
                let newPlayer = this.state.player;

                let oldImage = newPlayer.default;

                newPlayer.avatar = missed;

                this.setState({ player: newPlayer }, () => {
                  //2 - update player
                  if (this.playerTimeout) {
                    //2 - set timer
                    clearTimeout(this.playerTimeout);
                  }
                  this.playerTimeout = setTimeout(() => {
                    if (
                      newPlayer.avatar !== oldImage &&
                      newPlayer.avatar !== dead
                    ) {
                      newPlayer.avatar = oldImage;
                    }
                    this.setState({ player: newPlayer });
                  }, 100); //2 - end timer

                  //2 - player counters
                  if (playerHits) {
                    //2 - player makes contact
                    let dmg = this.playerAttacks();

                    if (dmg > 0) {
                      //2 - player does damage
                      this.updateConsole(`Player does ${dmg} damage.`);
                      if (enemy.hp - dmg <= 0) {
                        //2 - enemy dies
                        enemy.hp = 0;
                        enemy.image = dead;
                        this.setState(
                          {
                            //2 - update enemy
                            enemy: enemy,
                          },
                          () => {
                            this.updateConsole(`Enemy dies.`);
                          }
                        );
                      } else {
                        //2 - enemy lives
                        enemy.hp -= dmg;
                        enemy.image = damaged;
                        this.setState(
                          {
                            //2 - update enemy
                            enemy: enemy,
                          },
                          () => {
                            //2 - set timer to reset enemy image
                            if (this.enemyTimeout) {
                              clearTimeout(this.enemyTimeout);
                            }
                            this.enemyTimeout = setTimeout(() => {
                              let newEnemy = this.state.enemy;
                              if (
                                newEnemy.image !== dead &&
                                newEnemy.image !== newEnemy.default
                              ) {
                                newEnemy.image = newEnemy.default;
                                this.setState({
                                  enemy: newEnemy,
                                });
                              }
                            }, 100); //2 - end set timer
                          }
                        );
                      }
                    } else {
                      this.updateConsole("Player does no damage.");
                      let newEnemy = this.state.enemy;
                      newEnemy.image = nodamage;
                      this.setState(
                        //2 - update enemy
                        {
                          enemy: newEnemy,
                        },
                        () => {
                          //2 - set timer to reset enemy image
                          if (this.enemyTimeout) {
                            clearTimeout(this.enemyTimeout);
                          }
                          this.enemyTimeout = setTimeout(() => {
                            let newEnemy = this.state.enemy;
                            if (
                              newEnemy.image !== dead &&
                              newEnemy.image !== newEnemy.default
                            ) {
                              newEnemy.image = newEnemy.default;
                              this.setState({
                                enemy: newEnemy,
                              });
                            }
                          }, 100); //2 - end set timer
                        }
                      );
                    }
                  } else {
                    this.updateConsole("Player misses.");
                    let oldImage = enemy.default;
                    if (enemy.image !== missed) {
                      enemy.image = missed;
                    }
                    this.setState({ enemy: enemy }, () => {
                      //2 - update enemy
                      //2 - set timer
                      if (this.enemyTimeout) {
                        clearTimeout(this.enemyTimeout);
                      }
                      this.enemyTimeout = setTimeout(() => {
                        if (enemy.image !== oldImage && enemy.image !== dead) {
                          enemy.image = oldImage;
                        }

                        this.setState({
                          enemy: enemy,
                        });
                      }, 100); //2 - end timer
                    });
                  }
                });
              }
            } //2 - else player is already dead
          }

          this.setState({
            attacking: false,
          });
        }
      );
    }
  };

  render() {
    return (
      <div style={{height: "100vh"}}>
        {this.state.levelUp ? (
          <div className="modal">
            <h2>Level Up!</h2>
            <div className="modal-content">
              <div>Increase a stat</div>
              <div>
                <button name="str" onClick={this.levelUp}>
                  Str
                </button>

                <button name="dex" onClick={this.levelUp}>
                  Dex
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
        {this.state.selectItem ? (
          <div className="modal">
            <h2>Level Up!</h2>
            <div className="modal-content">
              <div>Select an Item</div>
              <div>
                <button name="heal" onClick={this.addItem}>
                  heal
                </button>

                <button name="buff" onClick={this.addItem}>
                  buff
                </button>

                <button name="swift" onClick={this.addItem}>
                  swift
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
        <h2>Battle</h2>
        {this.state.playerHp <= 0 ? (
          <div>
            <button onClick={this.tryAgain}>Try Again</button>
            <button onClick={this.props.startOver}>Reset Character</button>
          </div>
        ) : this.state.enemy.hp <= 0 ? (
          <button onClick={this.keepFighting}>Keep Fighting</button>
        ) : (
          ""
        )}
        <div id="playerTable">
          <div>
            <div>
              <div>
              <div>Lvl {this.state.player.lvl + 1}</div>
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
                <img
                  className="avatarImage"
                  id="player"
                  alt="Player avatar"
                  src={this.state.player.avatar}
                ></img>
              </div>
              <table>
                <thead>
                  <th>HP:</th>
                  <th>Str:</th>
                  <th>Dex:</th>
                  <th>Weapon:</th>
                  <th>Armor:</th>
                </thead>
                <tbody>
                  <td>{this.state.playerHp}</td>
                  <td>{this.state.player.str}</td>
                  <td>{this.state.player.dex}</td>
                  <td>{this.state.player.weapon.name}</td>
                  <td>{this.state.player.armor.name}</td>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
        <th>Enemy</th>
        <div
          style={{
            margin: "0 auto",
            backgroundColor: "red",
            height: "100%",
            width: `${(this.state.enemy.hp / this.state.enemy.str) * 100}%`,
          }}
        >
          HP
        </div>
        <img className="avatarImage" alt="enemy avatar" src={this.state.enemy.image}></img>
          <table>
            <tr>
              <th>HP:</th>
              <th>Str:</th>
              <th>Dex:</th>
              <th>Weapon:</th>
              <th>Armor:</th>
            </tr>
            <td>{this.state.enemy.hp}</td>
            <td>{this.state.enemy.str}</td>
            <td>{this.state.enemy.dex}</td>
            <td>{this.state.enemy.weapon.name}</td>
            <td>{this.state.enemy.armor.name}</td>
          </table>
        </div>
        <div>
          {this.state.console.map((val, ind) => {
            return <div key={ind}>{val}</div>;
          })}
        </div>

        <div>
          {this.state.playerHp <= 0 || this.state.enemy.hp <= 0 ? (
            " "
          ) : (
            <div>
              <button onClick={this.attack}>Attack</button>
              <button onClick={this.defend}>Defend</button>
              <button onClick={this.dodge}>Dodge</button>
              {this.state.player.items.length ? (
                <div>
                  <div>Apply items:</div>
                  {this.state.player.items.map((val, ind) => {
                    return (
                      <div>
                        <label>{val.name}</label>
                        <input
                          type="checkbox"
                          id={val.name}
                          onClick={this.applyItem}
                        ></input>
                      </div>
                    );
                  })}
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        </div>
        {this.state.win ? (
          <div className="modal">
            <div className="modal-content">YOU WIN!!!!</div>
            <button onClick={this.props.startOver}>Play again</button>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default battle;
