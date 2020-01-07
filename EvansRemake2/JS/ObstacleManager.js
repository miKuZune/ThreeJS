class ObstacleManager
{
    //ObstacleArray

    //currentID
    //recentZ

    //distanceBetweenObstacles

    //obstaclesPassed

    //obstaclesToPassToReiterate

    constructor(distanceBetweenObstacles , scene, player, gameManager, maxObjects )
    {
        this.scene = scene;
        this.distanceBetweenObstacles = distanceBetweenObstacles;
        this.gameManager = gameManager;
        this.maxObjects = maxObjects;

        var poolNumber = 25;

        this.ObstacleArray = new Array(poolNumber);

        for(var i = 0; i < poolNumber; i++)
        {
            this.ObstacleArray[i] = new Obstacle(scene, player, this, this.gameManager);
        }

        // set
        this.currentID = 0;
        this.recentZ = 0;
        this.obstaclesPassed = -1;

        this.obstaclesToPassToReiterate = 10;
        this.objectsIterated = 0;

        this.PositionObjects(poolNumber);

        this.goalManager = new GoalManager();
    }

    PositionObjects(numberOfObjects)
    {

        for(var i = 0; i < numberOfObjects; i++)
        {
            if(this.objectsIterated >= this.maxObjects)
            {
                this.goalManager.CreateGoal( this.recentZ + (this.distanceBetweenObstacles * 2) ,this.scene)
                return;
            }
            
            this.recentZ = this.recentZ + this.distanceBetweenObstacles;
            this.ObstacleArray[this.currentID].SetZ_Position(this.recentZ);
            this.ObstacleArray[this.currentID].passedPlayer = false;
            this.ObstacleArray[this.currentID].ChooseLane();
            this.ObstacleArray[this.currentID].ChooseNewImage();

            this.currentID++; 
            if(this.currentID >= this.ObstacleArray.length)
            {
                this.currentID = 0;
            }

            this.objectsIterated++;
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
        this.goalManager.Update();
    }

    PassedObstacle()
    {
        this.obstaclesPassed++;

        if(this.obstaclesPassed % this.obstaclesToPassToReiterate == 0 && this.obstaclesPassed > 0)
        {
            this.PositionObjects(this.obstaclesToPassToReiterate);
        }

        if(this.obstaclesPassed >= this.maxObjects - 10)
        {
            this.goalManager.animateHouse = true;
        }
    }

}