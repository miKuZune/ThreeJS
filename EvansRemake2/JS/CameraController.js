class CameraController
{
    //camera;
    //offset;
    //player;

    //targetFollower;

    constructor(camera, player)
    {
        this.camera = camera;
        this.player = player;

        this.offset = new THREE.Vector3(0,2,5);

        this.targetFollower = new FollowTarget(camera, player, this.offset);
        this.targetFollower.SetFollowSpeed(7.5);
    }

    update()
    {
        this.targetFollower.Update();
        this.camera.position.y = this.player.position.y + this.offset.y;
        this.camera.position.z = this.player.position.z + this.offset.z;
        //this.targetFollower.SetPosition_Z(this.player.position.z - this.offset.z);
        //console.log(this.camera.position);
    }
}