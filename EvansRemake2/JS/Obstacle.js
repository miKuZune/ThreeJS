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


        // Initalize in scene game object
        this.object = new THREE.Sprite( null );
        this.ChooseNewImage();

        this.object.position.y = -2;

        this.object.scale.x = 1.5;
        this.object.scale.y = this.object.scale.x * 1.617;

        scene.add( this.object );

        this.passedPlayer = false;

        this.ChooseLane();
    }

    ChooseLane()
    {
        var value = Math.random() * 3;
        value = Math.floor(value);

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
    }

    SetZ_Position(newValue)
    {
        this.object.position.z = -newValue;
    }

    SetX_Position(newValue)
    {
        this.object.position.x = newValue;
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

            if(this.lane == this.gameManager.GetPlayerLane())
            {
                this.gameManager.GameOver();
            }
        }
    }


}