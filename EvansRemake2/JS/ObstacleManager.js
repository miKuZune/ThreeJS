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
        var sideSignPoolNumber = 17;

        this.ObstacleArray = new Array(poolNumber);

        for(var i = 0; i < poolNumber; i++)
        {
            this.ObstacleArray[i] = new Obstacle(scene, player, this, this.gameManager);
        }

        // Sideline signs
        this.sideSignsArray = new Array(sideSignPoolNumber);
        for(var i = 0; i < sideSignPoolNumber; i++)
        {
            this.sideSignsArray[i] = new SideSign(scene,player, this, this.gameManager);
        }


        // set object variables
        this.currentID = 0;
        this.recentZ = 0;
        this.obstaclesPassed = -1;

        this.obstaclesToPassToReiterate = 10;
        this.objectsIterated = 0;

        // Set side object variables
        this.currentSideObjectID = 0;
        this.sideObjectsIterated = 0;
        this.sideObjects_RecentZ = 0;

        this.sideObjectsPassed = 0;

        this.sideObjectPositionX_Base = 7;

        this.distanceBetweenSideObjects = 40;

        this.sideObjectsImageSources = 
        [
            'Images/EvansLogo_Sign',
            'Images/BromptonLogo_Sign',
            'Images/Christmas_Sign'
        ];
        this.sideObjectImgSrcCurrID = 0;


        var distMath = new DistanceMaths();
        this.maxSideObjects = Math.floor( distMath.ConvertMilesToMetre( gameManager.distanceToTravel ) / this.distanceBetweenSideObjects);

        // Perform neccessary methods
        this.PositionObjects(poolNumber);
        this.PositionSideObjects(sideSignPoolNumber);

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
            { this.currentID = 0; }

            this.objectsIterated++;
        }
    }

    PositionSideObjects(numberOfObjects)
    {
        for(var i = 0; i < numberOfObjects; i++)
        {
            if(this.sideObjectsIterated >= this.maxSideObjects)
            { return; }

            this.sideObjects_RecentZ = this.sideObjects_RecentZ + this.distanceBetweenSideObjects;
            this.sideSignsArray[this.currentSideObjectID].SetZ_Position(this.sideObjects_RecentZ);
            this.sideSignsArray[this.currentSideObjectID].passedPlayer = false;

            if(this.sideObjectsIterated % 2 == 0)
            {
                this.sideSignsArray[this.currentSideObjectID].SetImgSprite(this.sideObjectsImageSources[this.sideObjectImgSrcCurrID] + '_Right.png');
                this.sideObjectImgSrcCurrID++;

                if(this.sideObjectImgSrcCurrID >= this.sideObjectsImageSources.length)
                { this.sideObjectImgSrcCurrID = 0; }

                this.sideSignsArray[this.currentSideObjectID].SetX_Position(this.sideObjectPositionX_Base);
            }else
            {
                this.sideSignsArray[this.currentSideObjectID].SetImgSprite(this.sideObjectsImageSources[this.sideObjectImgSrcCurrID] + '_Left.png');
                this.sideObjectImgSrcCurrID++;

                if(this.sideObjectImgSrcCurrID >= this.sideObjectsImageSources.length)
                { this.sideObjectImgSrcCurrID = 0; }

                this.sideSignsArray[this.currentSideObjectID].SetX_Position(-this.sideObjectPositionX_Base);
            }
            
            this.currentSideObjectID++;

            if(this.currentSideObjectID >= this.sideSignsArray.length)
            { this.currentSideObjectID = 0; }

            this.sideObjectsIterated++;
        }
    }

    UpdateObstacles()
    {
        for(var i = 0; i < this.ObstacleArray.length; i++)
        {
            this.ObstacleArray[i].Update();
        }
    }

    UpdateSideObjects()
    {
        for(var i = 0; i < this.sideSignsArray.length; i++)
        {
            this.sideSignsArray[i].Update();
        }
    }

    Update()
    {
        this.UpdateObstacles();
        this.UpdateSideObjects();
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

    PassedSideObject()
    {
        this.sideObjectsPassed++;

        if(this.sideObjectsPassed % this.obstaclesToPassToReiterate == 0 && this.sideObjectsPassed > 0)
        {
            this.PositionSideObjects(this.obstaclesToPassToReiterate);
        }
    }

}