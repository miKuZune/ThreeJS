class NewGame
{
    constructor()
    {
        var canvas = document.getElementById('gameContainer');
        canvas.setAttribute('style', 'display:block;');
        
        var gameContainer = document.getElementById("gameContainer");

        while(gameContainer.firstChild)
        {
            gameContainer.removeChild(gameContainer.firstChild);
        }

        // Create UI
        var body = document.body;

        var distanceTraveledText = document.createElement("h2");
        distanceTraveledText.innerHTML = "MILES TO HOME";

        body.appendChild(distanceTraveledText);

        distanceTraveledText.setAttribute("id", "distTraveledText");
        distanceTraveledText.setAttribute("class", "distText");

        var distanceOutputText = document.createElement("h2");
        distanceOutputText.innerHTML = "0.00";
        distanceOutputText.setAttribute("id", "distTraveled");
        distanceOutputText.setAttribute("class", "distText");

        body.appendChild(distanceOutputText);

        var darknessOverlay = document.getElementById("darknessOverlay");
        if(darknessOverlay != undefined)
        {darknessOverlay.parentNode.removeChild(darknessOverlay);}


        // Start the gamemanager which will initalize the game and start it's loop.
        var GM = new GameManager();
    }
}