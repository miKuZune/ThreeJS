class Obstacle
{
    xPositions =
	{
		MIDDLE: 0,
		LEFT: -1.5,
		RIGHT: 1.5
	}

    currentLane = null
    
    startSpeed = 1;

    gameobject = null

    hasPassedPlayer = false

	constructor(meshObj)
	{
        this.currentLane = new Lane();
        
        this.gameobject = meshObj;

        this.GetRandomLane();
    }
    
    update(playerLane, playerPos_Z)
    {
        if(!this.hasPassedPlayer)
        {

            this.CheckforPlayerPass(playerLane, playerPos_Z);
        }
    }

    SetZ(newZ)
    {
        this.gameobject.position.z = newZ;
    }

    CheckforPlayerPass(playerLane, playerPos_Z)
	{
        // if the player has not passed the object
        if(playerPos_Z > this.gameobject.position.z) {return;}

        if(playerLane.currentPosition == this.currentLane.currentPosition)
        {
            console.log("You Lose!");
            OnGameOver();
            
            this.hasPassedPlayer = true;
        }else
        {
            this.hasPassedPlayer = true;
            OnPassedObject();
        }
    }
    
     GetRandomLane()
     {
         var randValue = Math.round(Math.random(Date.now) * 2);
         switch(randValue)
         {
             case 0:
                this.currentLane.currentPosition = this.currentLane.positions.LEFT;
                this.gameobject.position.x = this.xPositions.LEFT;
             break;
                
             case 1:
                this.currentLane.currentPosition = this.currentLane.positions.MIDDLE;
                this.gameobject.position.x = this.xPositions.MIDDLE;
             break;

             case 2:
                this.currentLane.currentPosition = this.currentLane.positions.RIGHT;
                this.gameobject.position.x = this.xPositions.RIGHT;
             break;
         }
     }
}