var Alexa = require('alexa-sdk');

const skillName = "Veera DIY Home Automation";

var handlers = {

    "LanguageIntent": function () {
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
        var speechOutput = "";
        if(this.event.request.intent.slots.Language.value && this.event.request.intent.slots.Language.value.toLowerCase() == "java") {
            speechOutput = Data.java[getRandomInt(0, 2)];
        } else if(this.event.request.intent.slots.Language.value && this.event.request.intent.slots.Language.value.toLowerCase() == "ionic framework") {
            speechOutput = Data.ionic[getRandomInt(0, 3)];
        } else {
            speechOutput = "I don't have anything interesting to share regarding what you've asked."
        }
        this.emit(':tellWithCard', speechOutput, skillName, speechOutput);
    },

    "AboutIntent": function () {
        var speechOutput = "Veera is home automation assistant to help iot enthusiasts to build iot devices and integrat with Alexa quickly.";
        this.emit(':tellWithCard', speechOutput, skillName, speechOutput);
    },

    "AMAZON.HelpIntent": function () {
        var speechOutput = "";
        speechOutput += "Here are some things you can say: ";
        speechOutput += "Tell me something interesting about Java. ";
        speechOutput += "Tell me about the skill developer. ";
        speechOutput += "You can also say stop if you're done. ";
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
        speechText += "You can ask Veera to manage your home applicances. ";
        this.emit(':tell', speechText);
    },
    "TurnOn": function () {
        var intentObj = this.event.request.intent;
        var area = intentObj.slots.Area.value;
        var device = intentObj.slots.Device.value;
        var speechText = "";
        speechText += "Welcome to " + skillName + ". ";
        speechText += "You can ask Veera to manage your home applicances.";
        speechText += "Did you mean turn on" + area + device;
        this.emit(':tell', speechText);
    }

};

exports.handler = function (event, context) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = "amzn1.ask.skill.5bde0db0-8e9c-4ac8-ba80-c86e724d66bc";
    alexa.registerHandlers(handlers);
    alexa.execute();
};
