var Alexa = require('alexa-sdk');
var http = require('http');

const skillName = "Veera DIY Home Automation";

var raspConnectionURL = "http://xx.xx.xx.xx";  //Masked for security reasons. Since this code is on public repo.

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

        http.get(raspConnectionURL+'LightOn', (resp) => {  //URL has been masked for saftey and privacy.

            let data = '';
            //A Chunk of data has been received.
            resp.on('data', (chunk) => {
                data += chunk;
                console.log(data);
            });
            resp.on('end', () =>{
                //Do nothing for now.
                console.log("inside end");
            });
        }).on("error", (err) =>{
            //Do nothing for now.
            console.log(err);
        });

        speechText = "Turning on " + area +" "+device;
        this.emit(':tell', speechText);     
    },
    "TurnOff": function () {
        var intentObj = this.event.request.intent;
        var area = intentObj.slots.Area.value;
        var device = intentObj.slots.Device.value;
        var speechText = "";

        //send Request to my Raspberry pi running on my home network.

        http.get(raspConnectionURL+'/LightOff', (resp) => {  //URL has been masked for saftey and privacy.

            let data = '';
            //A Chunk of data has been received.
            resp.on('data', (chunk) => {
                data += chunk;
                console.log(data);
            });
            resp.on('end', () =>{
                //Do nothing for now.
                console.log("inside end");
            });
        }).on("error", (err) =>{
            //Do nothing for now.
            console.log(err);
        });

        speechText = "Turning off " + area +" "+device;
        this.emit(':tell', speechText);     
    },
    "Status": function () {
        var intentObj = this.event.request.intent;
        var area = intentObj.slots.Area.value;
        var device = intentObj.slots.Device.value;
        var speechText = "";
        var status = "off";
        //send Request to my Raspberry pi running on my home network.

        http.get(raspConnectionURL+'/Status', (resp) => {  //URL has been masked for saftey and privacy.

            let data = '';
            //A Chunk of data has been received.
            resp.on('data', (chunk) => {
                data += chunk;
                console.log(data);
            });
            resp.on('end', () =>{
                //Do nothing for now.
                console.log("inside end");
            });
        }).on("error", (err) =>{
            //Do nothing for now.
            console.log(err);
        });

        speechText = "Status of " + area +" "+device+" is "+status;
        this.emit(':tell', speechText);     
    }

};



exports.handler = function (event, context) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = "amzn1.ask.skill.5bde0db0-8e9c-4ac8-ba80-c86e724d66bc";
    alexa.registerHandlers(handlers);
    alexa.execute();
};
