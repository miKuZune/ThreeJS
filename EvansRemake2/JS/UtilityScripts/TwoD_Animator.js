class TwoD_Animator
{

    //frameLocations
    //currentFrameID
    //spriteMaterialToAnimate

    //framesBetweenImage

    //framecounter

    constructor(frameLocations, spriteObject, framesBetweenImage )
    {
        this.frameLocations = frameLocations;
        this.spriteMaterialToAnimate = spriteObject;
        this.framesBetweenImage = framesBetweenImage;

        this.currentFrameID = 0;
        this.framecounter = 0; 
    }

    NextFrame()
    {
        
        if(this.currentFrameID >= this.frameLocations.length)
        {
            this.currentFrameID = 0;
        }

        var spriteMap = new THREE.TextureLoader().load( this.frameLocations[this.currentFrameID] );
        this.spriteMaterialToAnimate.map = spriteMap;
        this.currentFrameID++;
    }

    Update()
    {
        this.framecounter++;

        if(this.framecounter % this.framesBetweenImage == 0)
        {
            this.NextFrame();
        }
    }
}