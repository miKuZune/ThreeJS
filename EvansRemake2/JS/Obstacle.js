class Obstacle
{
    imgsrc

    object

    passedPlayer

    scene
    player

    parentManager

    constructor(scene,player, obstacleManager)
    {
        this.scene = scene;
        this.player = player;
        this.parentManager = obstacleManager;
        this.imgsrc = "Images/Tree1.png";

        // Initalize in scene game object
        var spriteMap = new THREE.TextureLoader().load( this.imgsrc );
        var spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
        this.object = new THREE.Sprite( spriteMaterial );

        this.object.position.y = -2;

        this.object.scale.x = 1.5;
        this.object.scale.y = this.object.scale.x * 1.617;

        scene.add( this.object );

        this.passedPlayer = false;
    }

    SetZ_Position(newValue)
    {
        this.object.position.z = -newValue;
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
        }
    }


}