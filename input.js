module.exports = Object.freeze({

    SKILL_NAME : "Think Twice",
    ddbTableName : 'think-twice',

    //Welcomes
    WELCOME : "<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/Vids/welcomeintroentiresounds.mp3' />",
    MAIN_MESSAGE : "<voice name='Matthew'>'Say Play or Start to play the game or ask for Instructions.'</voice>",
    REPROMPT : "<voice name='Matthew'>'What would you like to do?'</voice>",
    WELCOME_BACK : "<voice name='Matthew'>'Welcome back to Think Twice, Memory Masters Game.'</voice>" + "<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/SoundEffects/start-game-countdown-02.mp3' />",
    WELCOME_BACK_POINTS_UPDATE : "<voice name='Matthew'> `You have played ${attributes.gamesPlayed.toString()} times and you are currently a Level ${attributes.level.toString()} Memory Master with ${attributes.badge.toString()} memory masters medals`</voice>",
    //Game Play
    START_ANSWERS_MESSAGE_PROMPT : "<voice name='Matthew'>'I hope you can remember all of the details from the question'</voice>",
    NEXT_QUESTION_PROMPT : "<voice name='Matthew'>'Lets now move to the next question.'</voice>",
    EARLY_CLUE_PROMPT : "<voice name='Matthew'>'Please play the game to get a clue'</voice>",
    CLUE_PROMPT : "<voice name='Matthew'>'Your clue is'</voice>",
    NO_CLUES_LEFT : "<voice name='Matthew'>'You have no clues left'</voice>",
    FOUR_QUESTIONS_COMPLETE : "<voice name='Matthew'>'and completed your 4 questions'</voice>",
    ROUND_COMPLETE_PROMPT : "<voice name='Matthew'>'and completed this round'</voice>",
    PLAY_AGAIN_PROMPT : "<voice name='Matthew'>'Would you like to play again?'</voice>",
    ANSWER_CORRECT_MESSAGE: "<voice name ='Matthew'>'correct. '</voice>" + "<audio src='https://s3-eu-west-1.amazonaws.com/familyfeuding/MattswordmasterDING.mp3'/>",
    ANSWER_WRONG_MESSAGE:  "<voice name ='Matthew'>'incorrect. '</voice>" + "<audio src='https://s3-eu-west-1.amazonaws.com/familyfeuding/mattswordmasterBOHBOH.mp3'/>",
    //Complete
    COMPLETED_ALL_LEVELS: "<voice name ='Matthew'>'Well done, You have completed all the levels.'</voice>" + "<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/SoundEffects/Coins.mp3' />",
    COMPLETED_ALL_LEVELS_UPDATE: "<voice name ='Matthew'>'We will update with some new levels for you soon. You should be very proud Memory Champion.'</voice>"+ "<audio src='https://s3-eu-west-1.amazonaws.com/familyfeuding/MattsAPPLAUSE2.mp3'/>",
    CHECK_BACK_SOON: "<voice name='Matthew'>'Please check back again soon.'</voice>",
    //Fallback
    FALLBACK_MESSAGE_DURING_GAME : "<voice name='Matthew'>'The Battle of Brains Game skill can\'t help you with that. Try guessing the answer for the question asked. Or Ask for clue.'</voice>",
    FALLBACK_REPROMPT_DURING_GAME : "<voice name='Matthew'>'Try guessing the question asked. Or Ask me for a clue.'</voice>",
    FALLBACK_MESSAGE_OUTSIDE_GAME : "<voice name='Matthew'>'Think Twice Memory Masters skill can\'t help you with that. You will be asked a Memory Question, then i will ask for you to tell me the items from memory. Please say play to start the game or ask for Instructions to learn more. What would you like to do?'</voice>",
    FALLBACK_REPROMPT_OUTSIDE_GAME : "<voice name='Matthew'>Say Play to start the game or Rules to know the rules'</voice>",
    ERROR_HANDLER : "<voice name='Matthew'>'Sorry, I can't understand the command. Please say that again.'</voice>",
    //Finish
    FINISH : "<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/Stop/StopCancel.mp3' />",

    GAME_RULES : "<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/Help/Help.mp3' />",
       // "Alright, let me guide you through the basics of game.",
        //"Battle of Brains, is unique way of creating interest among kids about the historic Indain battles in the form of multi level based game.",
        //"In each level, first you will be provided with a overview of the specific battle and test your knowledge by asking set 4 questions.",
       // "If you answer correctly, u fetch 25 points. you can use clues to guess the answer. for each clue 10 points will be deducted from 25.",
       // "you need to score atleast 50 points to proceed to next level. if you score 60 you get 1 star, for 80 u get 2 stars and for all answers at first guess u fetch 3 stars along with advancing to next level.",      
    //Rules
    GAME_RULES_REPROMPT : "<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/WelcomeAndStartReprompt/BeginReprompt.mp3' />",
    GAME_PLAY_REPROMPT : [
      "<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/WelcomeAndStartReprompt/BeginReprompt.mp3' />",
      "<voice name ='Matthew'>'Please Say clue if you don't know the answer' </voice>"
    ],
    //Question Data
    INPUT_DATA : [
        {
          "Round": "School Swoop",
          "VideoArray" : "https://thinktwice3.s3-eu-west-1.amazonaws.com/School+Swoop/SchoolSwoopWithBackEd.mp4",
          "Description": [
            "<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/School+Swoop/schooswoop1.mp3' />" + "<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/School+Swoop/schoolswoop2.mp3' />"
          ],
          "Subquestion": [
            {   
              
                "Question": "<voice name='Matthew'>'Can you tell me the first item from school swoop please, in the correct order, go'</voice>", 
                "Answer": "Chair",
                "Clues": [
                    "The green snake was carrying one on it's back",
                    "like a camel carrying a something"
                ]
            },
            {
              "id": 2,
              "Question": "<voice name='Matthew'>'Next Answer please, remember to tell me in the correct order'</voice>",
              "Answer": "astronomy book",
              "Clues": [
                "A bible on the stary skies",
                "I read about the planets from one"
              ]
            },
            {
              "id" : 3,
              "Question": "<voice name='Matthew'>'Next Answer'</voice>",
              "Answer": "piano",
              "Clues": [
                "Measurements are recorded in one",
                "Sums are written in one"
              ]
            },
            {
              "id" : 4,
              "Question": "<voice name='Matthew'>'Next Answer Please'</voice>",
              "Answer": "woodwork",
              "Clues": [
                "Musical tunes are played on one",
                "Keys are it's main feature"
              ]
            }
          ]
        },
          {
          "Round": "Concert Mania",
          "VIDEO_URL" : "https://thinktwice3.s3-eu-west-1.amazonaws.com/ConcertMania/ConcertManiaWithBackEd.mp4",
          "Description": "https://thinktwice3.s3-eu-west-1.amazonaws.com/ConcertMania/Round2ConcertManiaAllSounds.mp3",
          
          "Subquestion": [
            {
                "Question": "<voice name='Matthew'>'Can you tell me the first item please, in the correct order, go'</voice>", 
                "Answer": "Metallica", 
                "Clues": [
                    "A funny taste in the mouth",
                    "Heavy elemental metal"
                ]
            },
            {
              "Question": "<voice name='Matthew'>'what is the next one please'</voice>",
              "Answer": "The Beatles",
              "Clues": [
                "I just squashed one",
                "One of the most famous bands of all time"
              ]
            },
            {
              "Question": "<voice name='Matthew'>'what is the next one'</voice>",
              "Answer": "The Wiggles",
              "Clues": [
                "Children all over the world love this band",
                "A worm does this quite often"
              ]
            },
            {
              "Question": "<voice name='Matthew'>'what is the next one please'</voice>",
              "Answer": "Wet Wet Wet",
              "Clues": [
                "Rhymes with get get get",
                "When you go swimming, you get this"
              ]
            },
                 {
              "Question": "<voice name='Matthew'>'Tell me the next answer'</voice>",
              "Answer": "Baby Animals",
              "Clues": [
                "Little furry friends",
                "new types of furries"
              ]
            }
          ]
        }
      ]
});
