'use strict';

const Alexa = require('ask-sdk-core');

const VIDEO_URLS = {
  "OneRoundOne": "https://thinktwice3.s3-eu-west-1.amazonaws.com/School+Swoop/SchoolSwoopWithBackEd.mp4",
  "TwoRoundOne": "https://thinktwice3.s3-eu-west-1.amazonaws.com/PartyTrick/PartyTrickWithBackEd.mp4",
  "OneRoundTwo": "https://thinktwice3.s3-eu-west-1.amazonaws.com/ConcertMania/ConcertManiaWithBackEd.mp4",
  "TwoRoundTwo": "https://thinktwice3.s3-eu-west-1.amazonaws.com/ShoppingShark/ShoppingSharkWithBackEd.mp4",
  "OneRoundThree": "https://thinktwice3.s3-eu-west-1.amazonaws.com/PlanetaryAttack/PlanetaryAttackWithBackEd.mp4",
  "TwoRoundThree": "https://thinktwice3.s3-eu-west-1.amazonaws.com/DiaryDash/DiaryDashWithBackEd.mp4",
  "OneRoundFour": "https://thinktwice3.s3-eu-west-1.amazonaws.com/ChemistryQuiz/ChemistryQuizWithBackEd.mp4",
  "TwoRoundFour": "https://thinktwice3.s3-eu-west-1.amazonaws.com/ApptAppeal/ApptAppealWithBackEd.mp4",
  "RoundGold": "https://thinktwice3.s3-eu-west-1.amazonaws.com/MedalsWithBack/GoldMedalWithBack.mp4",
  "RoundSilver": "https://thinktwice3.s3-eu-west-1.amazonaws.com/MedalsWithBack/SilverMedalWithBack.mp4",
  "RoundBronze": "https://thinktwice3.s3-eu-west-1.amazonaws.com/MedalsWithBack/BronzeMedalWithBack.mp4",
  "Home": "https://thinktwice3.s3-eu-west-1.amazonaws.com/WelcomeAndStartReprompt/WelcomeWithBackEd.mp4",
  "Instructions": "https://thinktwice3.s3-eu-west-1.amazonaws.com/Instructions/InstructionsWithBackEd.mp4",
  "YesPlay": "https://thinktwice3.s3-eu-west-1.amazonaws.com/YesPlay/YesPlayWithBack.mp4",
  "Stop": "https://thinktwice3.s3-eu-west-1.amazonaws.com/Stop/Goodbyewithbackandclip.mp4",
  "Help": "https://thinktwice3.s3-eu-west-1.amazonaws.com/Help/HelpWithBackEd.mp4"
};

const AUDIO_URLS = {
  "OneRoundOne": "https://thinktwice3.s3-eu-west-1.amazonaws.com/School+Swoop/schooswoop1.mp3" + "https://thinktwice3.s3-eu-west-1.amazonaws.com/School+Swoop/schoolswoop2.mp3",
  "TwoRoundOne": "https://thinktwice3.s3-eu-west-1.amazonaws.com/PartyTrick/Round1PartyTrickEntireSounds.mp3",
  "OneRoundTwo": "https://thinktwice3.s3-eu-west-1.amazonaws.com/ConcertMania/Round2ConcertManiaAllSounds.mp3",
  "TwoRoundTwo": "https://thinktwice3.s3-eu-west-1.amazonaws.com/ShoppingShark/Round2ShoppingSharkAll.mp3",
  "OneRoundThree": "https://thinktwice3.s3-eu-west-1.amazonaws.com/PlanetaryAttack/Round3PlanetaryAttackAll.mp3",
  "TwoRoundThree": "https://thinktwice3.s3-eu-west-1.amazonaws.com/DiaryDash/Round3DiaryDashPart1all.mp3"+ "https://thinktwice3.s3-eu-west-1.amazonaws.com/DiaryDash/Round3DiaryDashpart2all.mp3",
  "OneRoundFour": "https://thinktwice3.s3-eu-west-1.amazonaws.com/ChemistryQuiz/Round4ChemistryQuizAll.mp3",
  "TwoRoundFour": "https://thinktwice3.s3-eu-west-1.amazonaws.com/ApptAppeal/Round4ApptAppealPart1All.mp3" + "https://thinktwice3.s3-eu-west-1.amazonaws.com/ApptAppeal/Round4ApptAppealAllpart2.mp3",
  "RoundGold": "https://thinktwice3.s3-eu-west-1.amazonaws.com/Medals/GoldMedalAll.mp3",
  "RoundSilver": "https://thinktwice3.s3-eu-west-1.amazonaws.com/Medals/SilverMedalAll.mp3",
  "RoundBronze": "https://thinktwice3.s3-eu-west-1.amazonaws.com/Medals/BronzeMedalAll.mp3",
  "Home": "https://thinktwice3.s3-eu-west-1.amazonaws.com/Vids/welcomeintroentiresounds.mp3",
  "GameReprompt": "https://thinktwice3.s3-eu-west-1.amazonaws.com/WelcomeAndStartReprompt/BeginReprompt.mp3",
  "Instructions": "https://thinktwice3.s3-eu-west-1.amazonaws.com/Instructions/Instructions.mp3",
  "YesPlay": "https://thinktwice3.s3-eu-west-1.amazonaws.com/YesPlay/StartYes.mp3",
  "Stop": "https://thinktwice3.s3-eu-west-1.amazonaws.com/Stop/StopCancel.mp3",
  "Help": "https://thinktwice3.s3-eu-west-1.amazonaws.com/Help/Help.mp3",
  "HelpReprompt":"https://thinktwice3.s3-eu-west-1.amazonaws.com/WelcomeAndStartReprompt/BeginReprompt.mp3"
};

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest'

      || (handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'HomeIntent')
        
      || (handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
          && handlerInput.requestEnvelope.request.arguments.length > 0
          && handlerInput.requestEnvelope.request.arguments[0] === 'home');
        
  },
  handle(handlerInput) {
    const speechText = "<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/Vids/welcomeintroentiresounds.mp3'></audio>";
    const reprompt = "<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/WelcomeAndStartReprompt/BeginReprompt.mp3' />";

    if (supportsAPL(handlerInput)) {
        handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            document: require('./launch.json'),
            datasources: {
              "thinkTwiceData": {
                "properties": {
                  "video": VIDEO_URLS['Home'],

                }
              }
            }
        });
    }

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(reprompt)
      .withSimpleCard('Think Twice')
      .getResponse();
  },
};

const InstructionsIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'InstructionsIntent'

      || (handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
          && handlerInput.requestEnvelope.request.arguments.length > 0
          && handlerInput.requestEnvelope.request.arguments[0] === 'instructions');
  },
  handle(handlerInput) {
    const speechText = "<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/Instructions/Instructions.mp3'/>";
    const InstructionsReprompt = "<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/WelcomeAndStartReprompt/BeginReprompt.mp3' />";

    if (supportsAPL(handlerInput)) {
      handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            document: require('./Instructions.json'),
            datasources: {
              "thinkTwiceData": {
                "properties": {
                  "video": VIDEO_URLS['Instructions']
                }
              }
            }
        });
    }
    
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(InstructionsReprompt)
      .withSimpleCard('Think Twice')
      .getResponse();
  },
};



const YoungandSlickIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'YoungandSlickIntent'

      || (handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
          && handlerInput.requestEnvelope.request.arguments.length > 0
          && handlerInput.requestEnvelope.request.arguments[0] === 'youngandslick');
  },
  handle(handlerInput) {
    const speechText = "<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/School+Swoop/schooswoop1.mp3'/> "
      + "<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/School+Swoop/schoolswoop2.mp3'/>";
    const gameReprompt = "<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/WelcomeAndStartReprompt/BeginReprompt.mp3' />";

    if (supportsAPL(handlerInput)) {
      handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            document: require('./catOne.json'),
            datasources: {
              "thinkTwiceData": {
                "properties": {
                  "video": VIDEO_URLS['OneRoundOne']
                }
              }
            }
        });
    }
    
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(gameReprompt)
      .withSimpleCard('Think Twice', speechText)
      .getResponse();
  },
};

const WildandWiseIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'WildandWiseIntent'

      || (handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
          && handlerInput.requestEnvelope.request.arguments.length > 0
          && handlerInput.requestEnvelope.request.arguments[0] === 'wildandwise');
  },
  handle(handlerInput) {
    const speechText = "<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/PartyTrick/ZMMLsHmi-round1partytrickentiresounds.mp3'/>";
    const gameReprompt = "<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/WelcomeAndStartReprompt/BeginReprompt.mp3' />";
    
    if (supportsAPL(handlerInput)) {
      handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            document: require('./catTwo.json'),
            datasources: {
              "thinkTwiceData": {
                "properties": {
                  "video": VIDEO_URLS['TwoRoundOne']
                }
              }
            }
        });
    }

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(gameReprompt)
      .withSimpleCard('Think Twice', speechText)
      .getResponse();
  },
};


const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZONHelpIntent'

      || (handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
          && handlerInput.requestEnvelope.request.arguments.length > 0
          && handlerInput.requestEnvelope.request.arguments[0] === 'help');
  },
  handle(handlerInput) {
    const speechText = "<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/School+Swoop/schooswoop1.mp3'/> ";
    const reprompt = "<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/WelcomeAndStartReprompt/BeginReprompt.mp3' />";

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
      .speak(speechText)
      .reprompt(reprompt)
      .withSimpleCard('Think Twice')
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
      || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent')

      || (handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
          && handlerInput.requestEnvelope.request.arguments.length > 0
          && handlerInput.requestEnvelope.request.arguments[0] === 'stop');
  },
  
  handle(handlerInput) {
  const response = handlerInput.responseBuilder;
  response.withShouldEndSession(true);
  
    const speechText = "<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/School+Swoop/schooswoop1.mp3'/> ";

    if (supportsAPL(handlerInput)) {
      handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            document: require('./Stop.json'),
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
      .withSimpleCard('Good Bye')
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

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say that again.')
      .reprompt('Sorry, I can\'t understand the command. Please say that again.')
      .getResponse();
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
    InstructionsIntentHandler,
    HelpIntentHandler,
    YoungandSlickIntentHandler,
    WildandWiseIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .withApiClient(new Alexa.DefaultApiClient())
  .lambda();
 
