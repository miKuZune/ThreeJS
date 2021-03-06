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

        this.distanceToTravel = 0.5;

        var maxNumberOfObjs = Math.floor(DistMath.ConvertMilesToMetre(this.distanceToTravel) / distanceBetweenObstacles);
        var Ob_Manager = new ObstacleManager(25, scene, P_Controller.sprite, this, maxNumberOfObjs);

        //      Floor
        var floorGeometry = new THREE.BoxGeometry(10,0.1,1000);
        var floorMat = new THREE.MeshBasicMaterial( {color:0x44ac73} );
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

        // Sun
        var sunMap = new THREE.TextureLoader().load( "Images/Sun.png" );
        var sunMaterial = new THREE.SpriteMaterial( { map:sunMap, color: 0xffffff } );
        var sunSprite = new THREE.Sprite( sunMaterial );

        var sunSprite_StartPos_Y = 50;
        var sunSprite_EndPos_Y = -75;
        var sunDistToTravel = sunSprite_StartPos_Y - sunSprite_EndPos_Y;

        sunSprite.position.z = -250;
        sunSprite.position.y = 50;

        sunSprite.scale.x = 500;
        sunSprite.scale.y = sunSprite.scale.x;

        scene.add(sunSprite);

        // Particle effects
        var particleImgSrcs = [
            'Images/Snowflake1.png',
            'Images/Snowflake2.png'
        ];
        var particles = new ParticleManager_TwoD(scene, 100, particleImgSrcs);

        // Background elements (appear infront of the sun but don't move so arn't included in the sun)
        var backgroundMap = new THREE.TextureLoader().load("Images/Background.png");
        var backgroundMat = new THREE.SpriteMaterial( { map:backgroundMap, color: 0xffffff } );
        var backgroundSprite = new THREE.Sprite( backgroundMat );

        backgroundSprite.position.z = sunSprite.position.z + 0.01;
        backgroundSprite.position.y = 0;

        backgroundSprite.scale.x = 1000;
        backgroundSprite.scale.y = backgroundSprite.scale.x * 0.695;

        scene.add( backgroundSprite );

        var metresToTravel = DistMath.ConvertMilesToMetre(GM.distanceToTravel);

        var lostGame_FrameCounter = 0;
        var playerOnLostAnimator;

        var playerStartFrameLocations = 
        [
            'Images/Foldout1.png',
            'Images/Foldout2.png',
            'Images/Foldout3.png',
            'Images/Foldout4.png',
            'Images/TurnRight.png',
            'Images/Ride_Static.png'
        ];
        var playerOnStartAnimator = new TwoD_Animator(playerStartFrameLocations, P_Controller.sprite.material, 15);
        var isStarting = true;
        var startCounter = 0;

        var gameWonCounter = 0;


        var distanceTraveledUI = document.getElementById("distTraveled");
        var progressUI_Manager = new ProgressUIManager();

        var speedDecreaseAmount = P_Controller.speed / 60;


        var playerWonFrameLocations = [
            'Images/Ride_Static.png',
            'Images/TurnRight.png',
            'Images/Foldout4.png',
            'Images/Foldout3.png',
            'Images/Foldout2.png',
            'Images/Foldour1.png'
        ];
        var gameWon_EndScreenPlayerAnimator = new TwoD_Animator(playerWonFrameLocations, P_Controller.sprite.material, 15);

        // Game loop
        function Loop()
        {
            // Repeat this loop.
            requestAnimationFrame( Loop );
            // Re-render the scene.
            renderer.render(scene, camera);

            CamControl.update();

            // Update particles
            particles.Update(P_Controller.sprite.position.z);

            if(isStarting == true)
            {
                GameStartUpdate();
                floorMesh.position.z = P_Controller.sprite.position.z;
                grassMesh.position.z = floorMesh.position.z;
                return;
            }

            if(GM.hasLost)
            {
                GameLostUpdate();                
                return;
            }
            if(GM.hasWon)
            {
                gameWonCounter++;
                if(gameWonCounter < 60)
                {
                    P_Controller.speed -= speedDecreaseAmount;
                    if(P_Controller.speed < 0)
                    {
                        P_Controller.sprite = 0;
                    }
                    P_Controller.Update();
                }

                if(gameWonCounter > 60 && gameWonCounter < 150)
                {
                    // Animate the player
                    gameWon_EndScreenPlayerAnimator.Update();
                }

                if(gameWonCounter > 150 && gameWonCounter < 210)
                {
                    CamControl.offset.y += 0.1;
                    particles
                }

                if(gameWonCounter == 230)
                {
                    GM.RemoveUI();

                    // Show won UI
                    var WonUI = new WonscreenUI();
                }
                Ob_Manager.goalManager.Update();
                return;
            }            

            P_Controller.Update();
            
            Ob_Manager.Update();

            // Handle moving the floor objects
            floorMesh.position.z = P_Controller.sprite.position.z;
            grassMesh.position.z = floorMesh.position.z;
            // Handle moving the SUN & the background elements with the player
            sunSprite.position.z = P_Controller.sprite.position.z - 250;
            backgroundSprite.position.z = sunSprite.position.z + 0.01;
            
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

            // Move the sun to indicate "time"
            var newSunYPos = sunSprite_StartPos_Y - (sunDistToTravel * (percentTraveled / 100));
            sunSprite.position.y = newSunYPos;

            DistanceTextUpdate();

            var checkpointsPassed = Math.floor(percentTraveled / 25);
            progressUI_Manager.Update(checkpointsPassed, percentTraveled);
        }

        Loop();

        function DistanceTextUpdate()
        {
            // Update UI
            var milesTraveled = DistMath.ConvertMilesToMetre(P_Controller.distTraveled);

            distanceTraveledUI.innerHTML = (Math.round( (GM.distanceToTravel - DistMath.ConvertMetreToMiles( P_Controller.distTraveled)) * 100) / 100).toFixed(2);
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

        var countdownImages = [
            'Images/countdown_3.png',
            'Images/countdown_2.png',
            'Images/countdown_1.png'
        ];

        var countdownImage = document.createElement("img");
        countdownImage.setAttribute("id", "countdownImage");

        
        function GameStartUpdate()
        {
            var value = (playerStartFrameLocations.length)  * 15;
            if(startCounter >= value + (60 * 3))
            {
                countdownImage.parentNode.removeChild(countdownImage);
                isStarting = false;
            }

            // Start the countdown
            if(startCounter > value && startCounter < value + (60 * 3))
            {
                var framesSinceCountdownBegan = startCounter - value;
                var currCountdownImgID = framesSinceCountdownBegan / 60;
                currCountdownImgID = Math.floor(currCountdownImgID);
                countdownImage.setAttribute("src", countdownImages[currCountdownImgID]);
            }

            if(startCounter < value)
            {
                playerOnStartAnimator.Update();
            }else if(startCounter == value)
            {
                document.body.appendChild(countdownImage);
                countdownImage.setAttribute("src", countdownImages[0]);
            }
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

            // Start
            if(lostGame_FrameCounter == 1)
            {
                P_Controller.sprite.position.z += 0.5;
                
                playerOnLostAnimator = new TwoD_Animator(locations,P_Controller.sprite.material, 15);
            }
            
            // End (Shows UI)
            if(lostGame_FrameCounter == locations.length * 15)
            {
                var lostScreenUI_Manager = new LostscreenUI((Math.round( (GM.distanceToTravel - DistMath.ConvertMetreToMiles( P_Controller.distTraveled)) * 100) / 100).toFixed(2));
            }

            // Update
            if(lostGame_FrameCounter <= locations.length * 15)
            {
                playerOnLostAnimator.Update();
            }
        }

        // Resize window & aspect ratio
        window.addEventListener('resize', onWindowResize, false);
        function onWindowResize()
        {
            camera.aspect = window.innerWidth/window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);
        }
    }

    RemoveUI()
    {
        // Destroy UI that is no longer neccessary
        var headerText = document.getElementById("distTraveledText");
        var distanceText = document.getElementById("distTraveled");

        if(headerText != undefined)
        {headerText.parentNode.removeChild(headerText);}
        if(distanceText != undefined)
        {distanceText.parentNode.removeChild(distanceText);}
        
        for(var i = 0; i < 5; i++)
        {
            var toDelete = document.getElementById("distanceCheckpointBar" + (i + 1));
            if(toDelete != undefined)
            {toDelete.parentNode.removeChild(toDelete);}
        }

        var progressBar = document.getElementById("distanceProgressBar");
        if(progressBar != undefined)
        {progressBar.parentNode.removeChild(progressBar);}
    }

    WonGame()
    {
        
        this.hasWon = true;
    }

    GameOver()
    {
        this.hasLost = true;

        this.RemoveUI();
    }

    StartGame()
    {
        // Core THREE.js initialization code, setting up the scene camera and renderer.
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        var gameCanvas = document.getElementById("gameCanvas");
        var renderer = new THREE.WebGLRenderer( { gameCanvas , alpha:true, } );
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor( 0x003041 );

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