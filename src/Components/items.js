import swordPic from "../images/sword.png";
import axePic from "../images/axe.png";
import daggerPic from "../images/dagger.png";
import clothPic from "../images/cloth.png";
import leatherPic from "../images/leather.png";
import platePic from "../images/plate.png";
import healPic from "../images/heal.png";
import buffPic from "../images/buff.png";
import swiftPic from "../images/swift.png";


const items = {
    heal: {
      img: healPic,
      name: "heal",
      value: 6,
      use: false
    },
    buff: {
      img: buffPic,
      name: "buff",
      value: 6,
      use: false
    },
    swift: {
      img: swiftPic,
      name: "swift",
      value: 6,
      use: false
    },
     cloth : {
    name: "cloth",
    img: clothPic,
    defense: 1,
    move: 0,
    dex: 0,
  },
  
 leather : {
    name: "leather",
    img: leatherPic,
    defense: 3,
    move: 0,
    dex: -1,
  },
  
 plate : {
    name: "plate",
    img: platePic,
    defense: 4,
    move: -1,
    dex: -2,
  },
  
  dragonSkin: {
    name: "Dragon's skin",
    defense: 6,
    move: -1,
    dex: -2,
  },

 longsword : {
    name: "sword",
    img: swordPic,
    attackMin: 2,
    attackMax: 8,
    minStr: 8,
  },
  
 dagger : {
    name: "dagger",
    img: daggerPic,
    attackMin: 1,
    attackMax: 6,
    minStr: 6,
  },
  
 axe : {
    name: "axe",
    img: axePic,
    attackMin: 4,
    attackMax: 12,
    minStr: 12,
  },

  dragonClaw : {
    name: "Dragon's Claws",
    attackMin: 6,
    attackMax: 12,
    minStr: 16
  }
}

export default items;