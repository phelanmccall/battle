import React, { Component } from "react";
import items from "./items";
import swordUser from "../images/swordUser.png";
import daggerUser from "../images/daggerUser.png";
import boss from "../images/boss.png";
import axeUser from "../images/axeUser.png";
import dragon from "../images/dragon.png";
import damaged from "../images/damaged.png";
import missed from "../images/missed.png";
import nodamage from "../images/nodamage.png";
import dead from "../images/dead.png";
import battlescene from "../images/battlescene.png";
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

let daggerCloth = {
  image: daggerUser,
  default: daggerUser,
  hp: 8,
  str: 8,
  dex: 16,
  move: 4,
  weapon: dagger,
  armor: cloth,
  exp: 5,
};

let longswordLeather = {
  image: swordUser,
  default: swordUser,

  hp: 10,
  str: 10,
  dex: 14,
  move: 4,
  weapon: longsword,
  armor: leather,
  exp: 5,
};

let axePlate = {
  image: axeUser,
  default: axeUser,

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

let dragonGuy = {
  image: dragon,
  default: dragon,
  hp: 20,
  str: 20,
  dex: 18,
  weapon: dragonClaw,
  armor: dragonSkin,
  exp: 50,
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
  Object.assign({}, dragonGuy),
];

class battle extends Component {
  constructor(props) {
    super(props);
    // let total = 0;
    // enemies.map((val) => {
    //   total += val.exp;
    //   return 0;
    // });
    // this.resetEnemies();
    this.state = {
      save: false,
      checkpoint: {
        player: Object.assign({}, this.props.player),
        level: this.props.level ? this.props.level : 0,
      },
      use: [],
      levelUp: false,
      selectItem: false,
      level: this.props.level ? this.props.level : 0,
      playerHp: this.props.player.str,
      player: Object.assign({}, this.props.player),
      enemy: enemies[this.props.level ? this.props.level : 0],
      console: [],
    };
  }
  enemyTimeout;
  playerTimeout;
  componentDidMount = () => {
    let total = 0;
    enemies.map((val) => {
      total += val.exp;
      return 0;
    });
    this.resetEnemies();
    this.updateConsole(`Level ${this.state.level + 1}!`);
    this.updateConsole(`Fight!`);
  };

  componentWillUnmount = () => {
    this.resetEnemies();
  };

  save = (e) => {
    if (e.target.name === "true") {
      this.props.save(this.state.checkpoint);
    }

    this.setState({
      askToSave: false,
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
          askToSave: true,
        });
      }
    );
  };
  clone = (obj) => {
    let copy;
    if(obj === null || typeof obj != "object") return obj;

    
    // Handle Date
    if (obj instanceof Date) {
      copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
  }

  // Handle Array
  if (obj instanceof Array) {
      copy = [];
      for (var i = 0, len = obj.length; i < len; i++) {
          copy[i] = this.clone(obj[i]);
      }
      return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
      copy = {};
      for (var attr in obj) {
          if (obj.hasOwnProperty(attr)) copy[attr] = this.clone(obj[attr]);
      }
      return copy;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
  }
  addItem = (e) => {
    let newPlayer = this.state.player;
    if (newPlayer.items.length < 3) {
      switch (e.target.name) {
        case "heal":
          newPlayer.items.push(this.clone(heal));
          break;
        case "buff":
          newPlayer.items.push(this.clone(buff));

          break;
        case "swift":
          newPlayer.items.push(this.clone(swift));

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
    let newPlayer = this.state.player;
    let newUse = this.state.use;

    if (newPlayer.items.length) {
      let newItems = [...newPlayer.items];
    
      newUse.splice(newUse.indexOf(item), 1);
      newItems.splice(newItems.findIndex(x => x.name === item.name), 1);
      newPlayer.items = newItems;

      this.setState(
        {
          player: newPlayer,
          use: newUse,
        });
    }
  };

  applyItem = (e) => {
    let newPlayer = this.state.player;
    let newHp = this.state.playerHp;
    let newUse = [...this.state.use];
    
    switch (e.target.getAttribute("data-name")) {
      case "heal":
        if (newHp < newPlayer.str) {
          newHp = this.state.playerHp;
          newHp += heal.value;
          if (newHp > newPlayer.str) {
            newHp = newPlayer.str;
          }
          this.updateConsole(
            "Healed " + (newHp - this.state.playerHp) + " health."
          );

          this.removeItem(heal);
        } else {
          this.updateConsole("Full health.");
        }
        break;
      case "buff":
       if(newPlayer.items[e.target.id].use){
         newPlayer.items[e.target.id].use = false;
       }else{
         newPlayer.items[e.target.id].use = true;
       }

        break;
      case "swift":
       if(newPlayer.items[e.target.id].use){
         newPlayer.items[e.target.id].use = false;
       }else{
         newPlayer.items[e.target.id].use = true;
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
    newPlayer.avatar = newPlayer.default;
    this.resetEnemies();

    this.setState(
      {
        level: newLevel,
        playerHp: newPlayer.str,
        player: newPlayer,
        enemy: enemies[newLevel],
        console: [],
        use: [],
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
    if (this.state.win) {
      level = 0;
      this.resetEnemies();
      this.setState({
        win: false,
        level: level,
      });
    }

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
        case newPlayer.exp >= 300 && newPlayer.lvl < 8:
        case newPlayer.exp >= 350 && newPlayer.lvl < 9:
        case newPlayer.exp >= 400 && newPlayer.lvl < 10:
        case newPlayer.exp >= 450 && newPlayer.lvl < 11:
        case newPlayer.exp >= 500 && newPlayer.lvl < 12:
        case newPlayer.exp >= 550 && newPlayer.lvl < 13:
        case newPlayer.exp >= 600 && newPlayer.lvl < 14:
        case newPlayer.exp >= 650 && newPlayer.lvl < 15:
        case newPlayer.exp >= 700 && newPlayer.lvl < 16:
        case newPlayer.exp >= 750 && newPlayer.lvl < 17:
          if (newPlayer.lvl % 2 === 0 && newPlayer.items.length < 3) {
            let newState = {
              player: newPlayer,
              selectItem: true,
            };
            this.setState(newState, () => {
            });
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
    if (newConsole.length > 1) {
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
    let length = player.items.length;
    let items = player.items;
    let damage =
      Math.floor(
        Math.random() * (player.weapon.attackMax - player.weapon.attackMin)
      ) + player.weapon.attackMin;
    for(let i = 0; i < length; i++){
      if(items[i].use && items[i].name === "buff"){
        itemEffect += items[i].value;
        this.updateConsole("Buff applied.");  
          this.removeItem(items[i]);
      }
    }
    // if (use.includes(buff)) {
    //   for (let i = 0; i < newUse.length; i++) {
    //     if (newUse[i].name === "buff") {
    //       itemEffect += newUse[i].value;
    //       this.updateConsole("Buff applied.");
    //       this.removeItem(newUse[i]);
    //     }
    //   }
    // }
    let { defense } = enemy.armor;
    let dmg = damage - defense;
    this.resetItems();
    return dmg > 0 ? dmg + itemEffect : 0 + itemEffect;
  };
  enemyAttacks = () => {
    let { player, enemy } = this.state;
    let attack =
      Math.floor(
        Math.random() * (enemy.weapon.attackMax - enemy.weapon.attackMin)
      ) + enemy.weapon.attackMin;
    let { defense } = player.armor;
    let dmg = attack - defense;
    return dmg > 0 ? dmg : 0;
  };
  defend = () => {
    this.updateConsole("Player defends.");
    let { enemy } = this.state;
    let dif = enemy.dex;
    let die = this.rollDice(3, 1, 6);
    
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
              this.playerTimeout = setTimeout(this.resetAvatar, 100); //1 - end timer
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
            this.playerTimeout = setTimeout(this.resetAvatar, 100); //1 - end timer
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
          this.playerTimeout = setTimeout(this.resetAvatar, 100); //1 - end timer
        }
      );
    }
  };
  dodge = () => {
    let { enemy, player } = this.state;
    this.updateConsole("Player dodges.");
    let dif = enemy.dex - Math.floor(player.dex / 2);
    let die = this.rollDice(3, 1, 6);
   
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
            this.playerTimeout = setTimeout(this.resetAvatar, 100); //1 - end timer
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
          this.playerTimeout = setTimeout(this.resetAvatar, 100); //1 - end timer
        }
      );
    }
  };
  resetEnemy = () => {
    let newEnemy = this.state.enemy;
    if (newEnemy.image !== dead && newEnemy.image !== newEnemy.default) {
      newEnemy.image = newEnemy.default;
      this.setState({
        enemy: newEnemy,
      });
    }
  };
  resetAvatar = () => {
    let newPlayer = this.state.player;
    if (newPlayer.avatar !== dead && newPlayer.avatar !== newPlayer.default) {
      newPlayer.avatar = newPlayer.default;
      this.setState({
        player: newPlayer,
      });
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
          
          let itemEffect = 0;
          let length = player.items.length;
        let items = player.items;

          for(let i = 0; i < length; i++){
            if(items[i].use && items[i].name === "swift"){
              itemEffect += items[i].value;
              this.updateConsole("swift applied.");
                this.removeItem(items[i]);
            }
          }

          let playerRoll = this.rollDice(3, 1, 6);
          let enemyRoll = this.rollDice(3, 1, 6);

          let enemyHits = enemyRoll <= enemy.dex;
          let playerHits = playerRoll <= player.dex + itemEffect;
          

          if (
            player.dex + player.armor.dex + itemEffect >
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
                        this.enemyTimeout = setTimeout(this.resetEnemy, 100); //1 - end set timer

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
                                  this.playerTimeout = setTimeout(
                                    this.resetAvatar,
                                    100
                                  ); //1 - end timer
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
                                this.playerTimeout = setTimeout(
                                  this.resetAvatar,
                                  100
                                ); //1 - end timer
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
                              this.playerTimeout = setTimeout(
                                this.resetAvatar,
                                100
                              ); //1 - end timer
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
                      this.enemyTimeout = setTimeout(this.resetEnemy, 100); //1 - end set timer
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
                                this.playerTimeout = setTimeout(
                                  this.resetAvatar,
                                  100
                                ); //1 - end timer
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
                              this.playerTimeout = setTimeout(
                                this.resetAvatar,
                                100
                              ); //1 - end timer
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
                            this.playerTimeout = setTimeout(
                              this.resetAvatar,
                              100
                            ); //1 - end timer
                          }
                        );
                      }
                    }
                  );
                }
              } else {
                this.updateConsole("Player misses.");
                if (enemy.image !== missed) {
                  enemy.image = missed;
                }
                this.setState({ enemy: enemy }, () => {
                  //1 - update enemy
                  //1 - set timer
                  if (this.enemyTimeout) {
                    clearTimeout(this.enemyTimeout);
                  }
                  this.enemyTimeout = setTimeout(this.resetEnemy, 100); //1 - end timer
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
                            this.playerTimeout = setTimeout(
                              this.resetAvatar,
                              100
                            ); //1 - end timer
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
                          this.playerTimeout = setTimeout(
                            this.resetAvatar,
                            100
                          ); //1 - end timer
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
                        this.playerTimeout = setTimeout(this.resetAvatar, 100); //1 - end timer
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
                        this.playerTimeout = setTimeout(this.resetAvatar, 100); //2 - end timer
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
                                  this.enemyTimeout = setTimeout(
                                    this.resetEnemy,
                                    100
                                  ); //2 - end set timer
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
                                this.enemyTimeout = setTimeout(
                                  this.resetEnemy,
                                  100
                                ); //2 - end set timer
                              }
                            );
                          }
                        } else {
                          this.updateConsole("Player misses.");
                          if (enemy.image !== missed) {
                            enemy.image = missed;
                          }
                          this.setState({ enemy: enemy }, () => {
                            //2 - update enemy
                            //2 - set timer
                            if (this.enemyTimeout) {
                              clearTimeout(this.enemyTimeout);
                            }
                            this.enemyTimeout = setTimeout(
                              this.resetEnemy,
                              100
                            ); //2 - end timer
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
                    this.playerTimeout = setTimeout(this.resetAvatar, 100); //2 - end timer
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
                              this.enemyTimeout = setTimeout(
                                this.resetEnemy,
                                100
                              ); //2 - end set timer
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
                            this.enemyTimeout = setTimeout(
                              this.resetEnemy,
                              100
                            ); //2 - end set timer
                          }
                        );
                      }
                    } else {
                      this.updateConsole("Player misses.");
                      if (enemy.image !== missed) {
                        enemy.image = missed;
                      }
                      this.setState({ enemy: enemy }, () => {
                        //2 - update enemy
                        //2 - set timer
                        if (this.enemyTimeout) {
                          clearTimeout(this.enemyTimeout);
                        }
                        this.enemyTimeout = setTimeout(this.resetEnemy, 100); //2 - end timer
                      });
                    }
                  });
                }
              } else {
                this.updateConsole("Enemy misses.");
                let newPlayer = this.state.player;

                newPlayer.avatar = missed;

                this.setState({ player: newPlayer }, () => {
                  //2 - update player
                  if (this.playerTimeout) {
                    //2 - set timer
                    clearTimeout(this.playerTimeout);
                  }
                  this.playerTimeout = setTimeout(this.resetAvatar, 100); //2 - end timer

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
                            this.enemyTimeout = setTimeout(
                              this.resetEnemy,
                              100
                            ); //2 - end set timer
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
                          this.enemyTimeout = setTimeout(this.resetEnemy, 100); //2 - end set timer
                        }
                      );
                    }
                  } else {
                    this.updateConsole("Player misses.");
                    if (enemy.image !== missed) {
                      enemy.image = missed;
                    }
                    this.setState({ enemy: enemy }, () => {
                      //2 - update enemy
                      //2 - set timer
                      if (this.enemyTimeout) {
                        clearTimeout(this.enemyTimeout);
                      }
                      this.enemyTimeout = setTimeout(this.resetEnemy, 100); //2 - end timer
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

  resetItems = () =>{
    let newItems = this.state.player.items;
    for(let item in newItems){
      newItems[item].use = false;
    }
  }
  render() {
    return (
      <div className="scene">
        {this.state.levelUp ? (
          <div className="modal">
            <h2>Level Up!</h2>
            <div className="modal-content">
              <div>Increase a stat</div>
              <div>
                <button
                  className="btn btn-success border"
                  name="str"
                  onClick={this.levelUp}
                >
                  Str
                </button>

                <button
                  className="btn btn-success border"
                  name="dex"
                  onClick={this.levelUp}
                >
                  Dex
                </button>
              </div>
            </div>
          </div>
        ) : (
            ""
          )}
        {this.state.selectItem ? (
          <div className="modal">
            <h2>Level Up!</h2>
            <div className="modal-content">
              <div>Select an Item</div>
              <div>
                <button
                  className="btn btn-success border"
                  name="heal"
                  onClick={this.addItem}
                >
                  heal
                </button>

                <button
                  className="btn btn-success border"
                  name="buff"
                  onClick={this.addItem}
                >
                  buff
                </button>

                <button
                  className="btn btn-success border"
                  name="swift"
                  onClick={this.addItem}
                >
                  swift
                </button>
              </div>
            </div>
          </div>
        ) : (
            ""
          )}
        {this.state.askToSave ? (
          <div className="modal">
            <h2>Level Up!</h2>
            <div className="modal-content">
              <div>Would you like to save this checkpoint to LocalStorage?</div>

              <div>
                <button
                  className="btn btn-success border"
                  name="true"
                  onClick={this.save}
                >
                  Yes
                </button>
                <button
                  className="btn btn-success border"
                  name="false"
                  onClick={this.save}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        ) : (
            ""
          )}

        {this.state.win ? (
          <div className="modal">
            <div className="modal-content">YOU WIN!!!!</div>
            <button
              className="btn btn-success border"
              onClick={this.props.startOver}
            >
              Play again
            </button>
            <div className="secret" onClick={this.keepFighting}>
              New Game +
            </div>
          </div>
        ) : (
            ""
          )}
        <img id="background" src={battlescene} />
        <div id="battleArea">
          <h2 className="selectTitle">Battle</h2>
          <h2 className="selectTitle">Enemy #{this.state.level + 1}</h2>
          <h5 className="selectTitle">{this.state.enemy.name}</h5>
          <div id="enemyTable">
            <div
              className="hpbar"
              style={{
                width: `${(this.state.enemy.hp / this.state.enemy.str) * 100}%`,
              }}
            >
              HP
            </div>
            <img
              style={{ height: "25vh" }}
              alt="enemy avatar"
              src={this.state.enemy.image}
            ></img>
          </div>
          {/* <table>
            <thead>
              <tr>
                <th>HP:</th>
                <th>Str:</th>
                <th>Dex:</th>
                <th>Weapon:</th>
                <th>Armor:</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.state.enemy.hp}</td>
                <td>{this.state.enemy.str}</td>
                <td>{this.state.enemy.dex}</td>
                <td>
                  <img
                    alt={this.state.enemy.weapon.name}
                    src={this.state.enemy.weapon.img}
                  ></img>
                </td>
                <td>
                  <img
                    alt={this.state.enemy.armor.name}
                    src={this.state.enemy.armor.img}
                  ></img>
                </td>
              </tr>
            </tbody>
          </table> */}

          <div>
            {this.state.console.map((val, ind) => {
              return (
                <div className="selectTitle" key={ind}>
                  {val}
                </div>
              );
            })}
          </div>
          <div>
            {this.state.playerHp <= 0 || this.state.enemy.hp <= 0 ? (
              ""
            ) : (
                <div>
                  <button
                    className="btn btn-success border"
                    onClick={this.attack}
                  >
                    Attack
                </button>
                  <button
                    className="btn btn-success border"
                    onClick={this.defend}
                  >
                    Defend
                </button>
                  <button className="btn btn-success border" onClick={this.dodge}>
                    Dodge
                </button>
                </div>
              )}
            {this.state.playerHp <= 0 ? (
              <div>
                <button
                  className="btn btn-success border"
                  onClick={this.tryAgain}
                >
                  Try Again
                </button>
                <button
                  className="btn btn-success border"
                  onClick={this.props.startOver}
                >
                  Reset Character
                </button>
              </div>
            ) : this.state.enemy.hp <= 0 ? (
              <button
                className="btn btn-success border"
                onClick={this.keepFighting}
              >
                Keep Fighting
              </button>
            ) : (
                  ""
                )}
          </div>

          <div id="playerTable">
            <div id="playerImage">
              <div
                className="hpbar  "
                style={{
                  width: `${
                    (this.state.playerHp / this.state.player.str) * 100
                    }%`,
                }}
              >
                HP
              </div>

              <img
                id="player"
                alt="Player avatar"
                src={this.state.player.avatar}
              ></img>
            </div>
            {(
              <table id="items">
                <thead>
                  <tr>
                  <th>Apply items:</th>

                  </tr>
                </thead>
                <tbody>
                 
                  {this.state.player.items.map((val, ind) => {
                    
                    return (
                      <tr key={ind}>
                        <td>
                        {val.name}<br/>

                          <button
                            type="button"
                            key={ind}
                            id={ind}
                            style={{
                                backgroundImage: `url(${val.img})`,
                                backgroundSize: "40px 40px",
                                height: "44px",  
                                width: "44px"
                              }}
                            data-name={val.name}
                            onClick={this.applyItem}
                          >
                            {val.use ?
                            "✓" : "" }
                          </button>


                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
            <table>
              <thead>
                <tr>
                  <th>HP:</th>
                  <th>Str:</th>
                  <th>Dex:</th>
                  <th>Weapon:</th>
                  <th>Armor:</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{this.state.playerHp}</td>
                  <td>{this.state.player.str}</td>
                  <td>{this.state.player.dex}</td>
                  <td>
                    <img
                      alt={this.state.player.weapon.name}
                      src={this.state.player.weapon.img}
                    ></img>
                  </td>
                  <td>
                    <img
                      alt={this.state.player.armor.name}
                      src={this.state.player.armor.img}
                    ></img>
                  </td>
                </tr>
              </tbody>
            </table>

            <table></table>
          </div>
        </div>
      </div>
    );
  }
}

export default battle;
