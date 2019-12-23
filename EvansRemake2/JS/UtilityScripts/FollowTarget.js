class FollowTarget
{
    //object;
    //targetObject;
    //offset;

    //followSpeed;

    constructor(object, targetObject, offset)
    {
        this.object = object;
        this.targetObject = targetObject;
        this.offset = offset;

        //console.log( object);
        //console.log( targetObject);
        //console.log( offset);
        //console.log(this.offset);
    }

    Update()
    {
        var targetPosition = new THREE.Vector3(0,0,0);
        targetPosition.x = this.targetObject.position.x + this.offset.x;
        targetPosition.y = this.targetObject.position.y + this.offset.y;
        targetPosition.z = this.targetObject.position.z + this.offset.z;
        
        var NewPos = this.MoveTowards(this.object.position, targetPosition, this.followSpeed / 60);
        

        
        this.object.position.x = NewPos.x;
        this.object.position.y = NewPos.y;
        this.object.position.z = NewPos.z;
    }

    SetNewOffset(newOffset)
    {
        this.offset = newOffset;
    }

    SetFollowSpeed(speed)
    {
        this.followSpeed = speed;
    }

    MoveTowards(currentPos, targetPos, speed)
    {
        
        //console.log(currentPos + " " + targetPos);
        var direction = new THREE.Vector3(0,0,0);
        direction.x = targetPos.x - currentPos.x;
        direction.y = targetPos.y - currentPos.y;
        direction.z = targetPos.z - currentPos.z;

        var magnitude = this.GetMagnitude(direction);

        if(magnitude <= speed  || magnitude == 0)
        {
            return targetPos;
        }


        direction.x = currentPos.x + direction.x / magnitude * speed ;
        direction.y = currentPos.y + direction.y / magnitude * speed ;
        direction.z = currentPos.z + direction.z / magnitude * speed ;

        return direction;
    }

    GetMagnitude(vector)
    {
        return Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z);
    }
}