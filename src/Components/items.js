const items = {
    heal: {
      name: "heal",
      value: 6
    },
    buff: {
      name: "buff",
      value: 6
    },
    swift: {
      name: "swift",
      value: 6
    },
     cloth : {
    name: "cloth",
    defense: 1,
    move: 0,
    dex: 0,
  },
  
 leather : {
    name: "leather",
    defense: 3,
    move: 0,
    dex: -1,
  },
  
 plate : {
    name: "plate",
    defense: 4,
    move: -1,
    dex: -2,
  },
  
 longsword : {
    name: "long sword",
    attackMin: 2,
    attackMax: 8,
    minStr: 8,
  },
  
 dagger : {
    name: "dagger",
    attackMin: 1,
    attackMax: 6,
    minStr: 6,
  },
  
 axe : {
    name: "axe",
    attackMin: 4,
    attackMax: 12,
    minStr: 12,
  }
}

export default items;