/**
 * Function that takes in a game state, x and y 
 * In
 *  game_state - object describing the game as per schema in models/game.js
 *  x - tile asessed coordinate
 *  y - tile asessed coordinate
 * Out
 *  new board state
 */
var promise = new Promise(function(){
    
});
 
var play = 
    function(game_state,x,y){
        var n_state = game_state;
        
        var tile = n_state.board_state[x][y];
        
        console.log("WE're in play");
        
        if(tile.piece == 'Empty' || tile.attack_able)
        {
            
            console.log("making moves");
            if(game_state.selected === null || game_state.selected.x === -1) return game_state;
            n_state = make_move(n_state,x,y);
            clear_board(n_state.board_state,n_state.selected);
            end_turn(n_state);
        }
        else
        {
            if((tile.owner === 'White' && game_state.is_white)||(tile.owner === 'Black' && !game_state.is_white))
            {
                console.log("Selecting unity");
                clear_board(n_state.board_state,n_state.selected);
                n_state.selected.piece = tile.piece;
                n_state.selected.x = tile.x;
                n_state.selected.y = tile.y;
                tile.selected = true;
                //Find the moveable and attackable pieces
                if(n_state.selected.piece === 'Pawn')
                {
                    console.log("moving pawn");
                    //pawns are little pieces of dung
                    if(tile.owner === 'Black')
                    {
                        if(n_state.board_state[tile.y-1][tile.x].owner === 'None')
                        {
                            n_state.board_state[tile.y-1][tile.x].moveable = true;
                        }
                        if(tile.x > 0)
                        {
                            if(n_state.board_state[tile.y-1][tile.x-1].owner === 'White')
                            {
                                n_state.board_state[tile.y-1][tile.x-1].attack_able = true;
                            }
                            else if(tile.y-1 === 2 && n_state.board_state[tile.y-1][tile.x-1].passanted)
                            {
                                n_state.board_state[tile.y-1][tile.x-1].attack_able = true;
                            }
                        }
                        if(tile.x < 7)
                        {
                            if(n_state.board_state[tile.y-1][tile.x+1].owner === 'White')
                            {
                                n_state.board_state[tile.y-1][tile.x+1].attack_able = true;
                            }
                            else if(tile.y-1 === 2 && n_state.board_state[tile.y-1][tile.x+1].passanted)
                            {
                                n_state.board_state[tile.y-1][tile.x+1].attack_able = true;
                            }
                        }
                    }
                    else
                    {
                        if(n_state.board_state[tile.y+1][tile.x].owner === 'None')
                        {
                            n_state.board_state[tile.y+1][tile.x].moveable = true;
                        }
                        if(tile.x > 0)
                        {
                            if(n_state.board_state[tile.y+1][tile.x-1].owner === 'Black')
                            {
                                n_state.board_state[tile.y+1][tile.x-1].attack_able = true;
                            }
                            else if(tile.y+1 === 5 && n_state.board_state[tile.y+1][tile.x-1].passanted)
                            {
                                n_state.board_state[tile.y+1][tile.x-1].attack_able = true;
                            }
                        }
                        if(tile.x < 7)
                        {
                            if(n_state.board_state[tile.y+1][tile.x+1].owner === 'Black')
                            {
                                n_state.board_state[tile.y+1][tile.x+1].attack_able = true;
                            }
                            else if(tile.y+1 === 5 && n_state.board_state[tile.y+1][tile.x+1].passanted)
                            {
                                n_state.board_state[tile.y+1][tile.x+1].attack_able = true;
                            }
                        }
                    }
                }
                else
                {
                    console.log("selecting not pawn")
                    switch(tile.piece)
                    {
                        case 'King': 
                            move(n_state.board_state,0,1,tile.y,tile.x,n_state.selected,1);
                            move(n_state.board_state,0,-1,tile.y,tile.x,n_state.selected,1);
                            move(n_state.board_state,1,0,tile.y,tile.x,n_state.selected,1);
                            move(n_state.board_state,-1,0,tile.y,tile.x,n_state.selected,1);
                            move(n_state.board_state,1,-1,tile.y,tile.x,n_state.selected,1);
                            move(n_state.board_state,1,1,tile.y,tile.x,n_state.selected,1);
                            move(n_state.board_state,-1,-1,tile.y,tile.x,n_state.selected,1);
                            move(n_state.board_state,-1,1,tile.y,tile.x,n_state.selected,1);
                            break;
                        case 'Queen': 
                            move(n_state.board_state,0,1,tile.y,tile.x,n_state.selected,8);
                            move(n_state.board_state,0,-1,tile.y,tile.x,n_state.selected,8);
                            move(n_state.board_state,1,0,tile.y,tile.x,n_state.selected,8);
                            move(n_state.board_state,-1,0,tile.y,tile.x,n_state.selected,8);
                            move(n_state.board_state,1,-1,tile.y,tile.x,n_state.selected,8);
                            move(n_state.board_state,1,1,tile.y,tile.x,n_state.selected,8);
                            move(n_state.board_state,-1,-1,tile.y,tile.x,n_state.selected,8);
                            move(n_state.board_state,-1,1,tile.y,tile.x,n_state.selected,8);
                            break;
                        case 'Rook':
                            move(n_state.board_state,0,1,tile.y,tile.x,n_state.selected,8);
                            move(n_state.board_state,0,-1,tile.y,tile.x,n_state.selected,8);
                            move(n_state.board_state,1,0,tile.y,tile.x,n_state.selected,8);
                            move(n_state.board_state,-1,0,tile.y,tile.x,n_state.selected,8);
                            break;
                            
                        case 'Knight':
                            move(n_state.board_state,2,1,tile.y,tile.x,n_state.selected,1);
                            move(n_state.board_state,2,-1,tile.y,tile.x,n_state.selected,1);
                            move(n_state.board_state,1,2,tile.y,tile.x,n_state.selected,1);
                            move(n_state.board_state,-1,2,tile.y,tile.x,n_state.selected,1);
                            move(n_state.board_state,1,-2,tile.y,tile.x,n_state.selected,1);
                            move(n_state.board_state,-1,-2,tile.y,tile.x,n_state.selected,1);
                            move(n_state.board_state,-2,-1,tile.y,tile.x,n_state.selected,1);
                            move(n_state.board_state,-2,1,tile.y,tile.x,n_state.selected,1);
                            break;
                            
                        case 'Bishop':
                            move(n_state.board_state,1,-1,tile.y,tile.x,n_state.selected,8);
                            move(n_state.board_state,1,1,tile.y,tile.x,n_state.selected,8);
                            move(n_state.board_state,-1,-1,tile.y,tile.x,n_state.selected,8);
                            move(n_state.board_state,-1,1,tile.y,tile.x,n_state.selected,8);
                            break;
                    }
                    console.log("Not pawn selected");
                }
                
            }
        }
        
        console.log("return gamestate");
        return n_state;
    }
    
