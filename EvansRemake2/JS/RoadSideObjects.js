class RoadSideObjects
{
    constructor(scene, player, obstacleManager, gameManager)
    {
        this.scene = scene;
        this.player = player;
        this.parentManager = obstacleManager;
        this.gameManager = gameManager;

        // Choose image
        var imgSrc = 'Images/PathBlobs.png';

        var spriteMap = new THREE.TextureLoader().load( imgSrc );

        var geometry = new THREE.PlaneGeometry( 1,1 );        
        var cubeMaterial = [
            new THREE.MeshBasicMaterial({
                map: spriteMap, //front
                transparent:true
            }),
            new THREE.MeshBasicMaterial({
                map: spriteMap, //back?
                transparent:true
            })
        ];

        this.object1 = new THREE.Mesh( geometry, cubeMaterial );

        this.object1.position.y = -3.9;
        this.object1.position.x = 5;

        this.object1.scale.x = 10;
        this.object1.scale.y = this.object1.scale.x * 1.015;

        this.object1.rotation.x = -1.57;
        
        this.object2 = new THREE.Mesh( geometry, cubeMaterial );

        this.object2.position.y = -3.9;
        this.object2.position.x = -5;

        this.object2.scale.x = 10;
        this.object2.scale.y = this.object2.scale.x * 1.015;

        this.object2.rotation.x = -1.57;
        this.object2.rotation.z = -3.14;

        this.passedPlayer = false;

        this.scene.add( this.object1 );
        this.scene.add( this.object2 );
    }

    Update()
    {
        this.CheckIfPassedPlayer();
    }

    CheckIfPassedPlayer()
    {
        if(this.player.position.z < this.object1.position.z && !this.passedPlayer)
        {
            this.passedPlayer = true;
            this.parentManager.PassedRoadSideObject();
        }
    }

    SetZ_Position(newValue)
    {
        this.object1.position.z = -newValue;
        this.object2.position.z = -newValue;
    }
}