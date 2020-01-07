class GoalManager
{
    constructor()
    {
        this.hasCreatedGoal = false;

        this.imgSrc = "Images/House_1.png";

        // Create the goal object.
        var spriteMap = new THREE.TextureLoader().load( this.imgSrc );
        var spriteMaterial = new THREE.SpriteMaterial ( { map:spriteMap, color: 0xffffff } );
        this.object = new THREE.Sprite( spriteMaterial );

        this.animationFrameLocations = [
            'Images/House_Light.png',
            'Images/House_Light_Red.png',
            'Images/House_Light.png',
            'Images/House_Light_Green.png',
            'Images/House_Light.png',
            'Images/House_Light_Yellow.png',
        ];
        this.goalAnimator = new TwoD_Animator(this.animationFrameLocations, spriteMaterial, 30);

        this.animateHouse = false;
    }

    Update()
    {
        if(this.animateHouse)
        {
            this.goalAnimator.Update();
        }
    }

    CreateGoal(positionToCreate, sceneToAddTo)
    {
        if(this.hasCreatedGoal){return;}
        
        //  Position and scale object before adding it to the scene.
        this.object.position.z = -positionToCreate;
        this.object.position.y = 1.5;

        this.object.scale.x = 15;
        this.object.scale.y = 0.83 * this.object.scale.x;

        sceneToAddTo.add( this.object );

        //  Ensure that the goal is not created multiple times.
        this.hasCreatedGoal = true;
    }
}