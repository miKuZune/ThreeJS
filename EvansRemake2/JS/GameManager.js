class GameManager
{
    constructor()
    {
        // Core THREE.js initialization code, setting up the scene camera and renderer.
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("gameContainer").appendChild(renderer.domElement);

        camera.position.z = 5;
        
        // Starting the main game loop.
        this.GameLoop(camera, scene, renderer);
    }

    GameLoop(camera, scene, renderer)
    {
        // Variables
        var player_speed = 15;

        // Camera settings
        scene.background = new THREE.Color( 0xffffff );

        // Add input listeners
        document.body.addEventListener("keydown", OnKeyDown);
        document.body.addEventListener("touchstart", OnTouch);

        // Game start code
        //      Player
        var P_Controller = new PlayerController(scene, player_speed);

        //      Camera
        var CamControl = new CameraController(camera, P_Controller.sprite);

        //      Obstacles
        var distanceBetweenObstacles = 25;

        var Ob_Manager = new ObstacleManager(25, scene, P_Controller.sprite);

        //      Floor
        var floorGeometry = new THREE.BoxGeometry(10,0.1,100);
        var floorMat = new THREE.MeshBasicMaterial( {color:0x00ff00} );
        var floorMesh = new THREE.Mesh( floorGeometry, floorMat );
        scene.add(floorMesh);

        floorMesh.position.x = 0;
        floorMesh.position.y = -4;
        floorMesh.position.z = -50;
        

        console.log("Floor follower");
        console.log(floorMesh);
        
        console.log(floorMesh);

        // Game loop
        function Loop()
        {
            // Repeat this loop.
            requestAnimationFrame( Loop );
            // Re-render the scene.
            renderer.render(scene, camera);
            
            P_Controller.Update();
            CamControl.update();
            Ob_Manager.Update();
        }

        Loop();

        function OnKeyDown(e)
        {
            if(e.key == "ArrowLeft" || e.key == "a")
            {
                P_Controller.MoveLeft();
            }else if(e.key == "ArrowRight" || e.key == "d")
            {
                P_Controller.MoveRight();
            }
        }

        function OnTouch(e)
        {
            var touchPos_X = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
            var touchPos_Y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;

            if(touchPos_X > (window.innerWidth/2))
            {
                P_Controller.MoveRight();
            }else
            {
                P_Controller.MoveLeft();
            }

            console.log(touchPos_X + " " + touchPos_Y);
        }
    }

    ConvertDegreeToRadian(degree)
    {
        return degree * 0.0174533;
    }
}