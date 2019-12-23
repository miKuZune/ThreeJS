class ObstacleManager
{
    //ObstacleArray

    //currentID
    //recentZ

    //distanceBetweenObstacles

    //obstaclesPassed

    //obstaclesToPassToReiterate

    constructor(distanceBetweenObstacles , scene, player )
    {
        this.scene = scene;
        this.distanceBetweenObstacles = distanceBetweenObstacles;

        var poolNumber = 25;

        this.ObstacleArray = new Array(poolNumber);

        for(var i = 0; i < poolNumber; i++)
        {
            this.ObstacleArray[i] = new Obstacle(scene, player, this);
        }

        // set
        this.currentID = 0;
        this.recentZ = 0;
        this.obstaclesPassed = -1;

        this.obstaclesToPassToReiterate = 10;

        this.PositionObjects(poolNumber);

        
    }

    PositionObjects(numberOfObjects)
    {
        for(var i = 0; i < numberOfObjects; i++)
        {
            this.recentZ = this.recentZ + this.distanceBetweenObstacles;
            this.ObstacleArray[this.currentID].SetZ_Position(this.recentZ);
            this.ObstacleArray[this.currentID].passedPlayer = false;

            this.currentID++; 
            if(this.currentID >= this.ObstacleArray.length)
            {
                this.currentID = 0;
            }
        }
    }

    UpdateObstacles()
    {
        for(var i = 0; i < this.ObstacleArray.length; i++)
        {
            this.ObstacleArray[i].Update();
        }
    }

    Update()
    {
        this.UpdateObstacles();
    }

    PassedObstacle()
    {
        this.obstaclesPassed++;

        if(this.obstaclesPassed % this.obstaclesToPassToReiterate == 0 && this.obstaclesPassed > 0)
        {
            this.PositionObjects(this.obstaclesToPassToReiterate);
        }
    }

}