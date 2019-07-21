/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');
const ddbAdapter = require('ask-sdk-dynamodb-persistence-adapter'); 
const input = require('./input');


const VIDEO_URLS_BY_ROUND_NAME = {
  "School Swoop":"https://thinktwice3.s3-eu-west-1.amazonaws.com/VIDEOALLLLLL/ProjectSchoolS.mp4",
  "Party Trick": "hhttps://thinktwice3.s3-eu-west-1.amazonaws.com/VIDEO/PartyTrickWithSilverMedalVIDEO.mp4",
  "Concert Mania": "https://thinktwice3.s3-eu-west-1.amazonaws.com/VIDEOALLLLLL/ConcertManiaPROJECT.mp4",
  "Shopping Shark": "https://thinktwice3.s3-eu-west-1.amazonaws.com/VIDEO/ShoppingSharkVIDEO.mp4",
  "Planetary Attack": "https://thinktwice3.s3-eu-west-1.amazonaws.com/VIDEOALLLLLL/PlanetaryAttackPROJECTX.mp4",
  "Diary Dash": "https://thinktwice3.s3-eu-west-1.amazonaws.com/VIDEO/DiaryDashVIDEO.mp4",
  "Chemistry Quiz": "https://thinktwice3.s3-eu-west-1.amazonaws.com/VIDEOALLLLLL/ChemistryQuizProject.mp4",
  "Appointment Appeal": "https://thinktwice3.s3-eu-west-1.amazonaws.com/VIDEO/ApptAppealVIDEO.mp4",
  "Gold": "https://thinktwice3.s3-eu-west-1.amazonaws.com/VIDEO/GoldMedalWithFireworksVIDEO.mp4"
  };

const VIDEO_URLS = {
  "RoundGold": "https://thinktwice3.s3-eu-west-1.amazonaws.com/MedalsWithBack/GoldMedalWithBack.mp4",
  "RoundSilver": "https://thinktwice3.s3-eu-west-1.amazonaws.com/NewLouderSounds/NN/SilverMedalNNVid.mp4",
  "RoundBronze": "https://thinktwice3.s3-eu-west-1.amazonaws.com/NewLouderSounds/NN/BronzeMedalNNVid.mp4",
  "Home": "https://thinktwice3.s3-eu-west-1.amazonaws.com/VIDEOALLLLLL/WelcomeProject.mp4",
  "Instructions": "https://thinktwice3.s3-eu-west-1.amazonaws.com/VIDEOALLLLLL/InstructionsPro.mp4",
  "YesPlay": "https://thinktwice3.s3-eu-west-1.amazonaws.com/YesPlay/YesPlayWithBack.mp4",
  "Stop": "https://thinktwice3.s3-eu-west-1.amazonaws.com/Stop/GoodbyeWithBackEdside.mp4",
  "Help": "https://thinktwice3.s3-eu-west-1.amazonaws.com/Help/HelpWithBackEd.mp4"
    };

