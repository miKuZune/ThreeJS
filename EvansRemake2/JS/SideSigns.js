class SideSign
{
    constructor(scene, player, obstacleManager, gameManager)
    {
        this.scene = scene;
        this.player = player;
        this.parentManager = obstacleManager;
        this.gameManager = gameManager;

        this.passedPlayer = false;        

        this.object = new THREE.Sprite( null );
        this.SetImgSprite("Images/EvansLogo_Sign_Right.png");

        this.object.position.x = 7;
        this.object.position.y = -3;

        this.object.scale.x = 4;
        this.object.scale.y = this.object.scale.x * 0.418;

        scene.add( this.object );
    }

    Update()
    {
        if(this.passedPlayer){ return; }

        if(this.player.position.z < this.object.position.z)
        {
            this.parentManager.PassedSideObject();

            this.passedPlayer = true;
        }
    }

    SetZ_Position(newPos)
    {
        this.object.position.z = -newPos;
    }

    SetX_Position(newPos)
    {
        this.object.position.x = newPos;
    }

    SetImgSprite(newSrc)
    {
        this.imgsrc = newSrc;

        var spriteMap = new THREE.TextureLoader().load( this.imgsrc );
        var spriteMaterial = new THREE.SpriteMaterial( { map:spriteMap, color: 0xffffff } );
        this.object.material = spriteMaterial;
    }
}