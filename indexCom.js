/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');

const SKILL_NAME = "Think Twice";
const WELCOME_MESSAGE = "<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/Vids/welcomeintroentiresounds.mp3' />";
const GAME_SOUND1 = "<audio src='soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_player1_01'/>";
const HELP_MESSAGE = "https://thinktwice3.s3-eu-west-1.amazonaws.com/Help/Help.mp3";
const HELP_REPROMPT = "https://thinktwice3.s3-eu-west-1.amazonaws.com/WelcomeAndStartReprompt/BeginReprompt.mp3";
const CORRECT_ANSWER = "<say-as interpret-as='interjection'>Correct</say-as>" + "<audio src='https://s3-eu-west-1.amazonaws.com/familyfeuding/MattswordmasterDING.mp3'/>";
const INCORRECT_ANSWER = "<say-as interpret-as='interjection'>Incorrect</say-as>" + "<audio src='https://s3-eu-west-1.amazonaws.com/familyfeuding/mattswordmasterBOHBOH.mp3'/>";
const NEXT_QUESTION_MESSAGE = "";
const CONGRATS_MESSAGE = "Congratulations, the trivia has ended!";
const SCORE_IS_MESSAGE = "<voice name ='Matthew'>'Your score is %s. '</voice>";
const STOP_MESSAGE = "<say-as interpret-as='interjection'>okey dokey</say-as><s> see you later </s>";

///
///['Booya', 'All righty', 'Bam', 'Bazinga', 'Bingo', 'Boom', 'Bravo', 'Cha Ching', 'Cheers', 'Dynomite', 'Hip hip hooray', 'Hurrah', 'Hurray', 'Huzzah', 'Oh dear.  Just kidding.  Hurray', 'Kaboom', 'Kaching', 'Oh snap', 'Phew','Righto', 'Way to go', 'Well done', 'Whee', 'Woo hoo', 'Yay', 'Wowza', 'Yowsa'];
///['Argh', 'Aw man', 'Blarg', 'Blast', 'Boo', 'Bummer', 'Darn', "D'oh", 'Dun dun dun', 'Eek', 'Honk', 'Le sigh', 'Mamma mia', 'Oh boy', 'Oh dear', 'Oof', 'Ouch', 'Ruh roh', 'Shucks', 'Uh oh', 'Wah wah', 'Whoops a daisy', 'Yikes'];
///function getCurrentScore(score, counter) { return "Your current score is " + score + " out of " + counter + ". "; }

///function getFinalScore(score, counter) { return "Your final score is " + score + " out of " + counter + ". "; }

////

const questionArray = [
//1 
    {"question":"<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/School+Swoop/schooswoop1.mp3' />" + "<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/School+Swoop/schoolswoop2.mp3' />", "answer":"chair" },
     {"question":"<voice name='Matthew'>next item please</voice>", "answer":"astronomy book" },
      {"question":"<voice name='Matthew'>next item</voice>", "answer":"maths book" },
       {"question":"<voice name='Matthew'>tell me the next item</voice>", "answer":"piano lessons" },
        {"question":"<voice name='Matthew'>next item please</voice>", "answer":"woodwork" },
//2 
    {"question":"<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/ConcertMania/Round2ConcertManiaAllSounds.mp3' />", "answer": "Metallica" },
      {"question":"<voice name='Matthew'>next item please</voice>", "answer":"Neil Diamond" },
       {"question":"<voice name='Matthew'>next item please</voice>", "answer":"The Beetles" },
         {"question":"<voice name='Matthew'>next item please</voice>", "answer":"The Wiggles" },
           {"question":"<voice name='Matthew'>next item please</voice>", "answer":"Wet Wet Wet" },
            {"question":"<voice name='Matthew'>next item please</voice>", "answer":"Baby Animals" },
//3
    {"question":"<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/PlanetaryAttack/Round3PlanetaryAttackAll.mp3' />", "answer":"Mercury" },
     {"question":"<voice name='Matthew'>next item please</voice>", "answer":"Venus" },
      {"question":"<voice name='Matthew'>next item please</voice>", "answer":"Earth" },
       {"question":"<voice name='Matthew'>next item please</voice>", "answer":"Mars" },
        {"question":"<voice name='Matthew'>next item please</voice>", "answer":"Saturn" },
         {"question":"<voice name='Matthew'>next item please</voice>", "answer":"Uranus" },
          {"question":"<voice name='Matthew'>next item please</voice>", "answer":"Neptune" },
           {"question":"<voice name='Matthew'>next item please</voice>", "answer":"Pluto" },
  
//4
    {"question":"<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/ChemistryQuiz/Round4ChemistryQuizAll.mp3' />", "answer":"Hydrogen" },
     {"question":"<voice name='Matthew'>next item please</voice>", "answer":"Helium" },
      {"question":"<voice name='Matthew'>next item please</voice>", "answer":"Lithium" },
       {"question":"<voice name='Matthew'>next item please</voice>", "answer":"Berrylium" },
        {"question":"<voice name='Matthew'>next item please</voice>", "answer":"Boron" },
         {"question":"<voice name='Matthew'>next item please</voice>", "answer":"Carbon" },
         {"question":"<voice name='Matthew'>next item please</voice>", "answer":"Nitrogen" },
          {"question":"<voice name='Matthew'>next item please</voice>", "answer":"Oxygen" },
           {"question":"<voice name='Matthew'>next item please</voice>", "answer":"Fleurine" },
             {"question":"<voice name='Matthew'>next item please</voice>", "answer":"Neon" },
//5
    {"question":"<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/PartyTrick/Round1PartyTrickEntireSounds.mp3' />", "answer":"Timothy" },
     {"question":"<voice name='Matthew'>next item please</voice>", "answer":"Miles" },
      {"question":"<voice name='Matthew'>next item please</voice>", "answer":"Katie" },
//6
    {"question":"<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/ShoppingShark/Round2ShoppingSharkAll.mp3' />", "answer":"Lettuce" },
     {"question":"<voice name='Matthew'>next item please</voice>", "answer":"Cucumber" },
      {"question":"<voice name='Matthew'>next item please</voice>", "answer":"Tomato" },
       {"question":"<voice name='Matthew'>next item please</voice>", "answer":"Bread" },
        {"question":"<voice name='Matthew'>next item please</voice>", "answer":"Butter" },
//7
    {"question":"<audio src='' />", "answer":"" },
     {"question":"<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/DiaryDash/Round3DiaryDashPart1all.mp3' />" + "<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/DiaryDash/Round3DiaryDashpart2all.mp3' />", "answer":"Day Care" },
      {"question":"<voice name='Matthew'>next item please</voice>", "answer":"School" },
       {"question":"<voice name='Matthew'>next item please</voice>", "answer":"library" },
        {"question":"<voice name='Matthew'>next item please</voice>", "answer":"Car Wash" },
         {"question":"<voice name='Matthew'>next item please</voice>", "answer":"Newspaper" },
          {"question":"<voice name='Matthew'>next item please</voice>", "answer":"Florist" },
           {"question":"<voice name='Matthew'>next item please</voice>", "answer":"Nursing Home" },
//8
    {"question":"<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/ApptAppeal/Round4ApptAppealPart1All.mp3' />" + "<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/ApptAppeal/Round4ApptAppealAllpart2.mp3' />", "answer":"Monday Piano" },
     {"question":"<voice name='Matthew'>next item please</voice>", "answer":"Wednesday play group" },
      {"question":"<voice name='Matthew'>next item please</voice>", "answer":"Saturday Car Wash" },
       {"question":"<voice name='Matthew'>next item please</voice>", "answer":"Friday Homeless Shelter" },
        {"question":"<voice name='Matthew'>next item please</voice>", "answer":"Tuesday Shoe Shopping" },
         {"question":"<voice name='Matthew'>next item please</voice>", "answer":"Thursday Wine Tasting" },
          {"question":"<voice name='Matthew'>next item please</voice>", "answer":"Sunday Beach" },
           {"question":"<voice name='Matthew'>next item please</voice>", "answer":"Tuesday Work" },
];

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
      .getResponse();
  },
};

const DailyGameHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && 
      request.intent.name === 'DailyGame'&&
        request.dialogState !== 'COMPLETED';
  },
  handle(handlerInput) {
    
    const request = handlerInput.requestEnvelope.request;
    const filledSlots = request.intent.slots;
    const answer = filledSlots.answerA.value;
    
    let currentQuestionCounter = 0;
    let speechOutput = questionArray[currentQuestionCounter].question;
    let correctAnswer = questionArray[currentQuestionCounter].answer;
    
    // if exists in session, we get currentQuestionCounter and previousAnswer
    let currentIntent = handlerInput.requestEnvelope.request.intent;
    const {attributesManager,responseBuilder} = handlerInput;
    const sessionAttributes = attributesManager.getSessionAttributes();
    if (sessionAttributes[currentIntent.name]) {
      currentQuestionCounter = sessionAttributes[currentIntent.name].currentQuestionCounter;
      correctAnswer =sessionAttributes[currentIntent.name].previousAnswer;
      speechOutput = questionArray[currentQuestionCounter].question;
      console.log("currentQuestionCounter" + currentQuestionCounter);
    }
    if (answer){
      if (answer.toLowerCase() === correctAnswer) {
        speechOutput= CORRECT_ANSWER;
        if (currentQuestionCounter < questionArray.length-1){
          speechOutput = speechOutput + NEXT_QUESTION_MESSAGE + questionArray[currentQuestionCounter+1].question;
          correctAnswer = questionArray[currentQuestionCounter+1].answer;
        }else{
            speechOutput = speechOutput + CONGRATS_MESSAGE;
          }
        currentQuestionCounter++;
        }
        else {
          speechOutput = INCORRECT_ANSWER +" "+ speechOutput;
        }
    }

    // Saving correctAnswer and counter into session
    let previousAnswer = correctAnswer;
    sessionAttributes[currentIntent.name] = {currentQuestionCounter,previousAnswer};
    attributesManager.setSessionAttributes(sessionAttributes);
    
    var response =  handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .addElicitSlotDirective("answerA")
      .getResponse();
    return response;
  },
};


   
/////
  
////

/////
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

const NoIntent = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NoIntent';
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const speechOutput = requestAttributes.t('NO_MESSAGE');
    return handlerInput.responseBuilder.speak(speechOutput).getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`The session ended: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
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
  
    const speechText = "<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/Stop/StopCancel.mp3'/> ";

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

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log("WHOLE ERROR" + JSON.stringify(error));

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
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
    NoIntent,
    CancelAndStopIntentHandler,
    DailyGameHandler,
    HelpIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();

