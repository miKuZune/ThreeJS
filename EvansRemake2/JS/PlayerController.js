class PlayerController
{
    // Dynamic variables  
    //currentLane;

    //sprite;

    //speed;

    //targetPos_X;

    // Constant variables

    //lanesXPos;
    //animator;

    constructor(scene, newSpeed, gameManager)
    {
        this.speed = newSpeed;
        this.gameManager = gameManager;

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

        this.distanceTraveledUI = document.getElementById("distTraveled");
        this.distanceTraveled_Prefix = "Distance Travled: ";

        this.distMath = new DistanceMaths();

        this.distTraveled = 0;

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
        var distToTravel = this.speed / 60;
        this.sprite.position.z -= distToTravel;
        this.distTraveled += distToTravel;

        // Update UI
        var milesTraveled = this.distMath.ConvertMetreToMiles(this.distTraveled);
        this.distanceTraveledUI.innerHTML = this.distanceTraveled_Prefix + (Math.round(milesTraveled * 100) / 100);
        
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
                    this.SetLane("right");
                }else if(direction < 0)
                {
                    this.SetLane("left");
                }
            break;

            case "left":
                if(direction > 1)
                {
                    this.targetPos_X += direction;
                    //this.sprite.position.x += direction;
                    this.SetLane("middle");
                }
            break;

            case "right":
                if(direction < 1)
                {
                    this.targetPos_X += direction;
                    //this.sprite.position.x += direction;
                    this.SetLane("middle");
                }
            break;
        }
    }

    SetLane(newLane)
    {
        this.currentLane = newLane;
        this.gameManager.SetPlayerLane(newLane);
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