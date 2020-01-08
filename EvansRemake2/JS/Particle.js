class Particle
{
    constructor(material, speed, direction, xBoundary, yBoundary)
    {
        this.object = new THREE.Sprite( material );

        this.object.scale.x = 0.25;
        this.object.scale.y = this.object.scale.x * 1;

        this.speed = speed;
        this.direction = direction;

        this.xBoundary = xBoundary;
        this.yBoundary = yBoundary;

        this.object.position.x = Math.random() * this.xBoundary - (this.xBoundary / 2);
        this.object.position.y = Math.random() * 10;
    }

    Update()
    {
        if(!this.PositionIsValid())
        {
            this.ResetPosition();
        }

        this.object.position.y -= this.speed;

        this.object.position.x += this.speed * this.direction;
    }

    PositionIsValid()
    {
        if(this.object.position.x > this.xBoundary || this.object.position.x < -this.xBoundary)
        { return false; }

        if(this.object.position.y < this.yBoundary)
        { return false; }

        return true;
    }

    ResetPosition()
    {
        this.object.position.y = 4;
        this.object.position.x = Math.random() * this.xBoundary - (this.xBoundary / 2);

    }

    SetPosition_X(newValue)
    {
        this.object.position.x = newValue;
    }

    SetPosition_Y(newValue)
    {
        this.object.position.y = newValue;
    }

    SetPosition_Z(newValue)
    {
        this.object.position.z = newValue;
    }
}