/**
 * Removes all current selected moveable, passantable and attackable 
 */
var clear_board_threat = function(board_state){
    for(var i = 0; i < board_state.length; i++)
    {
        for(var j = 0; j < board_state.length; j++)
        {
            board_state[i][j].threat_white = 0;
            board_state[i][j].threat_black = 0;
        }
    }
    
    return board_state;
}


/**
 * Removes all current selected moveable, passantable and attackable 
 */
var clear_board = function(board_state,selected){
    for(var i = 0; i < board_state.length; i++)
    {
        for(var j = 0; j < board_state.length; j++)
        {
            board_state[i][j].selected = false;
            board_state[i][j].attack_able = false;
            board_state[i][j].moveable = false;
            board_state[i][j].passanted = false;
        }
    }
    if(selected!=null){
        selected.piece = 'Empty';
        selected.x = -1;
        selected.y = -1;
    }
}
/**
 * Calculates the threatened and supported tiles
 */
var calc_threat = function(board_state){
    for(var i = 0; i < board_state.length; i++)
    {
        for(var j = 0; j < board_state.length; j++)
        {
            var tile = board_state[j][i];
            if(tile.piece !== 'Empty')
            {
                if(tile.piece === 'Pawn')
                {
                    //pawns are little pieces of dung
                    if(tile.owner === 'Black')
                    {
                        if(i > 0)
                        {
                            if(board_state[j-1][i-1].owner === 'White')
                            {
                                board_state[j-1][i-1].threat_white++;
                            }
                            else if(j-1 === 2 && board_state[j-1][i-1].passanted)
                            {
                                board_state[j-1][i-1].threat_white++;
                            }
                        }
                        if(i < 7)
                        {
                            if(board_state[j-1][i+1].owner === 'White')
                            {
                                board_state[j-1][i+1].threat_white++;
                            }
                            else if(j-1 === 2 && board_state[j-1][i+1].passanted)
                            {
                                board_state[j-1][i+1].threat_white++;
                            }
                        }
                    }
                    else
                    {
                        if(i > 0)
                        {
                            if(board_state[j+1][i-1].owner === 'Black')
                            {
                                board_state[j+1][i-1].threat_black++;
                            }
                            else if(j+1 === 5 && board_state[j+1][i-1].passanted)
                            {
                                board_state[j+1][i-1].threat_black++;
                            }
                        }
                        if(i < 7)
                        {
                            if(board_state[j+1][i+1].owner === 'Black')
                            {
                                board_state[j+1][i+1].threat_black++;
                            }
                            else if(j+1 === 5 && board_state[j+1][i+1].passanted)
                            {
                                board_state[j+1][i+1].threat_black++;
                            }
                        }
                    }
                }
                else
                {
                    switch(tile.piece,i,j)
                    {
                        case 'King': 
                            calc_threat_move(board_state,0,1,i,j,tile.piece,i,j,1);
                            calc_threat_move(board_state,0,-1,i,j,tile.piece,i,j,1);
                            calc_threat_move(board_state,1,0,i,j,tile.piece,i,j,1);
                            calc_threat_move(board_state,-1,0,i,j,tile.piece,i,j,1);
                            calc_threat_move(board_state,1,-1,i,j,tile.piece,i,j,1);
                            calc_threat_move(board_state,1,1,i,j,tile.piece,i,j,1);
                            calc_threat_move(board_state,-1,-1,i,j,tile.piece,i,j,1);
                            calc_threat_move(board_state,-1,1,i,j,tile.piece,i,j,1);
                            break;
                        case 'Queen': 
                            calc_threat_move(board_state,0,1,i,j,tile.piece,i,j,8);
                            calc_threat_move(board_state,0,-1,i,j,tile.piece,i,j,8);
                            calc_threat_move(board_state,1,0,i,j,tile.piece,i,j,8);
                            calc_threat_move(board_state,-1,0,i,j,tile.piece,i,j,8);
                            calc_threat_move(board_state,1,-1,i,j,tile.piece,i,j,8);
                            calc_threat_move(board_state,1,1,i,j,tile.piece,i,j,8);
                            calc_threat_move(board_state,-1,-1,i,j,tile.piece,i,j,8);
                            calc_threat_move(board_state,-1,1,i,j,tile.piece,i,j,8);
                            break;
                        case 'Rook':
                            calc_threat_move(board_state,0,1,i,j,tile.piece,i,j,8);
                            calc_threat_move(board_state,0,-1,i,j,tile.piece,i,j,8);
                            calc_threat_move(board_state,1,0,i,j,tile.piece,i,j,8);
                            calc_threat_move(board_state,-1,0,i,j,tile.piece,i,j,8);
                            break;
                            
                        case 'Knight':
                            calc_threat_move(board_state,2,1,i,j,tile.piece,i,j,1);
                            calc_threat_move(board_state,2,-1,i,j,tile.piece,i,j,1);
                            calc_threat_move(board_state,1,2,i,j,tile.piece,i,j,1);
                            calc_threat_move(board_state,-1,2,i,j,tile.piece,i,j,1);
                            calc_threat_move(board_state,1,-2,i,j,tile.piece,i,j,1);
                            calc_threat_move(board_state,-1,-2,i,j,tile.piece,i,j,1);
                            calc_threat_move(board_state,-2,-1,i,j,tile.piece,i,j,1);
                            calc_threat_move(board_state,-2,1,i,j,tile.piece,i,j,1);
                            break;
                            
                        case 'Bishop':
                            calc_threat_move(board_state,1,-1,i,j,tile.piece,i,j,8);
                            calc_threat_move(board_state,1,1,i,j,tile.piece,i,j,8);
                            calc_threat_move(board_state,-1,-1,i,j,tile.piece,i,j,8);
                            calc_threat_move(board_state,-1,1,i,j,tile.piece,i,j,8);
                            break;
                    }
                }
            }
        }
    }
}

