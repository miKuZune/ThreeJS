class TwoD_Animator
{

    //frameLocations
    //currentFrameID
    //spriteMaterialToAnimate

    //framesBetweenImage

    //framecounter

    constructor(frameLocations, sprite, framesBetweenImage)
    {
        this.frameLocations = frameLocations;
        this.spriteMaterialToAnimate = sprite;
        this.framesBetweenImage = framesBetweenImage;

        for(var i = 0; i < this.frameLocations.length; i++)
        {
            console.log(this.frameLocations[i]);
        }

        this.currentFrameID = 0;
        this.framecounter = 0;
    }

    NextFrame()
    {
        this.currentFrameID++;
        if(this.currentFrameID >= this.frameLocations.length)
        {
            this.currentFrameID = 0;
        }

        var spriteMap = new THREE.TextureLoader().load( this.frameLocations[this.currentFrameID] );
        this.spriteMaterialToAnimate.map = spriteMap;
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