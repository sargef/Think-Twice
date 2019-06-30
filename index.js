'use strict';

const Alexa = require('ask-sdk');
const ddbAdapter = require('ask-sdk-dynamodb-persistence-adapter'); 

const SKILL_NAME = 'Think Twice';
const ddbTableName = 'Think-Twice-Game';
const FALLBACK_MESSAGE_DURING_GAME = " <voice name='Matthew'> ` ${SKILL_NAME} can't help you with that question. ` </voice>";
const FALLBACK_REPROMPT_DURING_GAME = "<voice name='Matthew'> 'You have not given me any answers to this round yet. Please tell me your answers.'</voice>";
const FALLBACK_MESSAGE_OUTSIDE_GAME = " <voice name='Matthew'> ` ${SKILL_NAME} can't help you with that question. Please tell me your answers for this round. ` </voice>";
const FALLBACK_REPROMPT_OUTSIDE_GAME = " <voice name='Matthew'> Say yes to start the game or no to quit.' </voice>";

const VIDEO_URLS = {
  "OneRoundOne": "https://thinktwice3.s3-eu-west-1.amazonaws.com/School+Swoop/SchooSwoopVid.mp4",
  "TwoRoundOne": "https://thinktwice3.s3-eu-west-1.amazonaws.com/PartyTrick/Round1PartyTrickVid.mp4",
  "OneRoundTwo": "https://thinktwice3.s3-eu-west-1.amazonaws.com/ConcertMania/Round2ConcertMania.mp4",
  "TwoRoundTwo": "https://thinktwice3.s3-eu-west-1.amazonaws.com/ShoppingShark/Round2ShoppingShark.mp4",
  "OneRoundThree": "https://thinktwice3.s3-eu-west-1.amazonaws.com/PlanetaryAttack/Round2PlanetaryAttackVid.mp4",
  "TwoRoundThree": "https://thinktwice3.s3-eu-west-1.amazonaws.com/DiaryDash/Round3DiaryDashVid.mp4",
  "OneRoundFour": "https://thinktwice3.s3-eu-west-1.amazonaws.com/ChemistryQuiz/Round4ChemistryQuiz.mp4",
  "TwoRoundFour": "https://thinktwice3.s3-eu-west-1.amazonaws.com/ApptAppeal/Round4ApptAppealVid.mp4",
  "RoundGold": "https://thinktwice3.s3-eu-west-1.amazonaws.com/Medals/GoldMedalWinnerVid.mp4",
  "RoundSilver": "https://thinktwice3.s3-eu-west-1.amazonaws.com/Medals/SilverMedalVid.mp4",
  "RoundBronze": "https://thinktwice3.s3-eu-west-1.amazonaws.com/Medals/BronzeMedalVid.mp4",
  "Home": "https://thinktwice3.s3-eu-west-1.amazonaws.com/Vids/WelcomeVid.mp4",
  "Stop": "https://thinktwice3.s3-eu-west-1.amazonaws.com/Stop/GoodbyeVid.mp4"
};


const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest'

      || (handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'ReturnHomeIntent')
        
      || (handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
          && handlerInput.requestEnvelope.request.arguments.length > 0
          && handlerInput.requestEnvelope.request.arguments[0] === 'home');
  
   },
   
  async handle(handlerInput) {
    const attributesManager = handlerInput.attributesManager;
    const responseBuilder = handlerInput.responseBuilder;

    const attributes = await attributesManager.getPersistentAttributes() || {};
    if (Object.keys(attributes).length === 0) {
      attributes.endedSessionCount = 0;
      attributes.gamesPlayed = 0;
      attributes.gameState = 'ENDED';
    }

    attributesManager.setSessionAttributes(attributes);

    const speechOutput = "<voice name='Matthew'> `Welcome to Think Twice. You have played ${attributes.gamesPlayed.toString()} times. Are you ready to play to better your score?` </voice>";
    const reprompt = "<voice name='Matthew'> 'Say yes to start the game' </voice>";
      .speak(speechOutput)
      .reprompt(reprompt)
      .getResponse();
  },

  handle(handlerInput) {
    const speechText = "<audio src=''></audio>";

    if (supportsAPL(handlerInput)) {
        handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            document: require('./launch.json'),
            datasources: {
              "thinkTwiceData": {
                "properties": {
                  "video": VIDEO_URLS['Home']
                }
              }
            }
        });
    }

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt()
      .withSimpleCard('Think Twice', speechText)
      .getResponse();
  },
};

const YesIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.YesIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'BeginIntent');
  },
  handle(handlerInput) {
      
    if (supportsAPL(handlerInput)) {
      handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            document: require('./Yes.json'),
            datasources: {
              "thinkTwiceData": {
                "properties": {
                  "video": VIDEO_URLS['Yes']
                }
              }
            }
        });
    }
      
      
    return handlerInput.responseBuilder
      .speak(Yes)
      .reprompt(Yes)
      .withSimpleCard('Think Twice', Yes)
      .getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
      
    if (supportsAPL(handlerInput)) {
      handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            document: require('./Help.json'),
            datasources: {
              "thinkTwiceData": {
                "properties": {
                  "video": VIDEO_URLS['Help']
                }
              }
            }
        });
    }
      
      
    return handlerInput.responseBuilder
      .speak(HELP)
      .reprompt(HELP)
      .withSimpleCard('Think Twice', HELP)
      .getResponse();
  },
};

const AnswerIntent = {
  canHandle(handlerInput) {
    // handle numbers only during a game
    let isCurrentlyPlaying = false;
    const request = handlerInput.requestEnvelope.request;
    const attributesManager = handlerInput.attributesManager;
    const sessionAttributes = attributesManager.getSessionAttributes();

    if (sessionAttributes.gameState &&
      sessionAttributes.gameState === 'STARTED') {
      isCurrentlyPlaying = true;
    }

    return isCurrentlyPlaying && request.type === 'IntentRequest' && request.intent.name === 'AnswerIntent';
  },
  async handle(handlerInput) {
    const { requestEnvelope, attributesManager, responseBuilder } = handlerInput;

    const guess = parseInt(requestEnvelope.request.intent.slots.number.value, 10);
    const sessionAttributes = attributesManager.getSessionAttributes();
    const target = sessionAttributes.guess;

    if (guess > target) {
      return responseBuilder
        .speak(`${guess.toString()} is incorrect.`)
        .reprompt('Try saying a smaller number.')
        .getResponse();
    } else if (guess < target) {
      return responseBuilder
        .speak(`${guess.toString()} is incorrect.`)
        .reprompt('Please tell me the other items.')
        .getResponse();
    } else if (guess === target) {
      sessionAttributes.gamesPlayed += 1;
      sessionAttributes.gameState = 'ENDED';
      attributesManager.setPersistentAttributes(sessionAttributes);
      await attributesManager.savePersistentAttributes();
      return responseBuilder
        .speak(`${guess.toString()} is correct! Time for round ${round.toString()}`)
        .reprompt('Say yes to start a new game.')
        .getResponse();
    }
    return handlerInput.responseBuilder
      .speak('Sorry, I didn\'t get that. Please tell me your answers.')
      .reprompt('Please Tell me what your answers are for this round.')
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NoIntent');
  },
  handle(handlerInput) {
    const speechText = "<audio src=''></audio>";

    if (supportsAPL(handlerInput)) {
        handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            document: require('./stop.json'),
            datasources: {
              "thinkTwiceData": {
                "properties": {
                  "video": VIDEO_URLS['Stop']
                }
              }
            }
        });
    }

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt()
      .withSimpleCard('Think Twice', speechText)
      .getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

function supportsAPL(handlerInput) {
    const supportedInterfaces = handlerInput.requestEnvelope.context.System.device.supportedInterfaces;
    const aplInterface = supportedInterfaces['Alexa.Presentation.APL'];
    return aplInterface != null && aplInterface != undefined;
}

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    YesIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .withApiClient(new Alexa.DefaultApiClient())
  .lambda();
