/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');
const ddbAdapter = require('ask-sdk-dynamodb-persistence-adapter'); 

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
  "Stop": "https://thinktwice3.s3-eu-west-1.amazonaws.com/Stop/GoodbyeWithBackEdside.mp4",
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

const input = require('./input');

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.session.new ||
      handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    async handle(handlerInput) {
    let attributesManager = handlerInput.attributesManager;
    let attributes = await attributesManager.getPersistentAttributes() || {};
    if (Object.keys(attributes).length === 0) {
      attributes.gamesPlayed = 0;
      attributes.endedSessionCount = 0;
      attributes.badge = 0;
      attributes.level = 1;
      attributes.score = 0;
      attributes.question = 0;
      attributes.questionCount = 0;
      attributes.clueCount=0;
      attributes.gameState = 'ENDED';
    }
    attributesManager.setSessionAttributes(attributes);

    let repromptArr = [];
    repromptArr.push(input.MAIN_MESSAGE);
    repromptArr.push(input.REPROMPT);
    let reprompt = await convertArrayToSpeech(repromptArr);

    let speechArr = []; 
    if(attributes.gamesPlayed > 0){
      speechArr.push(input.WELCOME_BACK);
      speechArr.push(`You have played ${attributes.gamesPlayed.toString()} times and you are currently a Level ${attributes.level.toString()} Memory Master with ${attributes.badge.toString()} memory masters medals`);
    }else{
      speechArr.push(input.WELCOME);
    }
    let speechOutput = await convertArrayToSpeech(speechArr)+' '+reprompt;

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
      .speak(speechOutput)
      .reprompt(reprompt)
      .getResponse();
  },
};

const RulesIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'RulesIntent';
  },
  async handle(handlerInput) {
    let attributesManager = handlerInput.attributesManager;
    let responseBuilder = handlerInput.responseBuilder;
    let attributes = await attributesManager.getSessionAttributes();
    let repromptArr = [];
    repromptArr.push(input.GAME_RULES_REPROMPT);
    let reprompt = await convertArrayToSpeech(repromptArr);
    let speechText = await convertArrayToSpeech(input.GAME_RULES)+reprompt;
    
    attributes.gameState = 'RULES';
    attributesManager.setSessionAttributes(attributes);

    if (supportsDisplay(handlerInput)) {
      let image = new Alexa.ImageHelper()
        .getImage();
      let bgImage = new Alexa.ImageHelper()
        .getImage();
      const bodyTemplate = 'BodyTemplate3';
      responseBuilder.addRenderTemplateDirective({
        type: bodyTemplate,
        backButton: 'hidden',
        backgroundImage: bgImage,
        image
      });
    }

    return responseBuilder
      .speak(speechText)
      .reprompt(reprompt)
      .getResponse();
  },
};

