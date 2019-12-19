class PlayerController
{
	xPositions =
	{
		MIDDLE: 0,
		LEFT: -1.5,
		RIGHT: 1.5
	}

	currentLane = null
	gameobject = null
	speed = -0.15

	constructor(playerMesh)
	{
		this.currentLane = new Lane();
		this.gameobject = playerMesh;
	}

	

	MoveLeft()
	{
		if(this.currentLane.GetLane() == this.currentLane.positions.LEFT || !isplaying){return 9999;}

		switch(this.currentLane.GetLane())
		{
			case this.currentLane.positions.RIGHT:
				this.currentLane.SetLane(this.currentLane.positions.MIDDLE);
				return this.xPositions.MIDDLE;
				break;
			case this.currentLane.positions.MIDDLE:
				this.currentLane.SetLane(this.currentLane.positions.LEFT);
				return this.xPositions.LEFT;
				break;
		}
		console.log(this.currentPosition + " : pos");

	}

	MoveRight()
	{
		if(this.currentLane.GetLane() == this.currentLane.positions.RIGHT || !isplaying){return 9999;}

		switch(this.currentLane.GetLane())
		{
			case this.currentLane.positions.LEFT:
				this.currentLane.SetLane(this.currentLane.positions.MIDDLE);
				return this.xPositions.MIDDLE;
				break;
			case this.currentLane.positions.MIDDLE:
				this.currentLane.SetLane(this.currentLane.positions.RIGHT);
				return this.xPositions.RIGHT;
				break;
		}
		console.log(this.currentPosition + " : pos");
	}

	Update()
	{
		this.gameobject.position.z += this.speed;
	}
}