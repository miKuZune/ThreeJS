class ProgressUIManager
{
    constructor()
    {
        var body = document.body;

        // Add the progress bar
        this.DistanceProgressBar = document.createElement("progress");
        this.DistanceProgressBar.setAttribute('id', 'distanceProgressBar');
        this.DistanceProgressBar.max = 100;

        body.appendChild(this.DistanceProgressBar);

        
        // Add the "checkpoint" bars
        this.progressBarItems = new Array(5);

        for(var i = 0 ; i < 5; i ++)
        {
            this.progressBarItems[i] = document.createElement("div");
            this.progressBarItems[i].setAttribute("class", "distanceCheckpointBar");
            this.progressBarItems[i].setAttribute("id", ("distanceCheckpointBar" + (i + 1)));
            body.appendChild(this.progressBarItems[i]);
        }

        this.activeProgressIndicatorText = "background:white;";


        this.progressMessages = [
            "You're getting closer",
            "Nearly there",
            "So close",
            "Almost there"
        ];
        this.progressMessageCurrId = 0;
        this.progressTextCounter = 0;
        this.progressTextMaxCount = 60;


        this.Reset();
    }

    Update(checkpointsPassed, percentTraveled)
    {
        // Update the percent bar indicators
        for(var i = this.progressBarItems.length - 1; i > -1; i--)
        {
            if(i >= (this.progressBarItems.length - checkpointsPassed) - 1)
            {
                
                if(this.progressBarItems[i].getAttribute("style") != this.activeProgressIndicatorText)
                {
                    this.progressBarItems[i].setAttribute("style", this.activeProgressIndicatorText);
                    console.log("updated new bar");
                    if(i < 4 && i > 0)
                    {
                        this.ShowText();
                    } 
                }
            }
        }
        // Update the progress bar itself
        this.DistanceProgressBar.value = percentTraveled;

        // If showing progress text countdown to stop showing
        if(this.progressTextCounter > 0)
        {
            this.progressTextCounter--;

            if(this.progressTextCounter <= 0)
            {
                // Stop showing progress text.
                var progressText = document.getElementById("progressText");
                progressText.parentNode.removeChild(progressText);
            }
        }
    }

    // Set all the values back to 0
    Reset()
    {
        this.DistanceProgressBar.value = 0;

        for(var i = 0; i < this.progressBarItems.length; i++)
        {
            this.progressBarItems[i].setAttribute("style", "background: grey;");
        }
    }

    ShowText()
    {
        var body = document.body;
        // Create and add the text to the page
        var text = document.createElement("p");
        text.innerHTML =this.progressMessages[this.progressMessageCurrId];
        this.progressMessageCurrId++;
        if(this.progressMessageCurrId >= this.progressMessages.length){this.progressMessageCurrId = 0;}

        text.setAttribute("id", "progressText");

        body.appendChild(text);

        // Start the countdown to remove the text.
        this.progressTextCounter = this.progressTextMaxCount;
    }
}