class Lane
{
    positions = 
	{
		MIDDLE : 'middle',
		LEFT: 'left',
		RIGHT: 'right'
    }

    currentPosition = null
    
    constructor()
    {
        this.currentPosition = this.positions.MIDDLE;
    }

    SetLane(position)
    {
        this.currentPosition = position;
    }

    GetLane()
    {
        return this.currentPosition;
    }
}