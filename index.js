var Alexa = require('alexa-sdk');
var http = require('http');

const skillName = "Veera DIY Home Automation";

var handlers = {


    "AboutIntent": function () {
        var speechOutput = "Veera is home automation assistant to help iot enthusiasts to build iot devices and integrat with Alexa quickly.";
        this.emit(':tellWithCard', speechOutput, skillName, speechOutput);
    },

    "AMAZON.HelpIntent": function () {
        var speechOutput = "";
        speechOutput += "Here are some things you can say: ";
        speechOutput += "Ask Veera to Switch on Bedroom Lights. ";
        speechOutput += "Ask Veera to Power off Bedroom Fan. ";
        speechOutput += "Ask Veera to Turn on bedroom all devices. ";
        speechOutput += "So how can I help?";
        this.emit(':ask', speechOutput, speechOutput);
    },

    "AMAZON.StopIntent": function () {
        var speechOutput = "Goodbye";
        this.emit(':tell', speechOutput);
    },

    "AMAZON.CancelIntent": function () {
        var speechOutput = "Goodbye";
        this.emit(':tell', speechOutput);
    },

    "LaunchRequest": function () {
        var speechText = "";
        speechText += "Welcome to " + skillName + ". ";
        speechText += "You can ask Veera to manage your home appliances. ";
        speechText += "You can say Hey Alexa ask Veera to Turn on bedroom lights. ";
        this.emit(':tell', speechText);
    },
    "TurnOn": function () {
        var intentObj = this.event.request.intent;
        var area = intentObj.slots.Area.value;
        var device = intentObj.slots.Device.value;
        var speechText = "";

        //send Request to my Raspberry pi running on my home network.

        http.get('http://xyz/LightOn', (resp) => {  //URL has been masked for saftey and privacy.

            let data = '';
            //A Chunk of data has been received.
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () =>{
                //Do nothing for now.
            });
        }).on("error", (err) =>{
            //Do nothing for now.
        });

        speechText = "Turning on " + area +" "+device;
        this.emit(':tell', speechText);     
    }

};



exports.handler = function (event, context) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = "amzn1.ask.skill.5bde0db0-8e9c-4ac8-ba80-c86e724d66bc";
    alexa.registerHandlers(handlers);
    alexa.execute();
};
