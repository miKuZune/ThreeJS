class PlayerController
{
    // Dynamic variables  
    currentLane

    sprite

    speed

    targetPos_X

    // Constant variables

    lanesXPos
    animator

    constructor(scene, newSpeed)
    {
        this.speed = newSpeed;

        var image = 'Images/Ride_Static.png';
        var spriteMap = new THREE.TextureLoader().load( image );
        var spriteMaterial = new THREE.SpriteMaterial( {map: spriteMap, color: 0xffffff} );

        this.sprite = new THREE.Sprite( spriteMaterial );
        this.sprite.scale.y = 1.689;
        scene.add ( this.sprite );

        this.sprite.position.y = -2;

        this.currentLane = "middle";

        this.targetPos_X = 0;

        // Set Constant variables

        this.lanesXPos = 2;

        var ImageLocations = [
            'Images/Ride_Static.png',
            'Images/Ride_PedalLeft.png',
            'Images/Ride_Static.png',
            'Images/Ride_PedalRight.png'
        ];
        this.animator = new TwoD_Animator(ImageLocations, spriteMaterial, 10);

    }

    Update()
    {
        // Move forward
        this.sprite.position.z -= this.speed / 60;

        // Move towards target xPos
        //this.MoveNumTowards(this.sprite.position.x, this.targetPos_X, 2/60);
        
        this.sprite.position.x = this.MoveNumTowards(this.sprite.position.x,this.targetPos_X, 20 / 60);

        this.animator.Update();
    }

    MoveLeft()
    {
        this.Move(-this.lanesXPos);
    }

    MoveRight()
    {
        this.Move(this.lanesXPos);
    }

    Move(direction)
    {
        switch(this.currentLane)
        {
            case "middle":
                //this.sprite.position.x += direction;
                this.targetPos_X += direction;

                if(direction > 0)
                {
                    this.currentLane = "right";
                }else if(direction < 0)
                {
                    this.currentLane = "left";
                }
            break;

            case "left":
                if(direction > 1)
                {
                    this.targetPos_X += direction;
                    //this.sprite.position.x += direction;
                    this.currentLane = "middle";
                }
            break;

            case "right":
                if(direction < 1)
                {
                    this.targetPos_X += direction;
                    //this.sprite.position.x += direction;
                    this.currentLane = "middle";
                }
            break;
        }
    }

    MoveNumTowards(value, targetValue, speed)
    {
        var delta = targetValue - value;

        var magnitude = Math.sqrt(delta * delta);

        if(magnitude <= speed || magnitude == 0)
        {
            return targetValue;
        }

        var returnValue = value + delta / magnitude * speed;
        return returnValue;
    }
}