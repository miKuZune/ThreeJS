// Imports


// Setup the base scene
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 5;
camera.rotation.x = 25;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight);
renderer.setClearColor("#e5e5e5");
document.body.appendChild(renderer.domElement);

//		Add a light.
var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
scene.add( directionalLight );



// Define game parameters
var floorYCoord = -2.5;
var obstaclesToPassToReiterate = 10;

var distanceBetweenObstacles = -15;
	// Camera offsets
	var cameraOffset = new THREE.Vector3(0, 2.5, 5);

// Dynamic gameplay variables
	var obstacleLatestZ = 0;
	var numberOfObstaclesPassed = -1;
	var currentObstacleID = 0;

// Initalise player 
// 		Initalise the visible object representing the player
	var geometry = new THREE.BoxGeometry( 1, 1.5, 0.01 );
	var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	var player = new THREE.Mesh( geometry, material );
	player.position.y = -2.5;
	scene.add( player );
//		Initalise the player controller script
	var P_Controller = new PlayerController(player);

// Create the floor
	var floorOffset = new THREE.Vector3(0,floorYCoord - 3, 0);
	geometry = new THREE.PlaneGeometry(100,1000,32);
	material = new THREE.MeshBasicMaterial({color: "rgb(66, 212, 245)", side: THREE.DoubleSide});
	var plane = new THREE.Mesh(geometry, material);
	plane.rotation.x = 1.5708;
	plane.position.y =  floorOffset.y;
	scene.add(plane);


// Initalise the obstacles
geometry = new THREE.BoxGeometry(1,2.5,1);
var numberOfObstacles = 25;
var obstacleArray = new Array(numberOfObstacles);

for(var i = 0; i < numberOfObstacles; i++)
{
	var newMat = new THREE.MeshBasicMaterial({color: "rgb(114,0,114)"});
	var newObj = new THREE.Mesh(geometry, newMat);
	newObj.position.y = -2.5;
	scene.add(newObj);
	obstacleArray[i] = new Obstacle(newObj);
	obstacleArray[i].SetZ(GetNextObstaclePosition());
}


var isplaying = true;

// Setup the loop function that will run the game.
function update()
{
	// Ensure looping behaviour.
	requestAnimationFrame(update);

	// Whatever we want to happen in the loop.
	if(isplaying)
	{
		// Update the player
		P_Controller.Update();
		// Make the camera follow the player
		FollowPosition(P_Controller.gameobject.position, cameraOffset, camera);
		camera.position.x = 0;
		// Make the floor follow the player
		FollowPosition(P_Controller.gameobject.position, floorOffset, plane);
		plane.position.x = 0;
		

		// Handle the obstacles
		for(var i = 0; i < numberOfObstacles; i++)
		{
			obstacleArray[i].update(P_Controller.currentLane, player.position.z);
		}
	}else
	{

	}
		
	// Re-render the scene.
	renderer.render(scene,camera);
}
// Start the loop.
update();


// Ensure that the visible elements resize when the users changes the size of their browser.
window.addEventListener('resize', () => {
	renderer.setSize( window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth/ window.innerHeight;

	camera.updateProjectionMatrix();
})

window.addEventListener("keydown", HandleKeyboardInput);
window.addEventListener("touchstart", HandleTouchInput);

function HandleKeyboardInput(e)
{
	var newPlayerPos = 9999;
	if(e.key == "ArrowLeft" || e.key == "a")
	{
		newPlayerPos = P_Controller.MoveLeft();		// Found in PlayerController.js
	}else if(e.key == "ArrowRight" || e.key == "d")
	{
		newPlayerPos = P_Controller.MoveRight();		// Found in PlayerController.js
	}

	if(newPlayerPos < 9999)
	{
		ChangePlayerPosition(newPlayerPos);
	}
	
}

function HandleTouchInput(e)
{	
	var touchPos_X = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
	var touchPos_Y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
	var newPlayerPos = 9999;

	if(touchPos_X > 0)
	{
		newPlayerPos = P_Controller.MoveRight();
	}else if(touchPos_X <= 0)
	{
		newPlayerPos = P_Controller.MoveLeft();
	}

	if(newPlayerPos < 9999)
	{
		ChangePlayerPosition(newPlayerPos);
	}

}

function ChangePlayerPosition(newPos)
{
	if(newPos >= 9999){return;}
	player.position.x = newPos;
}

function OnPassedObject()
{
	numberOfObstaclesPassed++;
	if(numberOfObstaclesPassed % 10 == 0 && numberOfObstaclesPassed > 0)
	{
		
		// Loop the passed objects back around.
		for(var i = 0; i < 10; i++)
		{
			obstacleArray[currentObstacleID].GetRandomLane();
			obstacleArray[currentObstacleID].gameobject.position.z = GetNextObstaclePosition();
			obstacleArray[currentObstacleID].hasPassedPlayer = false;
			currentObstacleID++;
			if(currentObstacleID >= obstacleArray.length){currentObstacleID = 0;}
		}
	}
}

function GetNextObstaclePosition()
{
	obstacleLatestZ += distanceBetweenObstacles;
	return obstacleLatestZ;
}

function FollowPosition(targetPosition, offset, objectToMove)
{
	var newPos = new THREE.Vector3(targetPosition.x, targetPosition.y, targetPosition.z);
	newPos.x += offset.x;
	newPos.y += offset.y;
	newPos.z += offset.z;

	objectToMove.position.x = newPos.x;
	objectToMove.position.y = newPos.y;
	objectToMove.position.z = newPos.z;
	

	return newPos;
}

function OnGameOver()
{
	isplaying = false;
	// Create button object
	var button = document.createElement("button");
	button.innerHTML = "Play Again!";
	button.setAttribute("ID", "playAgainButton");
	// Add button to HTML page
	document.body.appendChild(button);
	// Add event listener for button
	button.addEventListener("click", PlayAgain);
	
}

function PlayAgain()
{

	player.position.z = 0;
	
	obstacleLatestZ = 0;
	currentObstacleID = -1;
	isplaying = true;

	var playAgainButton = document.getElementById("playAgainButton");
	playAgainButton.parentNode.removeChild(playAgainButton);

	PositionAllObstacles();
}

function PositionAllObstacles()
{
	for(var i = 0; i < obstacleArray.length; i++)
	{
		obstacleArray[i].SetZ(GetNextObstaclePosition());
		obstacleArray[i].hasPassedPlayer = false;
	}
}