var move_piece = function(game_state,nx,ny){
        var selected = game_state.selected;
        var orgin_tile = game_state.board_state[selected.y][selected.x];
        var tile = game_state.board_state[nx][ny];
        if(tile.moveable)
        {
            //Move piece
            tile.piece = selected.piece;
            tile.owner = orgin_tile.owner;
            
            orgin_tile.owner = "None";
            orgin_tile.piece = "Empty";
        }
        else if(tile.attack_able){
            //Take piece
            if(game_state.is_white){
                var capture = {};
                capture.name = tile.piece;
                game_state.white_captured.push(capture);
            }
            else{
                var capture = {};
                capture.name = tile.piece;
                game_state.black_captured.push(capture);
            }
            tile.piece = selected.piece;
            tile.owner = orgin_tile.owner;
            orgin_tile.owner = "None";
            orgin_tile.piece = "Empty";
        }
        clear_board(game_state.board_state,game_state.selected);
}

var king_threat = function(game_state,is_white){
    var board_state = game_state.board_state;
    for(var i = 0; i < board_state.length; i++)
    {
        for(var j = 0; j < board_state.length; j++)
        {
            if(is_white && board_state[i][j].piece === "King" && board_state[i][j].owner === "White" && board_state[i][j].threat_black > 0)
            {
                return true;
            }
            else if(!is_white && board_state[i][j].piece === "King" && board_state[i][j].owner === "Black" && board_state[i][j].threat_white > 0){
                return true;
            }
        }
    }
    
    return false;
}

