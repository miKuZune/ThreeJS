class LostscreenUI
{
    constructor(distanceToTravel)
    {
        // Store the body of the webpage.
        var body = document.body;

        // Create a container to store all the UI in
        var lostScreenUI_Container = document.createElement("div");
        lostScreenUI_Container.setAttribute("class", "fullscreenUI_Container");

        body.appendChild(lostScreenUI_Container);
        // Add the background
        var lostScreenBackground = document.createElement("img");
        lostScreenBackground.src = 'Images/HomescreenBackground.png';
        lostScreenBackground.setAttribute('class', 'UI_Background');

        lostScreenUI_Container.appendChild(lostScreenBackground);
        
        // Logo
        var logo = document.createElement("img");
        logo.src = 'Images/Evans_Logo.png';
        logo.setAttribute('class', 'logo lostLogo');

        lostScreenUI_Container.appendChild(logo);

        // Game over image
        var gameOverImg = document.createElement("img");
        gameOverImg.src = 'Images/Gameover_Text.png';
        gameOverImg.setAttribute('class', 'gameOverImg');

        lostScreenUI_Container.appendChild(gameOverImg);

        // Text area container
        var textContainer = document.createElement("div");
        textContainer.setAttribute("class", "lostscreen_textcontainer");

        lostScreenUI_Container.appendChild(textContainer);

        // Text 1
        var text1 = document.createElement("p");
        text1.innerHTML = "YOU ARE ONLY";
        text1.setAttribute('class', 'lostScreenText lost_T1');

        textContainer.appendChild(text1);
        
        // Text 2
        var text2 = document.createElement("p");
        text2.innerHTML = "" + distanceToTravel;
        text2.setAttribute('class', 'lostScreenText lost_T2');

        textContainer.appendChild(text2);
        
        // Text 3
        var text3 = document.createElement("p");
        text3.innerHTML = "MILES FROM HOME";
        text3.setAttribute('class', 'lostScreenText lost_T3');

        textContainer.appendChild(text3);
        // Text 4
        var text4 = document.createElement("p");
        text4.innerHTML = "PLAY AGAIN FOR YOUR CHANCE TO WIN OR CHALLENGE YOUR FIRNEDS!";
        text4.setAttribute('class', 'lostScreenText lost_T4');

        textContainer.appendChild(text4);
        // Play again button
        var button = document.createElement("button");
        button.innerHTML = "Play Again";   

        lostScreenUI_Container.appendChild(button);
        
        // Add the functionality to the button
        button.addEventListener("click", function(){
            // Hide button
            lostScreenUI_Container.parentNode.removeChild(lostScreenUI_Container);
            // Reset UI
            //distanceTraveledUI.innerHTML = "0.00";
            //DistanceProgressBar.value = 0;
            
            var newGame = new NewGame();

        });
        // Set the ID
        button.setAttribute("id", "tryAgainButton");

        // Share button
        var shareButton = document.createElement("button");
        shareButton.innerHTML = "Share";

        lostScreenUI_Container.appendChild(shareButton);

        shareButton.setAttribute("id", "shareButton");

        shareButton.addEventListener("click", function(){
            alert("Share!?!");
        })
    }
}