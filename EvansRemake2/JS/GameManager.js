class GameManager
{
    constructor()
    {
        this.StartGame();
    }

    GameLoop(camera, scene, renderer, gameManager)
    {
        // Variables
        var player_speed = 15;

        // Camera settings
        scene.background = new THREE.Color( 0xffffff );

        // Add input listeners
        document.body.addEventListener("keydown", OnKeyDown);
        document.body.addEventListener("touchstart", OnTouch);

        // Game start code

        var GM = gameManager;
        //      Player
        var P_Controller = new PlayerController(scene, player_speed, this);
        
        //      Camera
        var CamControl = new CameraController(camera, P_Controller.sprite);

        //      Obstacles
        var distanceBetweenObstacles = 25;

        var Ob_Manager = new ObstacleManager(25, scene, P_Controller.sprite, this);

        //      Floor
        var floorGeometry = new THREE.BoxGeometry(10,0.1,100);
        var floorMat = new THREE.MeshBasicMaterial( {color:0x00ff00} );
        var floorMesh = new THREE.Mesh( floorGeometry, floorMat );
        scene.add(floorMesh);

        floorMesh.position.x = 0;
        floorMesh.position.y = -4;
        floorMesh.position.z = -50;

        this.distanceToTravel = 1.5;
        var DistMath = new DistanceMaths();

        

        // Game loop
        function Loop()
        {
            if(GM.hasLost){return;}
            if(GM.hasWon){return;}
            // Repeat this loop.
            requestAnimationFrame( Loop );
            // Re-render the scene.
            renderer.render(scene, camera);

            P_Controller.Update();
            CamControl.update();
            Ob_Manager.Update();

            if( P_Controller.distTraveled >= DistMath.ConvertMilesToMetre(GM.distanceToTravel))
            {
                GM.WonGame();
            }
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

            if(touchPos_X > 0)
            {
                P_Controller.MoveRight();
            }else
            {
                P_Controller.MoveLeft();
            }
        }

        function Test()
        {
            console.log("Testing from within");
        }
    }

    WonGame()
    {
        console.log("Game is won!");
        var gameWonUI = document.createElement("h2");
        gameWonUI.setAttribute("id", "gameWonText");
        gameWonUI.innerHTML = "CONGRATULATIONS! YOU'VE WON";
        document.body.appendChild(gameWonUI);
        this.hasWon = true;
    }

    GameOver()
    {
        this.hasLost = true;

        // Show gameover button
        //  Create button object
        var button = document.createElement("button");
        button.innerHTML = "Play Again";
        // Add the button to the html page
        var body = document.body;
        body.appendChild(button);
        // Add the functionality to the button
        button.addEventListener("click", function(){
            // Hide button
            button.parentNode.removeChild(button);
            
            NewGame();

        });
        // Set the ID
        button.setAttribute("id", "tryAgainButton");
    }

    StartGame()
    {
        // Core THREE.js initialization code, setting up the scene camera and renderer.
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("gameContainer").appendChild(renderer.domElement);

        camera.position.z = 5;

        this.playersLane = "middle";
        this.hasLost = false;
        this.hasWon = false;        
        // Starting the main game loop.


        this.GameLoop(camera, scene, renderer, this);
        
    }

    // Getter & setter for player lane to acces it easier.
    SetPlayerLane(newPlayerLane){this.playersLane = newPlayerLane;}
    GetPlayerLane(){return this.playersLane;}

    ConvertDegreeToRadian(degree)
    {
        return degree * 0.0174533;
    }
}