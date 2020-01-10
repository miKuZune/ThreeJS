class Obstacle
{
    //imgsrc

    //object

    //passedPlayer

    //scene
    //player

   // parentManager

    constructor(scene,player, obstacleManager, gameManager)
    {
        this.scene = scene;
        this.player = player;
        this.parentManager = obstacleManager;
        this.gameManager = gameManager;

        this.lane = "middle";
        this.laneTwo = "middle";

        this.usingBothObjects = false;

        // Initalize in scene game object
        this.object = new THREE.Sprite( null );

        this.object.position.y = -1.9;

        this.object.scale.x = 2.5;
        this.object.scale.y = this.object.scale.x * 1.617;

        scene.add(this.object);

        // Initalize the second in scene game object
        this.secondObject = new THREE.Sprite( null );
        

        this.secondObject.position.y = -1.9;

        this.secondObject.scale.x = 2.5;
        this.secondObject.scale.y = this.secondObject.scale.x * 1.617;

        scene.add( this.secondObject );

        this.passedPlayer = false;

        this.ChooseLane();
        this.ChooseNewImage();
    }

    ChooseLane()
    {
        var value = Math.random() * 3;
        value = Math.floor(value);

        // Decide if it is one trees or two trees
        var randomValue = Math.random() * 100;
        if(randomValue >= 50)
        {   
            //  Multiple trees
            this.usingBothObjects = true;
            switch(value)
            {
                //  left & right
                case 0:
                    this.lane = "left";
                    this.laneTwo = "right";

                    this.SetX_Position(-2);
                    this.SetX_Position_SecondGameobject(2);
                break;
                //  middle & left
                case 1:
                    this.lane = "middle";
                    this.laneTwo = "right";

                    this.SetX_Position(0);
                    this.SetX_Position_SecondGameobject(2);
                break;
                // middle & right
                case 2:
                    this.lane = "middle";
                    this.laneTwo = "left";

                    this.SetX_Position(0);
                    this.SetX_Position_SecondGameobject(-2);
                break;
                // Left & right
                default:
                    this.lane = "left";
                    this.laneTwo = "right";

                    this.SetX_Position(-2);
                    this.SetX_Position_SecondGameobject(2);
                break;
            }
        }else
        {
            //  Singular lonely tree :(

            this.usingBothObjects = false;
            this.SetX_Position_SecondGameobject(-1000);
            switch(value)
            {
                case 0:
                    this.lane = "left";
                    this.SetX_Position(-2);
                    break;
                case 1:
                    this.lane = "middle";
                    this.SetX_Position(0);
                    break;
                case 2:
                    this.lane = "right";
                    this.SetX_Position(2);
                    break;
                default:
                    this.lane = "middle";
                    this.SetX_Position(0);
                    break;
            }
        }


        
    }

    ChooseNewImage()
    {
        var possibleImgSrcs = [
            'Images/Tree1.png',
            'Images/Tree2.png',
            'Images/Trunk.png'
        ];

        var imgSrcID = Math.floor( Math.random() * 3 );

        this.imgsrc = possibleImgSrcs[imgSrcID];

        var spriteMap = new THREE.TextureLoader().load( this.imgsrc );
        var spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
        
        this.object.material = spriteMaterial;

        //  second obj
        imgSrcID = Math.floor( Math.random() * 3 );

        this.imgsrc = possibleImgSrcs[imgSrcID];
        var spriteMap = new THREE.TextureLoader().load( this.imgsrc);
        var spriteMaterial = new THREE.SpriteMaterial( { map:spriteMap, color: 0xffffff } );

        this.secondObject.material = spriteMaterial;
    }

    SetZ_Position(newValue)
    {
        this.object.position.z = -newValue;
        this.secondObject.position.z = -newValue;
    }

    SetX_Position(newValue)
    {
        this.object.position.x = newValue;
    }

    SetX_Position_SecondGameobject(newValue)
    {
        this.secondObject.position.x = newValue;
    }

    Update()
    {
        this.CheckIfPassedPlayer();
    }

    CheckIfPassedPlayer()
    {
        if(this.player.position.z < this.object.position.z && !this.passedPlayer)
        {
            this.passedPlayer = true;
            this.parentManager.PassedObstacle();

            if(this.usingBothObjects)
            {
                if(this.lane == this.gameManager.GetPlayerLane() || this.laneTwo == this.gameManager.GetPlayerLane())
                {
                    this.gameManager.GameOver();
                }
            }else
            {
                if(this.lane == this.gameManager.GetPlayerLane())
                {
                    this.gameManager.GameOver();
                }
            }
            
        }
    }
}