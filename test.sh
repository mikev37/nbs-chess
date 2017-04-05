#!/bin/bash
# Ask the user for their name
echo Hello, who am I talking to?
GAME=58e53562e6373411c4fa4ba9
while $true
do
echo ----------------------
curl -X GET --data "game_id=$GAME&&user_id=58c07b4fcdf90a0fc3d7d70c" http://nbs-chess-mikev37.c9users.io:8081/game/debug
echo ----------------------
echo xvariable
read x
echo yvariable
read y
curl -X PUT --data "game_id=$GAME&&x=$x&&y=$y&&user_id=58c07b4fcdf90a0fc3d7d70c" http://nbs-chess-mikev37.c9users.io:8081/game/play
done