const PlayIntentHandler = {
  canHandle(handlerInput) {
    let startGame = false;

    const request = handlerInput.requestEnvelope.request;
    const attributesManager = handlerInput.attributesManager;
    const sessionAttributes = attributesManager.getSessionAttributes();

    if (sessionAttributes.gameState &&  
        (sessionAttributes.gameState === 'RULES' || sessionAttributes.gameState === 'CLUES')) {
      startGame = true;
    }

    return request.type === 'IntentRequest' && 
      (request.intent.name === 'PlayIntent' || 
        (startGame && request.intent.name === 'AMAZON.YesIntent'));
    },
    async handle(handlerInput) {
    let { requestEnvelope, attributesManager} = handlerInput;
    let sessionAttributes = attributesManager.getSessionAttributes();
    sessionAttributes.gameState = 'PLAY';

    let level = sessionAttributes.level;
    let speechText = '';
    let reprompt = '';
    let speechArr = [];
    let VIDEOURL = [];

    if(level>input.INPUT_DATA.length){
      speechArr.push(input.COMPLETED_ALL_LEVELS);
      speechArr.push(input.COMPLETED_ALL_LEVELS_UPDATE);
      speechArr.push();
      speechText = await convertArrayToSpeech(speechArr);
      
      sessionAttributes.questionCount = 0;
      sessionAttributes.clueCount=0;
      sessionAttributes.endedSessionCount += 1;
      sessionAttributes.gameState = 'ENDED';
      attributesManager.setPersistentAttributes(sessionAttributes);
      await attributesManager.savePersistentAttributes();

   if (supportsAPL(handlerInput)) {
        handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            document: require('./Play.json'),
            datasources: {
              "thinkTwiceData": {
                "properties": {
                  "video": VIDEO_URLS,

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
    }else{
      let round = input.INPUT_DATA[level-1];
      if(sessionAttributes.gameState === 'ENDED' || sessionAttributes.gameState === 'CLUES' || (sessionAttributes.questionCount == 0)){
        let question = 0; 
        speechArr.push(`Your Level ${level.toString()} is category ${round.Round}`);
        speechArr.push(`Lets get started with ${round.Round}`);
        speechText = await convertArrayToSpeech(speechArr)+await convertArrayToSpeech(round.Description);
       
        speechArr = [];
        speechArr.push(input.START_ANSWERS_MESSAGE_PROMPT);
        speechArr.push(`Let's now go through the answers from ${round.Round}`);
        speechArr.push(`You can ask me for a clue if you need to answer the question`);
        speechArr.push(`Here is your question. ${round.Subquestion[question].Question}`);
        
        speechText = speechText + await convertArrayToSpeech(speechArr);
        reprompt = await convertArrayToSpeech(input.GAME_PLAY_REPROMPT);
        
        sessionAttributes.question = question;
        sessionAttributes.questionCount = 1;
        sessionAttributes.clueCount=0;
        sessionAttributes.score=0;
      } else {
        let question = sessionAttributes.question;
        if(requestEnvelope.request.intent.slots && 'answer' in requestEnvelope.request.intent.slots){
          let answer = requestEnvelope.request.intent.slots.answer.value;
          if(answer.toLowerCase() === round.Subquestion[question].Answer.toLowerCase()){
            sessionAttributes.score += (25-(10*sessionAttributes.clueCount));
            sessionAttributes.clueCount=0;
            speechArr.push(input.ANSWER_CORRECT_MESSAGE);
            let questionCount = sessionAttributes.questionCount;
  
            if(questionCount <= 4){
              let question = Math.floor(Math.random() * (round.Subquestion.length - 0) + 0);
      
              speechArr.push(input.NEXT_QUESTION_PROMPT);
              speechArr.push(`Here is your question. ${round.Subquestion[question].Question}`);
        
              sessionAttributes.question = question;
              sessionAttributes.questionCount += 1;
            }else{
              speechArr.push(input.ROUND_COMPLETE_PROMPT);
              speechArr.push("your score is "+sessionAttributes.score);
      
              if(sessionAttributes.score > 50){
                level += 1;
                let badge = (Math.floor((sessionAttributes.score/20)-2));
                sessionAttributes.badge += badge;
                
                speechArr.push("You have progressed to "+level+" level.");
                speechArr.push("and You have won a "+badge+ " medal, your total medal count is "+sessionAttributes.badge);
                speechArr.push("Would you like to play level "+level+"?");
      
                sessionAttributes.level = level;
              }else{
                speechArr.push(input.PLAY_AGAIN_PROMPT);
              }
              sessionAttributes.gamesPlayed += 1;
              sessionAttributes.gameState = 'CLUES';
              sessionAttributes.questionCount = 0;
            }
          } else {
            speechArr.push("Oh oh. "+answer+" is incorrect");
            speechArr = speechArr.concat(await getClue(attributesManager, sessionAttributes));
          }
        }else{
          speechArr.push("Alright, lets come back.");
          speechArr.push(`Here is your question. ${round.Subquestion[question].Question}`);
        }
        speechText = await convertArrayToSpeech(speechArr);
        reprompt = speechText;
      }
    }
    attributesManager.setSessionAttributes(sessionAttributes);
    
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

const CluesIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'CluesIntent';
  },
  async handle(handlerInput) {
    let { attributesManager} = handlerInput;
    let sessionAttributes = attributesManager.getSessionAttributes();
    let speechText;
    if(sessionAttributes.gameState === 'PLAY' || sessionAttributes.gameState === 'CLUES'){
      let speechArr = await getClue(attributesManager, sessionAttributes);
      speechText = await convertArrayToSpeech(speechArr);
    }else{
      speechText = input.EARLY_CLUE_PROMPT;
    }
    
      if (supportsAPL(handlerInput)) {
        handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            document: require('./launch.json'),
            datasources: {
              "thinkTwiceData": {
                "properties": {
                  "video": VIDEO_URLS['YesPlay'],
                }
              }
            }
        });
    }
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt()
      .withSimpleCard('Think Twice')
      .getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'HelpIntent'

      || (handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
          && handlerInput.requestEnvelope.request.arguments.length > 0
          && handlerInput.requestEnvelope.request.arguments[0] === 'help');
  },
  handle(handlerInput) {
    const speechText = "<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/Help/Help.mp3'/> ";
    const reprompt = "";

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

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    let endGame = false;

    const request = handlerInput.requestEnvelope.request;
    const attributesManager = handlerInput.attributesManager;
    const sessionAttributes = attributesManager.getSessionAttributes();

    if (sessionAttributes.gameState && 
        (sessionAttributes.gameState === 'RULES'|| sessionAttributes.gameState === 'CLUES')) {
      endGame = true;
    }

    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent') ||
        (endGame && request.intent.name === 'AMAZON.NoIntent')
        
        || (handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
        && handlerInput.requestEnvelope.request.arguments.length > 0
        && handlerInput.requestEnvelope.request.arguments[0] === 'stop');
  },
  async handle(handlerInput) {
    const attributesManager = handlerInput.attributesManager;
    const sessionAttributes = attributesManager.getSessionAttributes();

    sessionAttributes.questionCount = 0;
    sessionAttributes.endedSessionCount += 1;
    sessionAttributes.gameState = 'ENDED';
    attributesManager.setPersistentAttributes(sessionAttributes);
    await attributesManager.savePersistentAttributes();

    let speechArr = [];
    speechArr.push(input.FINISH);

    let speechText = input.FINISH;
      if (supportsAPL(handlerInput)) {
        handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            document: require('./Stop.json'),
            datasources: {
              "thinkTwiceData": {
                "properties": {
                  "video": VIDEO_URLS['Stop'],
                }
              }
            }
        });
    }
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Think Twice')
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

      let speechText = input.ERROR_HANDLER;
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
      .reprompt(speechText)
      .withSimpleCard('Think Twice')
      .getResponse();
  },
};

