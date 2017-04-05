/**
 * Function that takes in a game state, x and y 
 * In
 *  game_state - object describing the game as per schema in models/game.js
 *  x - tile asessed coordinate
 *  y - tile asessed coordinate
 * Out
 *  new board state
 */
var play = 
    function(game_state,x,y){
        var n_state = game_state;
        
        var tile = n_state.board_state[x][y];
        
        console.log("WE're in play");
        
        if(tile.piece == 'Empty' || tile.attack_able)
        {
            
            console.log("making moves");
            if(game_state.selected === null || game_state.selected.x === -1) return game_state;
            
            if(!tile.moveable && !tile.attack_able) return game_state;
            
            n_state = make_move(n_state,x,y);
            clear_board(n_state.is_white,n_state.board_state,n_state.selected);
            end_turn(n_state);
        }
        else
        {
            if((tile.owner === 'White' && game_state.is_white)||(tile.owner === 'Black' && !game_state.is_white))
            {
                console.log("Selecting unity");
                clear_board(n_state.is_white,n_state.board_state,n_state.selected);
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
                            if(tile.y === 6 && n_state.board_state[tile.y-2][tile.x].owner === 'None')
                            {
                                n_state.board_state[tile.y-2][tile.x].moveable = true;
                            }
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
                            if(tile.y === 1 && n_state.board_state[tile.y+2][tile.x].owner === 'None')
                            {
                                n_state.board_state[tile.y+2][tile.x].moveable = true;
                            }
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
                    if(tile.piece === "King"){
                        if(n_state.is_white && !n_state.check_white){
                            //if none of the places between the king and rook are occupied or in check, add as movement option
                            if(n_state.white_castle_l && n_state.board_state[0][3].piece === "Empty" && n_state.board_state[0][2].piece === "Empty" && n_state.board_state[0][1].piece === "Empty")
                            {
                                if(n_state.board_state[0][3].threat_black === 0 && n_state.board_state[0][2].threat_black === 0)
                                {
                                    n_state.board_state[0][2].moveable = true;
                                }
                            }
                            if(n_state.white_castle_r && n_state.board_state[0][5].piece === "Empty" && n_state.board_state[0][6].piece === "Empty")
                            {
                                if(n_state.board_state[0][5].threat_black === 0 && n_state.board_state[0][6].threat_black === 0)
                                {
                                    n_state.board_state[0][6].moveable = true;
                                }
                            }
                        }
                        else if(!n_state.is_white &&  !n_state.check_black){
                            if(n_state.black_castle_l &&  n_state.board_state[7][2].piece === "Empty" &&  n_state.board_state[7][3].piece === "Empty" && n_state.board_state[7][1].piece === "Empty")
                            {
                                if(n_state.board_state[7][3].threat_white === 0 && n_state.board_state[7][2].threat_white === 0)
                                {
                                    n_state.board_state[7][2].moveable = true;
                                }
                            }
                            if(n_state.black_castle_r && n_state.board_state[7][5].piece === "Empty" && n_state.board_state[7][6].piece === "Empty")
                            {
                                if(n_state.board_state[7][5].threat_white === 0 && n_state.board_state[7][6].threat_white === 0)
                                {
                                    n_state.board_state[7][6].moveable = true;
                                }
                            }
                        }
                    }
                    switch(tile.piece)
                    {
                        case 'King': 
                            //Add a special case for Castling
                            
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
 * Removes all current threat
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

/*
    Pawn bullshit
*/
var pawn_check = function(game_state,nx,ny){
    var selected = game_state.selected;
    var orgin_tile = game_state.board_state[selected.y][selected.x];
    var tile = game_state.board_state[nx][ny];
    if(tile.moveable)
    {
        if(orgin_tile.piece === "Pawn"&&orgin_tile.y === 1 && tile.y === 3)
        {
            game_state.board_state[2][orgin_tile.x].passanted = true;
        }
        if(orgin_tile.piece === "Pawn"&&orgin_tile.y ===6 && tile.y === 4 )
        {
            game_state.board_state[5][orgin_tile.x].passanted = true;
        }
    }
    if(orgin_tile.piece === "Pawn" && orgin_tile.owner === "White" && tile.y === 7)
    {
        orgin_tile.piece = "Queen";
    }
    if(orgin_tile.piece === "Pawn" && orgin_tile.owner === "Black" && tile.y === 0)
    {
        orgin_tile.piece = "Queen";
    }
    
    return game_state;
}
/**
 * Removes all current selected moveable, passantable and attackable 
 */
var clear_board = function(is_white,board_state,selected){
    for(var i = 0; i < board_state.length; i++)
    {
        for(var j = 0; j < board_state.length; j++)
        {
            board_state[i][j].selected = false;
            board_state[i][j].attack_able = false;
            board_state[i][j].moveable = false;
        }
    }
    if(selected!=null){
        selected.piece = 'Empty';
        selected.x = -1;
        selected.y = -1;
    }
}

/*
Specifically clears the passant squares, only called on the end of a turn
*/
var clear_board_passant = function(is_white,board_state,selected){
    for(var i = 0; i < board_state.length; i++)
    {
        for(var j = 0; j < board_state.length; j++)
        {
            if(i == 2 && !is_white)
                board_state[i][j].passanted = false;
            if(i == 5 && is_white)
                board_state[i][j].passanted = false;
        }
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
            var tile = board_state[i][j];
            if(tile.piece !== 'Empty')
            {
                if(tile.piece === 'Pawn')
                {
                    if(tile.owner === 'Black')
                    {
                        if(tile.x > 0)
                        {
                                board_state[tile.y-1][tile.x-1].threat_black++;
                        }
                        if(tile.x < 7)
                        {
                                board_state[tile.y-1][tile.x+1].threat_black++;
                        }
                    }
                    else
                    {
                        if(tile.x > 0)
                        {
                                board_state[tile.y+1][tile.x-1].threat_white++;
                        }
                        if(tile.x < 7)
                        {
                                board_state[tile.y+1][tile.x+1].threat_white++;
                        }
                    }
                }
                else{
                    console.log("Finding Threat for Piece at "+i+" "+j);
                    console.log("The tile is "+tile.x+" "+tile.y);
                    console.log("The piece is "+tile.piece);
                    
                    switch(tile.piece)
                    {
                        case 'King': 
                            calc_threat_move(board_state,0,1,j,i,tile,1);
                            calc_threat_move(board_state,0,-1,j,i,tile,1);
                            calc_threat_move(board_state,1,0,j,i,tile,1);
                            calc_threat_move(board_state,-1,0,j,i,tile,1);
                            calc_threat_move(board_state,1,-1,j,i,tile,1);
                            calc_threat_move(board_state,1,1,j,i,tile,1);
                            calc_threat_move(board_state,-1,-1,j,i,tile,1);
                            calc_threat_move(board_state,-1,1,j,i,tile,1);
                            break;
                        case 'Queen': 
                            calc_threat_move(board_state,0,1,j,i,tile,8);
                            calc_threat_move(board_state,0,-1,j,i,tile,8);
                            calc_threat_move(board_state,1,0,j,i,tile,8);
                            calc_threat_move(board_state,-1,0,j,i,tile,8);
                            calc_threat_move(board_state,1,-1,j,i,tile,8);
                            calc_threat_move(board_state,1,1,j,i,tile,8);
                            calc_threat_move(board_state,-1,-1,j,i,tile,8);
                            calc_threat_move(board_state,-1,1,j,i,tile,8);
                            break;
                        case 'Rook':
                            calc_threat_move(board_state,0,1,j,i,tile,8);
                            calc_threat_move(board_state,0,-1,j,i,tile,8);
                            calc_threat_move(board_state,1,0,j,i,tile,8);
                            calc_threat_move(board_state,-1,0,j,i,tile,8);
                            break;
                            
                        case 'Knight':
                            calc_threat_move(board_state,2,1,j,i,tile,1);
                            calc_threat_move(board_state,2,-1,j,i,tile,1);
                            calc_threat_move(board_state,1,2,j,i,tile,1);
                            calc_threat_move(board_state,-1,2,j,i,tile,1);
                            calc_threat_move(board_state,1,-2,j,i,tile,1);
                            calc_threat_move(board_state,-1,-2,j,i,tile,1);
                            calc_threat_move(board_state,-2,-1,j,i,tile,1);
                            calc_threat_move(board_state,-2,1,j,i,tile,1);
                            break;
                            
                        case 'Bishop':
                            calc_threat_move(board_state,1,-1,j,i,tile,8);
                            calc_threat_move(board_state,1,1,j,i,tile,8);
                            calc_threat_move(board_state,-1,-1,j,i,tile,8);
                            calc_threat_move(board_state,-1,1,j,i,tile,8);
                            break;
                    }
                }
            }
        }
    }
    
    return board_state;
}

var passant_check = function(game_state,nx,ny){
    var selected = game_state.selected;
    var orgin_tile = game_state.board_state[selected.y][selected.x];
    var tile = game_state.board_state[nx][ny];
    
    if(tile.attack_able && tile.passanted)
    {
       if(tile.y === 2)
       {
           var ntile = game_state.board_state[3][tile.x];
           ntile.owner = "None";
           ntile.piece = "Empty";
       }
       else if(tile.y === 5)
       {
            var ntile = game_state.board_state[4][tile.x];
            ntile.owner = "None";
            ntile.piece = "Empty";
       }
       
    }
    
    return game_state;
}

var castle_check = function(game_state,nx,ny){
    var selected = game_state.selected;
    var orgin_tile = game_state.board_state[selected.y][selected.x];
    var tile = game_state.board_state[nx][ny];
    console.log("Castle Checking!");
    if(tile.moveable)
    {
        console.log("MOVABLE TILE");
        console.log("orgin_tile.owner "+orgin_tile.owner);
        console.log("selected.piece "+selected.piece);
        console.log("selected.y "+ selected.y);
        console.log("selected.x "+selected.x);
        if(orgin_tile.owner === "White" && selected.piece === "King" && selected.y === 0 && selected.x === 4)
            {
                game_state.white_castle_l = false;
                game_state.white_castle_r = false;
                if(tile.y === 0 && tile.x === 2 && game_state.white_castle_l)
                {
                    console.log("Moving left white rook");
                    var rook_tile = game_state.board_state[0][0];
                    var nrook_tile = game_state.board_state[0][3];
                    
                    rook_tile.piece = "Empty";
                    rook_tile.owner = "None";
                    
                    nrook_tile.piece = "Rook";
                    nrook_tile.owner = "White";
                }
                else if(tile.y === 0 && tile.x === 6 && game_state.white_castle_r)
                {
                    console.log("Moving right white rook");
                    var rook_tile = game_state.board_state[0][7];
                    var nrook_tile = game_state.board_state[0][5];
                    
                    rook_tile.piece = "Empty";
                    rook_tile.owner = "None";
                    
                    nrook_tile.piece = "Rook";
                    nrook_tile.owner = "White";
                }
            }
            
            else if(orgin_tile.owner === "Black" && selected.piece === "King" && selected.y === 7 && selected.x === 4)
            {
                game_state.white_castle_l = false;
                game_state.white_castle_r = false;
                    
                console.log("Black Castle check");
                console.log("tile.y "+tile.y);
                console.log("tile.x "+tile.x);
                console.log("game_state.black_castle_l "+game_state.black_castle_l);
                console.log("game_state.black_castle_r "+game_state.black_castle_r);
                if(tile.y === 7 && tile.x === 2 && game_state.black_castle_l)
                {
                    console.log("Moving left black rook");
                    var rook_tile = game_state.board_state[7][0];
                    var nrook_tile = game_state.board_state[7][3];
                    
                    rook_tile.piece = "Empty";
                    rook_tile.owner = "None";
                    
                    nrook_tile.piece = "Rook";
                    nrook_tile.owner = "Black";
                }
                else if(tile.y === 7 && tile.x === 6 && game_state.black_castle_r)
                {
                    console.log("Moving right black rook");
                    var rook_tile = game_state.board_state[7][7];
                    var nrook_tile = game_state.board_state[7][5];
                    
                    rook_tile.piece = "Empty";
                    rook_tile.owner = "None";
                    
                    nrook_tile.piece = "Rook";
                    nrook_tile.owner = "Black";
                }
            }
            else if(orgin_tile.owner === "Black" && selected.piece === "Rook" && selected.y === 0 && selected.x === 7)
            {
                console.log("Moving Rook!");
                    game_state.black_castle_l = false;
            }
            else if(orgin_tile.owner === "Black" && selected.piece === "Rook" && selected.y === 7 && selected.x === 7)
            {
                console.log("Moving Rook!");
                    game_state.black_castle_r = false;
            }
            else if(orgin_tile.owner === "White" && selected.piece === "Rook" && selected.y === 7 && selected.x === 0)
            {
                console.log("Moving Rook!");
                    game_state.white_castle_l = false;
            }
            else if(orgin_tile.owner === "White" && selected.piece === "Rook" && selected.y === 0 && selected.x === 0)
            {
                console.log("Moving Rook!");
                    game_state.white_castle_r = false;
            }
    }
    return game_state;
}

var move_piece = function(game_state,nx,ny){
        var selected = game_state.selected;
        var orgin_tile = game_state.board_state[selected.y][selected.x];
        var tile = game_state.board_state[nx][ny];
        if(tile.moveable)
        {
            //Add a special case for castling
            game_state = castle_check(game_state,nx,ny);
            game_state = pawn_check(game_state,nx,ny);
            //Move piece
            tile.piece = selected.piece;
            tile.owner = orgin_tile.owner;
            
            orgin_tile.owner = "None";
            orgin_tile.piece = "Empty";
        }
        else if(tile.attack_able){
            
            game_state = passant_check(game_state,nx,ny);
            
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
    var tile = game_state.board_state[nx][ny];
    if(!tile.moveable && !tile.attack_able) return game_state;
    var copy_board = JSON.parse(JSON.stringify(game_state));
    //clear the threat
    copy_board.board_state = clear_board_threat(copy_board.board_state);
    //find if the king is under threat after the move
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
        game_state.board_state = calc_threat(game_state.board_state);
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
    clear_board_passant(game_state.is_white,game_state.board_state,game_state.selected);
    game_state.is_white = !game_state.is_white;
    if(game_state.is_white)
        game_state.turn_num++;
    return game_state;
} 

/**
 * Calculates the threatened and supported tiles
 */
var calc_threat_move = function(board_state,dx,dy,x,y,tile,repeat){
    if(x+dx >= 0 && x + dx < 8 && y + dy >= 0 && y + dy < 8)
    {
        var n_tile = board_state[y+dy][x+dx];
        
        if(tile.owner === "White"){
            n_tile.threat_white++;
        }
        else{
            n_tile.threat_black++;
        }
        if(n_tile.owner === "None"){
            if(repeat > 1)
            {
                calc_threat_move(board_state,dx,dy,x+dx,y+dy,tile,repeat-1);
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