const AUDIO_URLS = {

  "RoundGold": "https://thinktwice3.s3-eu-west-1.amazonaws.com/NewLouderSounds/NN/goldmedalnn.mp3",
  "RoundSilver": "https://thinktwice3.s3-eu-west-1.amazonaws.com/NewLouderSounds/NN/SS/silvermedalnnnn.mp3",
  "RoundBronze": "https://thinktwice3.s3-eu-west-1.amazonaws.com/NewLouderSounds/NN/SS/bronzemedalnnnn.mp3",
  };

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
      speechArr.push(`You have played ${attributes.gamesPlayed.toString()} times and you are currently a Level ${attributes.level.toString()} Memory Master`);
    }else{
      speechArr.push(input.WELCOME);
    }
    let speechOutput = await convertArrayToSpeech(speechArr)+' '+reprompt;

    if (supportsAPL(handlerInput)) {
        handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            document: require('./launch.json'),
            datasources : {
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
        (startGame && request.intent.name === 'AMAZON.YesIntent' 
        || handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'));
    },
    async handle(handlerInput) {
    let { requestEnvelope, attributesManager} = handlerInput;
    let sessionAttributes = attributesManager.getSessionAttributes();
    sessionAttributes.gameState = 'PLAY';

    let level = sessionAttributes.level;
    let speechText = '';
    let reprompt = '';
    let speechArr = [];

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
      
      if (sessionAttributes.level>9 || (sessionAttributes.level>8 && sessionAttributes.endedSessionCount+1)){
      sessionAttributes.questionCount = 0;
      sessionAttributes.clueCount=0;
      sessionAttributes.level = 1;
      sessionAttributes.badge = 0;
      sessionAttributes.score = 0;
      attributesManager.setPersistentAttibutes(sessionAttributes);
      await attributesManager.savePersistentAttributes();
   }
   if (supportsAPL(handlerInput)) {
      let roundName = input.INPUT_DATA[parseInt(sessionAttributes.level)-1].Round;
        handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            document: require('./Play.json'),
              datasources: {
              "thinkTwiceData": {
                "properties": {
                  "video": VIDEO_URLS_BY_ROUND_NAME[roundName],
                }
              }
            }
        });
   }
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(reprompt)
      .getResponse();
    }else{
      let round = input.INPUT_DATA[level-1];
      if(sessionAttributes.gameState === 'ENDED' || sessionAttributes.gameState === 'CLUES' || sessionAttributes.gameState === 'NEW' ||(sessionAttributes.questionCount == 0)){
        let question = 0; 
        speechArr.push(`Your Level ${level.toString()} category is ${round.Round}`);
        speechArr.push(`${randomSpeech(input.STARTED)}`);
        speechText = await convertArrayToSpeech(speechArr)+await convertArrayToSpeech(round.Description);
  
        speechArr = [];
        speechArr.push(input.START_ANSWERS_MESSAGE_PROMPT);
        speechArr.push(`Let's now go through the answers from ${round.Round}`);
        speechArr.push(`If you get the answer wrong, i will give you a clue to help. You get 2 available clues per question`);
        speechArr.push(`${round.Subquestion[question].Question}`);
        
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
            speechArr.push(`${randomSpeech(input.ANSWER_CORRECT_MESSAGE)}`);
            let questionCount = sessionAttributes.questionCount;
            
          if (questionCount <= 4){
          let question = Math.floor(Math.random() * (round.Subquestion.length - 0) + 0);
      
              speechArr.push(input.NEXT_QUESTION_PROMPT);
              speechArr.push(` ${round.Subquestion[question].Question}`);
        
              sessionAttributes.question = question;
              sessionAttributes.questionCount += 1;
            }else{
              speechArr.push(input.ROUND_COMPLETE_PROMPT);
              speechArr.push("your score is "+sessionAttributes.score+ " points");
      
              if(sessionAttributes.score > 50){
                level += 1;
                let badge = (Math.floor((sessionAttributes.score/20)-2));
                sessionAttributes.badge += badge;
                
                speechArr.push("<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/NewLouderSounds/NN/magiccash/cash-machine.mp3' />" + "You have progressed to level "+ level);
                speechArr.push("and You have won " +badge+ " achievement awards, your total achievement award count is "+sessionAttributes.badge);
                speechArr.push("Would you like to play level " +level+ "?");
      
                sessionAttributes.level = level;
              }else{
                speechArr.push(input.PLAY_AGAIN_PROMPT);
              }
              sessionAttributes.gamesPlayed += 1;
              sessionAttributes.gameState = 'CLUES';
              sessionAttributes.questionCount = 0;
            }
          } else {
            speechArr.push("sorry "+answer+ ` ${randomSpeech(input.ANSWER_WRONG_MESSAGE)}`);
            speechArr = speechArr.concat(await getClue(attributesManager, sessionAttributes));
          }
        }else{
          speechArr.push("<voice name='Matthew'>'Alright, lets try again.'</voice>");
          speechArr.push(`Here is your question. ${round.Subquestion[question].Question}`);
        }
        speechText = await convertArrayToSpeech(speechArr);
        reprompt = speechText;

      }
    }
    attributesManager.setSessionAttributes(sessionAttributes);
    

   if (supportsAPL(handlerInput)) {
      let roundName = input.INPUT_DATA[parseInt(sessionAttributes.level)-1].Round;
        handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            document: require('./Play.json'),
              datasources: {
              "thinkTwiceData": {
                "properties": {
                  "video": VIDEO_URLS_BY_ROUND_NAME[roundName],
                }
              }
            }
            
        });
    }
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(reprompt)
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
      .getResponse();
  },
};

