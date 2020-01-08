class WonscreenUI
{
    constructor()
    {
        var body = document.body;

        // Container
        var container = document.createElement("div");
        container.setAttribute("id", "wonUIContainer");

        body.appendChild(container);

        // Congratz image
        var congtratzImage = document.createElement("img");
        congtratzImage.setAttribute("src", "Images/Congratulations.png");
        congtratzImage.setAttribute("id", "congratizImg");

        container.appendChild(congtratzImage);
        // Text 1
        var text1 = document.createElement("p");
        text1.innerHTML = "YOU'VE MADE IT HOME";
        text1.setAttribute("class", "wonScreenText");
        text1.setAttribute("id", "wonScreenText1");

        container.appendChild(text1);
        // Text 2 (long)
        var text2 = document.createElement("p");
        text2.innerHTML = "YOU HAVE BEEN ENTERED INTO OUR BROMPTON COMPETITION TO WIN A BROMPTON M6L! WHY NOT CHALLENGE YOUR FRIENDS.";
        text2.setAttribute("class", "wonScreenText");
        text2.setAttribute("id", "wonScreenText2");

        container.appendChild(text2);
        // Evans store button
        var evansStoreButton = document.createElement("button");
        evansStoreButton.innerHTML = "EVANS STORE";
        evansStoreButton.setAttribute("class", "evansStoreButton");

        evansStoreButton.addEventListener("click", function(){
            window.open("https://www.evanscycles.com/");
        });

        container.appendChild(evansStoreButton);
        // Play again button
        var playAgainButton = document.createElement("button");
        playAgainButton.innerHTML = "PLAY AGAIN";
        playAgainButton.setAttribute("class", "wonScreen_PlayAgainButton");

        playAgainButton.addEventListener("click", function(){
            container.parentNode.removeChild(container);
            var newGame = new NewGame();
        });

        container.appendChild(playAgainButton);
        // Share button
        var shareButton = document.createElement("button");
        shareButton.innerHTML = "SHARE";
        shareButton.setAttribute("class", "wonScreen_ShareButton");

        shareButton.addEventListener("click", function(){
            alert("share?!?");
        });

        container.appendChild(shareButton);

    }


}