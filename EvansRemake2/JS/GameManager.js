class GameManager
{
    constructor()
    {
        this.StartGame();
    }

    GameLoop(camera, scene, renderer, gameManager)
    {
        var DistMath = new DistanceMaths();

        // Variables
        var player_speed = 15;
        var speedPerIncrease = 2.5;
        var maxPlayerSpeed = 50;

        // Camera settings
        //scene.background = new THREE.Color( 0xffffff );

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

        this.distanceToTravel = 1.5;

        var maxNumberOfObjs = Math.floor(DistMath.ConvertMilesToMetre(this.distanceToTravel) / distanceBetweenObstacles);
        var Ob_Manager = new ObstacleManager(25, scene, P_Controller.sprite, this, maxNumberOfObjs);

        //      Floor
        var floorGeometry = new THREE.BoxGeometry(10,0.1,1000);
        var floorMat = new THREE.MeshBasicMaterial( {color:0x00ff00} );
        var floorMesh = new THREE.Mesh( floorGeometry, floorMat );
        scene.add(floorMesh);

        floorMesh.position.x = 0;
        floorMesh.position.y = -4;
        floorMesh.position.z = -500;

        var grassGeometry = new THREE.BoxGeometry(500,0.1,1000);
        var grassMat = new THREE.MeshBasicMaterial( { color:0x84c0ec } );
        var grassMesh = new THREE.Mesh( grassGeometry, grassMat );
        scene.add(grassMesh);

        grassMesh.position.y = floorMesh.position.y - 0.1;
        grassMesh.position.z = floorMesh.position.z; 

        var metresToTravel = DistMath.ConvertMilesToMetre(GM.distanceToTravel);

        var lostGame_FrameCounter = 0;
        var playerOnLostAnimator;


        var playerStartFrameLocations = 
        [
            'Images/Foldout1.png',
            'Images/Foldout2.png',
            'Images/Foldout3.png',
            'Images/Foldout4.png'
        ];
        var playerOnStartAnimator = new TwoD_Animator(playerStartFrameLocations, P_Controller.sprite.material, 15);
        var isStarting = true;
        var startCounter = 0;


        var distanceTraveledUI = document.getElementById("distTraveled");


        // Game loop
        function Loop()
        {
            // Repeat this loop.
            requestAnimationFrame( Loop );
            // Re-render the scene.
            renderer.render(scene, camera);

            CamControl.update();

            if(isStarting == true)
            {
                GameStartUpdate();
                return;
            }

            if(GM.hasLost)
            {
                GameLostUpdate();                
                return;
            }
            if(GM.hasWon)
            {
                return;
            }
            

            P_Controller.Update();
            
            Ob_Manager.Update();

            floorMesh.position.z = P_Controller.sprite.position.z;
            grassMesh.position.z = floorMesh.position.z;
            
            if( P_Controller.distTraveled >= metresToTravel)
            {
                GM.WonGame();
            }

            if(Ob_Manager.obstaclesPassed % 5 == 0 && Ob_Manager.obstaclesPassed > 0)
            {
                IncreaseSpeed();
            }else{speedHasIncreased = false;}

            // Update UI
            var percentTraveled = (P_Controller.distTraveled / metresToTravel) * 100;
            DistanceProgressBar.value = percentTraveled;

            DistanceTextUpdate();
        }

        Loop();

        function DistanceTextUpdate()
        {
            // Update UI
            var milesTraveled = DistMath.ConvertMilesToMetre(distTraveled);

            distanceTraveledUI.innerHTML = Math.round( (GM.distanceToTravel - DistMath.ConvertMetreToMiles( P_Controller.distTraveled)) * 100) / 100;
        }

        var speedHasIncreased = false;
        function IncreaseSpeed()
        {
            if(speedHasIncreased == false)
            {
                P_Controller.speed += speedPerIncrease;
                
                if(P_Controller.speed > maxPlayerSpeed)
                {
                    P_Controller.speed = maxPlayerSpeed;
                }
                speedHasIncreased = true;
            }
        }

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

        function GameStartUpdate()
        {
            var value = (playerStartFrameLocations.length + 1)  * 15;
                if(startCounter == value)
                {
                    isStarting = false;
                }

                playerOnStartAnimator.Update();

                startCounter++;
        }

        function GameLostUpdate()
        {
            lostGame_FrameCounter++;

            var locations = [
                'Images/Crash1.png',
                'Images/Crash2.png',
                'Images/Crash3.png'
            ];

            if(lostGame_FrameCounter == 1)
            {
                P_Controller.sprite.position.z += 0.5;
                
                playerOnLostAnimator = new TwoD_Animator(locations,P_Controller.sprite.material, 15);
            }
            
            if(lostGame_FrameCounter == locations.length * 15)
            {
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

            if(lostGame_FrameCounter <= locations.length * 15)
            {
                playerOnLostAnimator.Update();
            }
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
       
    }

    StartGame()
    {
        // Core THREE.js initialization code, setting up the scene camera and renderer.
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        var gameCanvas = document.getElementById("gameCanvas");
        var renderer = new THREE.WebGLRenderer( { gameCanvas , alpha:true, } );
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