const NewGameIntentHandler = {
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
      (request.intent.name === 'NewGameIntent' 
        || handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent');
    },
    async handle(handlerInput) {
    let { requestEnvelope, attributesManager} = handlerInput;
    let sessionAttributes = attributesManager.getSessionAttributes();
    sessionAttributes.gameState = 'PLAY';
    
      sessionAttributes.questionCount = 0;
      sessionAttributes.clueCount=0;
      sessionAttributes.endedSessionCount += 1;
      sessionAttributes.questionCount = 0;
      sessionAttributes.clueCount=0;
      sessionAttributes.level = 1;
      sessionAttributes.badge = 0;
      sessionAttributes.score = 0;
      sessionAttributes.gameState = 'ENDED';
      attributesManager.setPersistentAttributes(sessionAttributes);
      await attributesManager.savePersistentAttributes();
    
    let level = sessionAttributes.level;
    let speechText = '';
    let reprompt = '';
    let speechArr = [];

      let round = input.INPUT_DATA[level-1];
      if(sessionAttributes.gameState === 'ENDED' || sessionAttributes.gameState === 'CLUES' || (sessionAttributes.questionCount == 0)){
        let question = 0; 
        speechArr.push(`Your Level ${level.toString()} category is ${round.Round}`);
        speechArr.push(`${randomSpeech(input.STARTED)}`);
        speechText = await convertArrayToSpeech(speechArr)+await convertArrayToSpeech(round.Description);
  
        speechArr = [];
        speechArr.push(input.START_ANSWERS_MESSAGE_PROMPT);
        speechArr.push(`Let's now go through the answers from ${round.Round}`);
        speechArr.push(`If you get the answer wrong, i will give ou a clue, you get 2 available clues per question `);
        speechArr.push(`${round.Subquestion[question].Question}`);
        
        speechText = speechText + await convertArrayToSpeech(speechArr);
        reprompt = await convertArrayToSpeech(input.GAME_PLAY_REPROMPT);
        
        sessionAttributes.question = question;
        sessionAttributes.questionCount = 1;
        sessionAttributes.clueCount=0;
        sessionAttributes.score=0;
      } else {
        let question = 1
        if(requestEnvelope.request.intent.slots && 'answer' in requestEnvelope.request.intent.slots){
          let answer = requestEnvelope.request.intent.slots.answer.value;
          if(answer.toLowerCase() === round.Subquestion[question].Answer.toLowerCase()){
            sessionAttributes.score += (25-(10*sessionAttributes.clueCount));
            sessionAttributes.clueCount=0;
            speechArr.push(`${randomSpeech(input.ANSWER_CORRECT_MESSAGE)}`);
            let questionCount = sessionAttributes.questionCount;
            
          if (questionCount <= 4){
          let question = Math.floor(Math.random() * (round.Subquestion.length - 0) + 0);
      
              speechArr.push(input.NEXT_QUESTION_PROMPT);
              speechArr.push(` ${round.Subquestion[question].Question}`);
        
              sessionAttributes.question = question;
              sessionAttributes.questionCount += 1;
            }else{
              speechArr.push(input.ROUND_COMPLETE_PROMPT);
              speechArr.push("your score is "+sessionAttributes.score+ " points");
      
              if(sessionAttributes.score > 50){
                level += 1;
                let badge = (Math.floor((sessionAttributes.score/20)-2));
                sessionAttributes.badge += badge;
                
                speechArr.push("<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/NewLouderSounds/NN/magiccash/cash-machine.mp3' />" + "You have progressed to level "+ level);
                speechArr.push("and You have won " +badge+ " achievement awards, your total achievement award count is "+sessionAttributes.badge);
                speechArr.push("Would you like to play level " +level+ "?");
      
                sessionAttributes.level = level;
              }else{
                speechArr.push(input.PLAY_AGAIN_PROMPT);
              }
              sessionAttributes.gamesPlayed += 1;
              sessionAttributes.gameState = 'CLUES';
              sessionAttributes.questionCount = 0;
            }
          } else {
            speechArr.push("sorry "+answer+ ` ${randomSpeech(input.ANSWER_WRONG_MESSAGE)}`);
            speechArr = speechArr.concat(await getClue(attributesManager, sessionAttributes));
          }
        }else{
          speechArr.push("<voice name='Matthew'>'Alright, lets try again.'</voice>");
          speechArr.push(`Here is your question. ${round.Subquestion[question].Question}`);
        }
        speechText = await convertArrayToSpeech(speechArr);
        reprompt = speechText;

      }
    
    attributesManager.setSessionAttributes(sessionAttributes);
    

   if (supportsAPL(handlerInput)) {
      let roundName = input.INPUT_DATA[parseInt(sessionAttributes.level)-1].Round;
        handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            document: require('./Play.json'),
              datasources: {
              "thinkTwiceData": {
                "properties": {
                  "video": VIDEO_URLS_BY_ROUND_NAME[roundName],
                }
              }
            }
            
        });
    }
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(reprompt)
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
    const speechText = "<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/NewLouderSounds/NN/helpnn.mp3'/> ";
    const reprompt = "<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/NewLouderSounds/NN/helprepromptnn.mp3' />";

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
    const speechText = "<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/NewLouderSounds/NN/instructionsnn.mp3'/>";
    const InstructionsReprompt = "<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/NewLouderSounds/NN/helprepromptnn.mp3' />";

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
      .getResponse();
  },
};

