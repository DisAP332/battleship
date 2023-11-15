#Battleship

This is game I made to show off / practice my skills at functional programming.

The game has a AI that will play against you. The AI is not very smart, but it is smart enough to beat you if you are not careful.

The AI works in 3 stages.

The AI will first shoot randomly until it lands a hit.

Then it will determine the positioning of the ship in Stage2. Here it will shoot in a cross pattern around the hit until a second hit is found. This will determin the orientation of the ship.

Then it will shoot in the direction of the ship until it sinks the ship. It will also keep track of what ships
it has sunk and will take that into account in its strategy.
