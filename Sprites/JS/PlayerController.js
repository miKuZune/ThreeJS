class PlayerController
{
    scene

    constructor(scene)
    {
        var image = 'Images/Pacman.png';
        var spriteMap = new THREE.TextureLoader().load( image );
        var spriteMaterial = new THREE.SpriteMaterial( {map: spriteMap, color: 0xffffff} );

        var sprite = new THREE.Sprite( spriteMaterial );
        sprite.scale.y = 0.75;
        sprite.scale
        scene.add ( sprite );
    }

    Update()
    {
        
    }

    MoveLeft()
    {

    }

    MoveRight()
    {

    }
}