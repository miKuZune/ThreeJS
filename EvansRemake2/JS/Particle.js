class Particle
{
    constructor(material, speed, direction, xBoundary, yBoundary)
    {
        this.object = new THREE.Sprite( material );

        this.object.scale.x = Math.random() * 0.75;
        this.object.scale.y = this.object.scale.x * 1;

        this.speed = speed;
        this.direction = 0;

        this.xBoundary = xBoundary;
        this.yBoundary = yBoundary;

        this.object.position.x = Math.random() * this.xBoundary - (this.xBoundary / 2);
        this.object.position.y = Math.random() * 10;

        this.counterMax = 1;
        this.counter = Math.floor( Math.random() * this.counterMax );
    }

    Update()
    {
        if(!this.PositionIsValid())
        {
            this.ResetPosition();
        }
        this.object.position.y -= this.speed;

        this.object.position.x += this.speed * this.direction;

        this.object.scale.x -= 0.003;
        this.object.scale.y -= 0.003;

        if(this.object.scale.x < 0 || this.object.scale.y < 0)
        {
            this.ResetPosition();
        }
        
        if(this.counter % this.counterMax == 0)
        {
            this.ChangeDirection();
        }

        this.counter++;
    }

    PositionIsValid()
    {
        if(this.object.position.x > this.xBoundary || this.object.position.x < -this.xBoundary)
        { return false; }

        if(this.object.position.y < this.yBoundary)
        { return false; }

        return true;
    }

    ChangeDirection()
    {
        this.direction = this.RandomAroundPoint(this.direction, 0.05, 1, -1);
    }

    ResetPosition()
    {
        this.object.position.y = 12;
        this.object.position.x = Math.random() * this.xBoundary - (this.xBoundary / 2);

        this.object.scale.x = 0.75;
        this.object.scale.y = this.object.scale.x * 1;
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

    RandomAroundPoint(current, randomizationAmount , maxValue, minValue)
    {
        var total = maxValue - minValue;
        var portionOfValue = total * randomizationAmount;
        
        var randomValue = Math.random() * portionOfValue - (portionOfValue / 2);
        var value = current + randomValue;

        if(value > maxValue){value = maxValue;}
        else if(value < minValue){value = minValue;}

        return value;
    }
}