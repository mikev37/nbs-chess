/**
 * Function that takes in a game state, x and y 
 * In
 *  game_state - object describing the game as per schema in models/game.js
 *  x - tile asessed coordinate
 *  y - tile asessed coordinate
 * Out
 *  new board state
 */
var play = function(game_state,x,y){
    var n_state = game_state;
    
    var tile = n_state.board_state[x][y];
    
    if(tile.piece == 'Empty')
    {
        if(tile.movable)
        {
            //Move piece
        }
        else if(tile.attack_able){
            //Take piece
        }
    }
    else
    {
        if((tile.owner === 'White' && game_state.is_white)||(tile.owner === 'Black' && !game_state.is_white))
        {
            n_state.selected.piece = tile.piece;
            n_state.selected.x = tile.x;
            n_state.selected.y = tile.y;
            tile.selected = true;
            
            clear_board(n_state.board_state);
            //Find the movable and attackable pieces
            if(n_state.selected.piece === 'Pawn')
            {
                //pawns are little pieces of dung
                if(tile.owner === 'White')
                {
                    if(n_state.board_state[tile.x][tile.y-1].owner === 'None')
                    {
                        n_state.board_state[tile.x][tile.y-1].movable = true;
                    }
                    if(tile.x > 0)
                    {
                        if(n_state.board_state[tile.x-1][tile.y-1].owner === 'Black')
                        {
                            n_state.board_state[tile.x-1][tile.y-1].attack_able = true;
                        }
                        else if(tile.y-1 === 2 && n_state.board_state[tile.x-1][tile.y-1].passanted)
                        {
                            n_state.board_state[tile.x-1][tile.y-1].attack_able = true;
                        }
                    }
                    if(tile.x <= 8)
                    {
                        if(n_state.board_state[tile.x+1][tile.y-1].owner === 'Black')
                        {
                            n_state.board_state[tile.x+1][tile.y-1].attack_able = true;
                        }
                        else if(tile.y-1 === 2 && n_state.board_state[tile.x+1][tile.y-1].passanted)
                        {
                            n_state.board_state[tile.x+1][tile.y-1].attack_able = true;
                        }
                    }
                }
                else
                {
                    if(n_state.board_state[tile.x][tile.y+1].owner === 'None')
                    {
                        n_state.board_state[tile.x][tile.y+1].movable = true;
                    }
                    if(tile.x > 0)
                    {
                        if(n_state.board_state[tile.x-1][tile.y+1].owner === 'White')
                        {
                            n_state.board_state[tile.x-1][tile.y+1].attack_able = true;
                        }
                        else if(tile.y+1 === 5 && n_state.board_state[tile.x-1][tile.y+1].passanted)
                        {
                            n_state.board_state[tile.x-1][tile.y+1].attack_able = true;
                        }
                    }
                    if(tile.x <= 8)
                    {
                        if(n_state.board_state[tile.x+1][tile.y+1].owner === 'White')
                        {
                            n_state.board_state[tile.x+1][tile.y+1].attack_able = true;
                        }
                        else if(tile.y+1 === 5 && n_state.board_state[tile.x+1][tile.y+1].passanted)
                        {
                            n_state.board_state[tile.x+1][tile.y+1].attack_able = true;
                        }
                    }
                }
            }
            else
            {
                switch(tile.piece)
                {
                    case 'King': 
                        move(n_state.board_state,0,1,tile.x,tile.y,n_state.selected,1);
                        move(n_state.board_state,0,-1,tile.x,tile.y,n_state.selected,1);
                        move(n_state.board_state,1,0,tile.x,tile.y,n_state.selected,1);
                        move(n_state.board_state,-1,0,tile.x,tile.y,n_state.selected,1);
                        move(n_state.board_state,1,-1,tile.x,tile.y,n_state.selected,1);
                        move(n_state.board_state,1,1,tile.x,tile.y,n_state.selected,1);
                        move(n_state.board_state,-1,-1,tile.x,tile.y,n_state.selected,1);
                        move(n_state.board_state,-1,1,tile.x,tile.y,n_state.selected,1);
                        break;
                    case 'Queen': 
                        move(n_state.board_state,0,1,tile.x,tile.y,n_state.selected,8);
                        move(n_state.board_state,0,-1,tile.x,tile.y,n_state.selected,8);
                        move(n_state.board_state,1,0,tile.x,tile.y,n_state.selected,8);
                        move(n_state.board_state,-1,0,tile.x,tile.y,n_state.selected,8);
                        move(n_state.board_state,1,-1,tile.x,tile.y,n_state.selected,8);
                        move(n_state.board_state,1,1,tile.x,tile.y,n_state.selected,8);
                        move(n_state.board_state,-1,-1,tile.x,tile.y,n_state.selected,8);
                        move(n_state.board_state,-1,1,tile.x,tile.y,n_state.selected,8);
                        break;
                    case 'Rook':
                        move(n_state.board_state,0,1,tile.x,tile.y,n_state.selected,8);
                        move(n_state.board_state,0,-1,tile.x,tile.y,n_state.selected,8);
                        move(n_state.board_state,1,0,tile.x,tile.y,n_state.selected,8);
                        move(n_state.board_state,-1,0,tile.x,tile.y,n_state.selected,8);
                        break;
                        
                    case 'Knight':
                        move(n_state.board_state,2,1,tile.x,tile.y,n_state.selected,1);
                        move(n_state.board_state,2,-1,tile.x,tile.y,n_state.selected,1);
                        move(n_state.board_state,1,2,tile.x,tile.y,n_state.selected,1);
                        move(n_state.board_state,-1,2,tile.x,tile.y,n_state.selected,1);
                        move(n_state.board_state,1,-2,tile.x,tile.y,n_state.selected,1);
                        move(n_state.board_state,-1,-2,tile.x,tile.y,n_state.selected,1);
                        move(n_state.board_state,-2,-1,tile.x,tile.y,n_state.selected,1);
                        move(n_state.board_state,-2,1,tile.x,tile.y,n_state.selected,1);
                        break;
                        
                    case 'Bishop':
                        move(n_state.board_state,1,-1,tile.x,tile.y,n_state.selected,8);
                        move(n_state.board_state,1,1,tile.x,tile.y,n_state.selected,8);
                        move(n_state.board_state,-1,-1,tile.x,tile.y,n_state.selected,8);
                        move(n_state.board_state,-1,1,tile.x,tile.y,n_state.selected,8);
                        break;
                }
            }
            
        }
    }
    
    return n_state;
}

