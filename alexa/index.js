const Alexa = require('alexa-sdk');
const axios = require('axios');

const APP_ID = process.env.ALEXA_APP_ID;

const skillName = 'SousAIs';


const handlers = {
  LaunchRequest() {
    const speechText = 'My name is Sue! Tell me what your cuisine preferences are so that we can start cooking!';
    const repromptText = 'For instructions on what you can say, please say help me.';
    this.emit(':ask', speechText, repromptText);
  },

  async GetRecipe() {
    try {
      const res = await axios.get('http://sousais.herokuapp.com/api/recipe/alexa');
      const recipes = await res.data;
      const { image, steps } = recipes;
      const speechOutput = `I found a ${recipes.name} recipe. Would you like me to tell you how to make it?`;
      this.emit(':tellWithCard', speechOutput, recipes.name, steps.split('$$').join(' '), {
        smallImageUrl: image,
        largeImageUrl: image,
      });
    } catch (e) {
      console.error(e);
    }
  },

  AboutIntent() {
    const speechOutput = 'SousAIs is the greatest Alexa skill ever';
    this.emit(':tellWithCard', speechOutput, skillName, speechOutput);
  },
  'AMAZON.HelpIntent': function () {
    let speechOutput = '';
    speechOutput += 'Here are some things you can say: ';
    speechOutput += 'Tell me something interesting about Java. ';
    speechOutput += 'Tell me about the skill developer. ';
    speechOutput += "You can also say stop if you're done. ";
    speechOutput += 'So how can I help?';
    this.emit(':ask', speechOutput, speechOutput);
  },

  'AMAZON.StopIntent': function () {
    const speechOutput = 'Goodbye';
    this.emit(':tell', speechOutput);
  },

  'AMAZON.CancelIntent': function () {
    const speechOutput = 'Goodbye';
    this.emit(':tell', speechOutput);
  },

};

exports.handler = function (event, context) {
  const alexa = Alexa.handler(event, context);
  alexa.appId = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};
