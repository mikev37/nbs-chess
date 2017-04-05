#!/bin/bash
# Ask the user for their name
echo Hello, who am I talking to?
while $true
do
echo ----------------------
echo xvariable
read x
echo yvariable
read y
curl -X PUT --data "game_id=58c07bb6cdf90a0fc3d7d70d&&x=$x&&y=$y&&user_id=58c07b4fcdf90a0fc3d7d70c" http://nbs-chess-mikev37.c9users.io:8081/game/play
echo ----------------------
curl -X GET --data "game_id=58c07bb6cdf90a0fc3d7d70d&&user_id=58c07b4fcdf90a0fc3d7d70c" http://nbs-chess-mikev37.c9users.io:8081/game/debug
done
