const board = [ 
    [
        {
            "piece":"Rook",
            "owner":"White",
            "tile":"Black",
            "x":0,
            "y":0,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
        {
            "piece":"Knight",
            "owner":"White",
            "tile":"White",
            "x":1,
            "y":0,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
        {
            "piece":"Bishop",
            "owner":"White",
            "tile":"Black",
            "x":2,
            "y":0,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
        {
            "piece":"Queen",
            "owner":"White",
            "tile":"White",
            "x":3,
            "y":0,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
       {
            "piece":"King",
            "owner":"White",
            "tile":"Black",
            "x":4,
            "y":0,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
                {
            "piece":"Bishop",
            "owner":"White",
            "tile":"White",
            "x":5,
            "y":0,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
        {
            "piece":"Knight",
            "owner":"White",
            "tile":"Black",
            "x":6,
            "y":0,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
        {
            "piece":"Rook",
            "owner":"White",
            "tile":"White",
            "x":7,
            "y":0,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        }
        
    ],
    [
        
        {
            "piece":"Pawn",
            "owner":"White",
            "tile":"White",
            "x":0,
            "y":1,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
                {
            "piece":"Pawn",
            "owner":"White",
            "tile":"Black",
            "x":1,
            "y":1,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
        {
            "piece":"Pawn",
            "owner":"White",
            "tile":"White",
            "x":2,
            "y":1,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
        {
            "piece":"Pawn",
            "owner":"White",
            "tile":"Black",
            "x":3,
            "y":1,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
        {
            "piece":"Pawn",
            "owner":"White",
            "tile":"White",
            "x":4,
            "y":1,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
       {
            "piece":"Pawn",
            "owner":"White",
            "tile":"Black",
            "x":5,
            "y":1,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
                {
            "piece":"Pawn",
            "owner":"White",
            "tile":"White",
            "x":6,
            "y":1,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
        {
            "piece":"Pawn",
            "owner":"White",
            "tile":"Black",
            "x":7,
            "y":1,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        }
    ],
    [
       {
            "piece":"Empty",
            "owner":"None",
            "tile":"Black",
            "x":0,
            "y":2,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
        {
            "piece":"Empty",
            "owner":"None",
            "tile":"White",
            "x":1,
            "y":2,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
        {
            "piece":"Empty",
            "owner":"None",
            "tile":"Black",
            "x":2,
            "y":2,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
        {
            "piece":"Empty",
            "owner":"None",
            "tile":"White",
            "x":3,
            "y":2,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
       {
            "piece":"Empty",
            "owner":"None",
            "tile":"Black",
            "x":4,
            "y":2,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
                {
            "piece":"Empty",
            "owner":"None",
            "tile":"White",
            "x":5,
            "y":2,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
        {
            "piece":"Empty",
            "owner":"None",
            "tile":"Black",
            "x":6,
            "y":2,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
        {
            "piece":"Empty",
            "owner":"None",
            "tile":"White",
            "x":7,
            "y":2,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        }
        
    ],
    [
        
        {
            "piece":"Empty",
            "owner":"None",
            "tile":"White",
            "x":0,
            "y":3,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
                {
            "piece":"Empty",
            "owner":"None",
            "tile":"Black",
            "x":1,
            "y":3,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
        {
            "piece":"Empty",
            "owner":"None",
            "tile":"White",
            "x":2,
            "y":3,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
        {
            "piece":"Empty",
            "owner":"None",
            "tile":"Black",
            "x":3,
            "y":3,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
        {
            "piece":"Empty",
            "owner":"None",
            "tile":"White",
            "x":4,
            "y":3,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
       {
            "piece":"Empty",
            "owner":"None",
            "tile":"Black",
            "x":5,
            "y":3,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
                {
            "piece":"Empty",
            "owner":"None",
            "tile":"White",
            "x":6,
            "y":3,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
        {
            "piece":"Empty",
            "owner":"None",
            "tile":"Black",
            "x":7,
            "y":3,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        }
    ],
        [
       {
            "piece":"Empty",
            "owner":"None",
            "tile":"Black",
            "x":0,
            "y":4,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
        {
            "piece":"Empty",
            "owner":"None",
            "tile":"White",
            "x":1,
            "y":4,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
        {
            "piece":"Empty",
            "owner":"None",
            "tile":"Black",
            "x":2,
            "y":4,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
        {
            "piece":"Empty",
            "owner":"None",
            "tile":"White",
            "x":3,
            "y":4,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
       {
            "piece":"Empty",
            "owner":"None",
            "tile":"Black",
            "x":4,
            "y":4,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
                {
            "piece":"Empty",
            "owner":"None",
            "tile":"White",
            "x":5,
            "y":4,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
        {
            "piece":"Empty",
            "owner":"None",
            "tile":"Black",
            "x":6,
            "y":4,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
        {
            "piece":"Empty",
            "owner":"None",
            "tile":"White",
            "x":7,
            "y":4,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        }
        
    ],
    [
        
        {
            "piece":"Empty",
            "owner":"None",
            "tile":"White",
            "x":0,
            "y":5,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
                {
            "piece":"Empty",
            "owner":"None",
            "tile":"Black",
            "x":1,
            "y":5,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
        {
            "piece":"Empty",
            "owner":"None",
            "tile":"White",
            "x":2,
            "y":5,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
        {
            "piece":"Empty",
            "owner":"None",
            "tile":"Black",
            "x":3,
            "y":5,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
        {
            "piece":"Empty",
            "owner":"None",
            "tile":"White",
            "x":4,
            "y":5,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
       {
            "piece":"Empty",
            "owner":"None",
            "tile":"Black",
            "x":5,
            "y":5,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
                {
            "piece":"Empty",
            "owner":"None",
            "tile":"White",
            "x":6,
            "y":5,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
        {
            "piece":"Empty",
            "owner":"None",
            "tile":"Black",
            "x":7,
            "y":5,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        }
    ],
    [
        {
            "piece":"Pawn",
            "owner":"Black",
            "tile":"Black",
            "x":0,
            "y":6,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
        {
            "piece":"Pawn",
            "owner":"Black",
            "tile":"White",
            "x":1,
            "y":6,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
                {
            "piece":"Pawn",
            "owner":"Black",
            "tile":"Black",
            "x":2,
            "y":6,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
        {
            "piece":"Pawn",
            "owner":"Black",
            "tile":"White",
            "x":3,
            "y":6,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
        {
            "piece":"Pawn",
            "owner":"Black",
            "tile":"Black",
            "x":4,
            "y":6,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
        {
            "piece":"Pawn",
            "owner":"Black",
            "tile":"White",
            "x":5,
            "y":6,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
       {
            "piece":"Pawn",
            "owner":"Black",
            "tile":"Black",
            "x":6,
            "y":6,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
                {
            "piece":"Pawn",
            "owner":"Black",
            "tile":"White",
            "x":7,
            "y":6,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        }

    ],
    [
     {
            "piece":"Rook",
            "owner":"Black",
            "tile":"White",
            "x":0,
            "y":7,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
        {
            "piece":"Knight",
            "owner":"Black",
            "tile":"Black",
            "x":1,
            "y":7,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
        {
            "piece":"Bishop",
            "owner":"Black",
            "tile":"White",
            "x":2,
            "y":7,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
        {
            "piece":"Queen",
            "owner":"Black",
            "tile":"Black",
            "x":3,
            "y":7,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
       {
            "piece":"King",
            "owner":"Black",
            "tile":"White",
            "x":4,
            "y":7,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
                {
            "piece":"Bishop",
            "owner":"Black",
            "tile":"Black",
            "x":5,
            "y":7,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
        {
            "piece":"Knight",
            "owner":"Black",
            "tile":"White",
            "x":6,
            "y":7,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        },
        {
            "piece":"Rook",
            "owner":"Black",
            "tile":"Black",
            "x":7,
            "y":7,
            "selected":false,//whether the current node is selected
            "moveable":false,//whether the current node is an option to move to
            "attack_able":false, //whether the current node is an option to attack
            "threatened":0, //how many enemy pieces can attack here
            "supported":0 //how many friendly pieces can attack here
        }
        
    ]
    
];


exports.board = board;