/**
 Check if this move is valid with the kings and such.
*/
var make_move = function(game_state, nx,ny){
    var copy_board = JSON.parse(JSON.stringify(game_state));
    //clear the threat
    copy_board.board_state = clear_board_threat(copy_board.board_state);
    //find if the king is under threat after the move
    clear_board_threat(copy_board.board_state);
    move_piece(copy_board,nx,ny);
    calc_threat(copy_board.board_state);
    //reject the move if so.
    if(king_threat(copy_board,copy_board.is_white)){
        //reject turn
        game_state.error_message = "King would remain in check!";
        return game_state;
    }
    //Otherwise perform the move
    else{
        game_state.error_message = "";
        clear_board_threat(game_state.board_state);
        move_piece(game_state,nx,ny);
        calc_threat(game_state.board_state);
        game_state.check_black = king_threat(game_state,false);
        game_state.check_white = king_threat(game_state,true);
    }
    return game_state
    //
   
}

/**End turn
 * 
 * TODO Find behavior to see if the game is over
 * 
 */
var end_turn = function(game_state){
    game_state.is_white = !game_state.is_white;

    return game_state;
} 

/**
 * Calculates the threatened and supported tiles
 */
var calc_threat_move = function(board_state,dx,dy,x,y,selected,ox,oy,repeat){
    var tile = board_state[oy][ox];
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
                if(tile.owner === "White"){
                    n_tile.threat_white++;
                }
                else{
                    n_tile.threat_black++;
                }
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
 */
var move = function(board_state,dx,dy,x,y,selected,repeat){
    var tile = board_state[selected.y][selected.x];
    if(x+dx >= 0 && x + dx < 8 && y + dy >= 0 && y + dy < 8)
    {
        var n_tile = board_state[x+dx][y+dy];
        var king_stop = (selected.piece === "King" && tile.owner === "Black" && n_tile.threat_white === 0)||(selected.piece === "King" && tile.owner === "White" && n_tile.threat_black === 0);
        if(king_stop||selected.piece !== "King")
        {
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
}


exports.default = play;