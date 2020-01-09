class StartScreen
{
    constructor()
    {
        var body = document.body;

        // Container for all elements
        var startScreenContainer = document.createElement('div');
        startScreenContainer.setAttribute('id', 'startScreenContainer');

        body.appendChild(startScreenContainer);

        this.canvas = document.getElementById('gameContainer');
        this.canvas.setAttribute('style', 'display:none;');

        // Background Image
        var backgroundImage = document.createElement('img');
        backgroundImage.setAttribute('id', 'startScreen_BackgroundImage');
        backgroundImage.setAttribute('src', 'Images/HomescreenBackground.png');

        startScreenContainer.appendChild(backgroundImage);
        // Logo
        var logo = document.createElement("img");
        logo.setAttribute('id', 'startScreen_Logo');
        logo.setAttribute('src', 'Images/Evans_Logo.png');

        //startScreenContainer.appendChild(logo);

        // Hero image
        var heroImg = document.createElement("img");
        heroImg.setAttribute('id','startScreen_hero');
        heroImg.setAttribute('src', 'Images/RidingHomeForChristmas.png');

        startScreenContainer.appendChild(heroImg);

        // "Scene" images
        var obstacle_one = document.createElement('img');
        var obstacle_two = document.createElement('img');
        var player = document.createElement('img');

        obstacle_one.setAttribute('id', 'startScreen_obstacle_one');
        obstacle_two.setAttribute('id', 'startScreen_obstacle_two');
        player.setAttribute('id', 'startScreen_player');

        obstacle_one.setAttribute('src', 'Images/Trunk.png');
        obstacle_two.setAttribute('src', 'Images/Tree1.png');
        player.setAttribute('src', 'Images/HomeScreenGuy.png');

        startScreenContainer.appendChild(obstacle_one);
        startScreenContainer.appendChild(obstacle_two);
        startScreenContainer.appendChild(player);

        // Text container
        var textContainer = document.createElement('div');
        textContainer.setAttribute('id', 'startScreen_textContainer');

        startScreenContainer.appendChild(textContainer);
        // Text 1
        var text1 = document.createElement('p');
        text1.setAttribute('class', 'startScreen_text');
        text1.setAttribute('id', 'startScreen_text1');

        text1.innerHTML = "MAKE IT HOME FOR CHRISTMAS FOR A CHANCE TO WIN A BROMPTON M6L BIKE AND AN EXCLUSIVE GIFT PACK";

        textContainer.appendChild(text1);
        // Text 2
        var text2 = document.createElement('p');
        text2.setAttribute('class', 'startScreen_text');
        text2.setAttribute('id', 'startScreen_text2');

        text2.innerHTML  = '<p>GIFT PACK INCLUDES:</p>  <p> NEW BOROUGH L BAG IN DARK GREY</p>  <p>BROMPTON LOGO COLLECTION T-SHIRT</p> <p> BROMPTON LOGO COLLECTION BEANIE</p>';

        textContainer.appendChild(text2);
        // Next button
        var nextButton = document.createElement('button');
        nextButton.setAttribute('id', 'startScreen_nextButton');

        nextButton.innerHTML = "GO!";

        nextButton.addEventListener('click', OnNextButtonClick);

        startScreenContainer.appendChild(nextButton);
        // Sound button
        var soundButton = document.createElement('button');
        soundButton.setAttribute('id', 'startScreen_soundButton');
        soundButton.innerHTML = ' <img id="startScreen_soundButton_Image" src="SVGS/volume-up.svg"/> ';

        soundButton.addEventListener('click', OnSoundButtonClicked);

        startScreenContainer.appendChild(soundButton);

        function OnNextButtonClick()
        {
            HideUI();

            var controls = new ControlsScreen();
        }

        function OnSoundButtonClicked()
        {
            alert('sound button clicked');
        }

        function HideUI()
        {
            startScreenContainer.parentNode.removeChild(startScreenContainer);
        }

    }


    NewGame()
    {
        console.log("Hello");
    }

    StartGame()
    {
        console.log('asdfasdf');
        
            var newGame = new NewGame();
    }
}