const FallbackHandler = {
  canHandle(handlerInput) {
    // handle fallback intent, yes and no when playing a game
    // for yes and no, will only get here if and not caught by the normal intent handler
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' &&
      (request.intent.name === 'AMAZON.FallbackIntent' ||
        request.intent.name === 'RulesIntent' ||
        request.intent.name === 'PlayIntent' ||
        request.intent.name === 'CluesIntent');
  },
  handle(handlerInput) {
    const attributesManager = handlerInput.attributesManager;
    const sessionAttributes = attributesManager.getSessionAttributes();

    if (sessionAttributes.gameState &&
      sessionAttributes.gameState === 'PLAY') {
      
        if (supportsAPL(handlerInput)) {
        handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            document: require('./launch.json'),
            datasources: {
              "thinkTwiceData": {
                "properties": {
                  "video": VIDEO_URLS['YesPlay'],

                }
              }
            }
        });
    }
  return handlerInput.responseBuilder
    .speak(input.FALLBACK_MESSAGE_OUTSIDE_GAME)
    .reprompt(input.FALLBACK_REPROMPT_OUTSIDE_GAME)
    .getResponse();
    }
    if (supportsAPL(handlerInput)) {
      handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            document: require('./Play.json'),
            datasources: {
              "thinkTwiceData": {
                "properties": {
                  "video": VIDEO_URLS['YesPlay']
                }
              }
            }
        });
    }
    return handlerInput.responseBuilder
      .speak(input.FALLBACK_MESSAGE_OUTSIDE_GAME)
      .reprompt(input.FALLBACK_REPROMPT_OUTSIDE_GAME)
      .getResponse();
  },
};

