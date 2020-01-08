class ControlsScreen
{
    constructor()
    {
        var body = document.body;

        // Controls screen container
        var controlsContainer = document.createElement('div');
        controlsContainer.setAttribute('id', 'controls_container');

        body.appendChild(controlsContainer);

        // Background
        var background = document.createElement('img');
        background.setAttribute('id', 'startScreen_BackgroundImage');
        background.setAttribute('src', 'Images/HomeScreenBackground.png');

        controlsContainer.appendChild(background);

        // Logo
        var logo = document.createElement('img');
        logo.setAttribute('id', 'controls_logo');
        logo.setAttribute('src','Images/Evans_Logo.png');

        controlsContainer.appendChild(logo);

        // How to play image
        var hero = document.createElement('img');
        hero.setAttribute('id', 'controls_hero');
        hero.setAttribute('src', 'Images/HowToPlay.png');

        controlsContainer.appendChild(hero);

        // Text container
        var text_container = document.createElement('div');
        text_container.setAttribute('id', 'controls_textContainer');

        controlsContainer.appendChild(text_container);
        // Text 1
        var text1 = document.createElement('p');
        text1.innerHTML = 'AVOID THE OBSTACLES AND MAKE IT HOME FOR CHRISTMAS';
        text1.setAttribute('class', 'controls_text');
        text1.setAttribute('id', 'controls_text1');

        text_container.appendChild(text1);
        // Text 2
        var text2 = document.createElement('p');
        text2.innerHTML = 'CONTROLS';
        text2.setAttribute('class', 'controls_text');
        text2.setAttribute('id', 'controls_text2');

        text_container.appendChild(text2);
        // Text 3
        var text3 = document.createElement('p');
        text3.innerHTML = 'LEFT     = LEFT ARROW';
        text3.setAttribute('class', 'controls_text');
        text3.setAttribute('id', 'controls_text3');

        text_container.appendChild(text3);
        // Text 4
        var text4 = document.createElement('p');
        text4.innerHTML = 'RIGHT    = RIGHT ARROW';
        text4.setAttribute('class', 'controls_text');
        text4.setAttribute('id', 'controls_text4');

        text_container.appendChild(text4);
        // Next button
        var nextButton = document.createElement('button');
        nextButton.setAttribute('id', 'controls_nextButton');
        nextButton.innerHTML = "PLAY";

        nextButton.addEventListener('click', OnNextButtonClick);

        controlsContainer.appendChild(nextButton);
        // Previous button
        var previousButton = document.createElement('button');
        previousButton.setAttribute('id','controls_previousButton');
        previousButton.innerHTML = '<img src="SVGS/arrow-left.svg"/>';

        previousButton.addEventListener('click', OnPreviousButtonClick);

        controlsContainer.appendChild(previousButton);

        function OnNextButtonClick()
        {
            HideUI();
            var newGame = new NewGame();
        }

        function OnPreviousButtonClick()
        {
            HideUI();
            var start = new StartScreen();
        }

        function HideUI()
        {
            controlsContainer.parentNode.removeChild(controlsContainer);
        }
    }


}