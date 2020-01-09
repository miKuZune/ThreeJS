class ShareUI
{
    constructor(openOnCreation)
    {
        if(openOnCreation == true || openOnCreation == undefined)
        {
            this.CreateSelf();
        }
        
    }

    CreateSelf()
    {
        var body = document.body;

        // Container
        this.shareContainer = document.createElement('div');
        this.shareContainer.setAttribute('id','shareContainer');

        body.appendChild(this.shareContainer);
        
        // Facebook
        var facebookButton = document.createElement('input');
        facebookButton.setAttribute('class', 'shareButtonLink');
        facebookButton.setAttribute('type', 'image');
        facebookButton.setAttribute('src', 'Images/ShareIcons/facebook.png')

        facebookButton.addEventListener('click', function()
        {
            window.open("https://www.facebook.com/");
            
        });

        this.shareContainer.appendChild(facebookButton);

        // Twitter
        var twitterButton = document.createElement('input');
        twitterButton.setAttribute('class', 'shareButtonLink');
        twitterButton.setAttribute('type', 'image');
        twitterButton.setAttribute('src', 'Images/ShareIcons/twitter.png')

        twitterButton.addEventListener('click', function()
        {
            window.open("https://www.twitter.com/");
        });

        this.shareContainer.appendChild(twitterButton);

        // LinkedIn
        var linkedinButton = document.createElement('input');
        linkedinButton.setAttribute('class', 'shareButtonLink');
        linkedinButton.setAttribute('type', 'image');
        linkedinButton.setAttribute('src', 'Images/ShareIcons/linkedin.png')

        linkedinButton.addEventListener('click', function()
        {
            window.open("https://www.linkedin.com/");
        });

        this.shareContainer.appendChild(linkedinButton);

        // Email
        var emailButton = document.createElement('input');
        emailButton.setAttribute('class', 'shareButtonLink');
        emailButton.setAttribute('type', 'image');
        emailButton.setAttribute('src', 'Images/ShareIcons/email.png')

        emailButton.addEventListener('click', function()
        {
            window.open("https://www.email.com/");
        });

        this.shareContainer.appendChild(emailButton);

        // Whatsapp
        var whatsappButton = document.createElement('input');
        whatsappButton.setAttribute('class', 'shareButtonLink');
        whatsappButton.setAttribute('type', 'image');
        whatsappButton.setAttribute('src', 'Images/ShareIcons/whatsapp.png')

        whatsappButton.addEventListener('click', function()
        {
            window.open("https://www.whatsapp.com/");
        });

        this.shareContainer.appendChild(whatsappButton);

        // Event listeners
        body.addEventListener('mouseup', OnMouseUp);
        body.addEventListener('touchend', OnTouchInput);

        function OnMouseUp(e)
        {
            var xPos = e.clientX;
            var yPos = e.clientY;

            CheckForUIHide(yPos);
        }

        function OnTouchInput(e)
        {
            var touchPos_X = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
            var touchPos_Y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;

            CheckForUIHide(touchPos_Y);
        }

        function CheckForUIHide(yPos)
        {
            var screenHeight = window.innerHeight;
            var deadZoneHeight = 250;
            var deadZonePos = screenHeight - deadZoneHeight

            if(yPos < deadZonePos)
            {  
                RemoveSelf();
                body.removeEventListener('mouseup', OnMouseUp);
            }
        }

        function RemoveSelf()
        {
            var container = document.getElementById('shareContainer');
            container.parentNode.removeChild(container);
        }
    }
}