async function getClue(attributesManager, sessionAttributes){
  let level = sessionAttributes.level;
  let round = input.INPUT_DATA[level-1];
  let question = sessionAttributes.question;
  let clueCount = sessionAttributes.clueCount;
  
  let speechArr = [];

  if(clueCount<2){
    speechArr.push(input.CLUE_PROMPT);
    speechArr.push(round.Subquestion[question].Clues[clueCount]);
    sessionAttributes.clueCount += 1; 
  } else{
    sessionAttributes.clueCount=0;
    let questionCount = sessionAttributes.questionCount;
    speechArr.push(input.NO_CLUES_LEFT);

    if(questionCount < 4){
      let question = Math.floor(Math.random() * (round.Subquestion.length - 0) + 0);

      speechArr.push(input.NEXT_QUESTION_PROMPT);
      speechArr.push(`Here is your question. ${round.Subquestion[question].Question}`);

      sessionAttributes.question = question;
      sessionAttributes.questionCount += 1;
    }else{
      speechArr.push(input.FOUR_QUESTIONS_COMPLETE);
      speechArr.push("your score is "+sessionAttributes.score);

      if(sessionAttributes.score > 50){
        level += 1;
        let badge = (Math.floor((sessionAttributes.score/20)-2));
        sessionAttributes.badge += badge;
        
        speechArr.push("You have moved to "+level);
        speechArr.push("and You have won "+badge+ " badge, your total badge is "+sessionAttributes.badge);
        speechArr.push("Do you want to play level "+level+"?");

        sessionAttributes.level = level;
      }else{
        speechArr.push(input.PLAY_AGAIN_PROMPT);
      }
      sessionAttributes.gamesPlayed += 1;
      sessionAttributes.questionCount = 0;
    } 
  }
  sessionAttributes.gameState = 'CLUES';
  attributesManager.setSessionAttributes(sessionAttributes);
  return speechArr;
}

async function convertArrayToSpeech(textArray){
  let speechOutput = '';
  for (var i = 0; i < textArray.length;i++){
    speechOutput = speechOutput + textArray[i]+" <break time=\"1s\"/> ";
  }
  return speechOutput;
}

async function convertArraytoVideo(VideoArray){
  let speechOutput = '';
  for (var i = 0; i <VideoArray.length;i++){
    speechOutput = speechOutput + VideoArray[i]+""
  }
}

//DynamoDB Settings
function getPersistenceAdapter(tableName) {
  if (process.env.S3_PERSISTENCE_BUCKET) {
    const s3Adapter = require('ask-sdk-s3-persistence-adapter');
    return new s3Adapter.S3PersistenceAdapter({
      bucketName: process.env.S3_PERSISTENCE_BUCKET,
    });
  }
  return new ddbAdapter.DynamoDbPersistenceAdapter({
    tableName: tableName,
    createTable: true,
  });
}

//Use Display inclusion if just wanting to have display pictures for game (Code not included on intents for this skill)
function supportsDisplay(handlerInput) {
  const hasDisplay =
    handlerInput.requestEnvelope.context &&
    handlerInput.requestEnvelope.context.System &&
    handlerInput.requestEnvelope.context.System.device &&
    handlerInput.requestEnvelope.context.System.device.supportedInterfaces &&
    handlerInput.requestEnvelope.context.System.device.supportedInterfaces.Display;
  return hasDisplay;
}
//Use APL inclusion if wanting to include video/sound/pictures etc for your skill
function supportsAPL(handlerInput) {
    const supportedInterfaces = handlerInput.requestEnvelope.context.System.device.supportedInterfaces;
    const aplInterface = supportedInterfaces['Alexa.Presentation.APL'];
    return aplInterface != null && aplInterface != undefined;
}


const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .withPersistenceAdapter(getPersistenceAdapter(input.ddbTableName))
  .addRequestHandlers(
    LaunchRequestHandler,
    RulesIntentHandler,
    InstructionsIntentHandler,
    PlayIntentHandler,
    CluesIntentHandler,
    FallbackHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
