class ParticleManager_TwoD
{
    constructor( scene ,numberOfParticles, imgSrcs)
    {
        this.particleArray = new Array(numberOfParticles);
        this.materialArray = new Array(imgSrcs.length);

        var currImgSrcID = 0;

        for(var i = 0; i < this.materialArray.length; i++)
        {
            var spriteMap = new THREE.TextureLoader().load( imgSrcs[i] );
            this.materialArray[i] = new THREE.SpriteMaterial( { map:spriteMap, color:0xffffff } );
        }

        for(var i = 0; i < this.particleArray.length; i++)
        {
            this.particleArray[i] = new Particle(this.materialArray[currImgSrcID], (Math.random() * 0.03) + 0.04, (Math.random() * 2) - 1, 20, -5);
            
            // Increment and validate current material to give to particle
            currImgSrcID++;
            if(currImgSrcID >= this.materialArray.length) { currImgSrcID = 0; }

            scene.add( this.particleArray[i].object );
        }
    }

    Update(baseZPos)
    {
        for(var i = 0; i < this.particleArray.length; i++)
        {
            this.particleArray[i].SetPosition_Z(baseZPos);
            this.particleArray[i].Update();
        }
    }
}