const StopHandler = {
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
      && handlerInput.requestEnvelope.request.intent.name === 'StopIntent'
      || handlerInput.requestEnvelope.request.intent.name === 'CancelIntent'
      || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NoIntent'

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
                  "video": VIDEO_URLS['Stop']
                }
              }
            }
        });
    }
    
    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
  },
};


const StartOverRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
    && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StartOverIntent');
    },
    async handle(handlerInput) {
    let attributesManager = handlerInput.attributesManager;
    let attributes = await attributesManager.getPersistentAttributes() || {};
    if (Object.keys(attributes).length === 0) {
      attributes.gamesPlayed = 0;
      attributes.endedSessionCount = 0;
      attributes.badge = 0;
      attributes.level = 0;
      attributes.score = 0;
      attributes.question = 0;
      attributes.questionCount = 0;
      attributes.clueCount=0;
      attributes.gameState = 'START';
    }
    attributesManager.setSessionAttributes(attributes);
    
    let repromptArr = [];
    repromptArr.push(input.MAIN_MESSAGE);
    repromptArr.push(input.REPROMPT);
    let reprompt = await convertArrayToSpeech(repromptArr);
    let speechArr = []; {
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
        request.intent.name === 'InstructionsIntent' ||
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
    console.log('PLAY');
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

   if (questionCount < 5){
    let question = Math.floor(Math.random() * (round.Subquestion.length - 0) + 0);
      
      speechArr.push(input.NEXT_QUESTION_PROMPT);
      speechArr.push(`${round.Subquestion[question].Question}`);

      sessionAttributes.question = question;
      sessionAttributes.questionCount += 1;
    }else{
      speechArr.push(input.FOUR_QUESTIONS_COMPLETE);
      speechArr.push("your score is "+sessionAttributes.score+ " points");

      if(sessionAttributes.score > 50){
        level += 1;
        let badge = (Math.floor((sessionAttributes.score/20)-2));
        sessionAttributes.badge += badge;
        
        speechArr.push("<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/NewLouderSounds/NN/magiccash/cash-machine.mp3' />" + "You have progressed to "+level+" level.");
        speechArr.push("and You have won " +badge+ " Achievement Awards, your total achievement award count is "+sessionAttributes.badge);
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

//Randomise Question Answers
function randomSpeech(speech_list){
  const rand = Math.floor(Math.random() * speech_list.length);
  return speech_list[rand];
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
    InstructionsIntentHandler,
    PlayIntentHandler,
    StartOverRequestHandler,
    NewGameIntentHandler,
    CluesIntentHandler,
    FallbackHandler,
    StopHandler,
    HelpIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