/**
 * Removes all current selected movable, passantable and attackable 
 */
var clear_board = function(board_state){
    for(var i = 0; i < board_state.length; i++)
    {
        for(var j = 0; j < board_state.length; j++)
        {
            board_state[i][j].selected = false;
            board_state[i][j].attack_able = false;
            board_state[i][j].movable = false;
            board_state[i][j].passanted = false;
        }
    }
}


/**
 * Removes all current selected movable, passantable and attackable 
 */
var clear_board = function(board_state,selected){
    for(var i = 0; i < board_state.length; i++)
    {
        for(var j = 0; j < board_state.length; j++)
        {
            board_state[i][j].selected = false;
            board_state[i][j].attack_able = false;
            board_state[i][j].movable = false;
            board_state[i][j].passanted = false;
        }
    }
    selected.piece = 'Empty';
    selected.x = -1;
    selected.y = -1;
}
/**
 * Calculates the threatened and supported tiles
 */
var calc_threat = function(board_state){
    for(var i = 0; i < board_state.length; i++)
    {
        for(var j = 0; j < board_state.length; j++)
        {
            var tile = board_state[i][j];
            if(tile.piece !== 'Empty')
            {
                if(tile.piece === 'Pawn')
                {
                    
                }
                else
                {
                    
                }
            }
        }
    }
}

/**
 * Calculates the threatened and supported tiles
 */
var calc_threat_move = function(board_state,dx,dy,x,y,selected,repeat){
    var tile = board_state[selected.x][selected.y];
    if(x+dx >= 0 && x + dx < 8 && y + dy >= 0 && y + dy < 8)
    {
        var n_tile = board_state[x+dx][y+dy];
        if(n_tile.owner === "None"){
            n_tile.threatened++;
            if(repeat > 1)
            {
                calc_threat_move(board_state,dx,dy,x+dx,y+dy,selected,repeat-1);
            }
        }
        else{
            if(n_tile.owner !== tile.owner)
            {
                n_tile.threatened++;
            }
        }
    }
}

/**
 * Marks up the board so it
 * 
 * dx - where the next tile will be
 * dy 
 * 
 * x - where the current looking at tile is
 * y
 * 
 * selected - the moving piece
 * 
 * repeat - whether this move is propagated outwards
 * 
 * 
 * TODO Account for checking?
 */
var move = function(board_state,dx,dy,x,y,selected,repeat){
    var tile = board_state[selected.x][selected.y];
    if(x+dx >= 0 && x + dx < 8 && y + dy >= 0 && y + dy < 8)
    {
        var n_tile = board_state[x+dx][y+dy];
        if(n_tile.owner === "None"){
            n_tile.moveable = true;
            if(repeat > 1)
            {
                move(board_state,dx,dy,x+dx,y+dy,selected,repeat-1);
            }
        }
        else{
            if(n_tile.owner !== tile.owner)
            {
                n_tile.attack_able = true;
            }
        }
    }
}


export default play;