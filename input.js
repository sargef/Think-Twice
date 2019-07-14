module.exports = Object.freeze({

    SKILL_NAME : "Think Twice",
    ddbTableName : 'think-twice',

    //Welcomes
    WELCOME : "<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/NewLouderSounds/NN/welcomenn.mp3' />",
    MAIN_MESSAGE : "<voice name='Matthew'>'Say Play or Start to play the game or ask for Instructions.'</voice>",
    REPROMPT : "<voice name='Matthew'>''</voice>",
    WELCOME_BACK : "<voice name='Matthew'>'Welcome back to Think Twice, Memory Masters Game.'</voice>" + "<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/SoundEffects/start-game-countdown-02.mp3' />",
    WELCOME_BACK_POINTS_UPDATE : "<voice name='Matthew'> `You have played ${attributes.gamesPlayed.toString()} times and you are currently a Level ${attributes.level.toString()} Memory Master with ${attributes.badge.toString()} memory masters medals`</voice>",
    //Game Play
    START_ANSWERS_MESSAGE_PROMPT : "<voice name='Matthew'>'I hope you can remember all of the details from the question'</voice>",
    NEXT_QUESTION_PROMPT : "<voice name='Matthew'>'Lets now move to the next question.'</voice>",
    EARLY_CLUE_PROMPT : "<voice name='Matthew'>'Please play the game to get a clue'</voice>",
    CLUE_PROMPT : "<voice name='Matthew'>'Your clue is'</voice>",
    NO_CLUES_LEFT : "<voice name='Matthew'>'You have no clues left'</voice>",
    FOUR_QUESTIONS_COMPLETE : "<voice name='Matthew'>'You have completed this rounds questions'</voice>",
    ROUND_COMPLETE_PROMPT : "<voice name='Matthew'><say-as interpret-as='interjection'>'Congratulations,'</say-as><break strength='strong'/>'you have now completed this round'</voice>",
    PLAY_AGAIN_PROMPT : "<voice name='Matthew'>'Would you like to play again?'</voice>",
    ANSWER_CORRECT_MESSAGE: "<voice name ='Matthew'><say-as interpret-as='interjection'>'Correct'</say-as><break strength='strong'/></voice>" + "<audio src='https://s3-eu-west-1.amazonaws.com/familyfeuding/MattswordmasterDING.mp3'/>",
    ANSWER_WRONG_MESSAGE:  "<voice name ='Matthew'><say-as interpret-as='interjection'>'Incorrect'</say-as><break strength='strong'/></voice>" + "<audio src='https://s3-eu-west-1.amazonaws.com/familyfeuding/mattswordmasterBOHBOH.mp3'/>",
    //Complete
    COMPLETED_ALL_LEVELS: "<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/NewLouderSounds/NN/goldmedalnn.mp3' />",
    COMPLETED_ALL_LEVELS_UPDATE: "<voice name ='Matthew'>'We will update with some new levels for you soon. You should be very proud Memory Champion.'</voice>"+ "<audio src='https://s3-eu-west-1.amazonaws.com/familyfeuding/MattsAPPLAUSE2.mp3'/>",
    CHECK_BACK_SOON: "<voice name='Matthew'>'Please check back again soon.'</voice>",
    //Fallback
    FALLBACK_MESSAGE_DURING_GAME : "<voice name='Matthew'>'Think Twice can\'t help you with that. Try guessing the answer or ask for a clue.'</voice>",
    FALLBACK_REPROMPT_DURING_GAME : "<voice name='Matthew'>'Try guessing the question asked. Or Ask me for a clue.'</voice>",
    FALLBACK_MESSAGE_OUTSIDE_GAME : "<voice name='Matthew'>'Think Twice Memory Masters skill can\'t help you with that. You will be asked a Memory Question, then i will ask for you to tell me the items from memory. Please say play to start the game or ask for Instructions to learn more. What would you like to do?'</voice>",
    FALLBACK_REPROMPT_OUTSIDE_GAME : "<voice name='Matthew'>Say Play to start the game or Rules to know the rules'</voice>",
    ERROR_HANDLER : "<voice name='Matthew'>'Sorry, I can't understand the command. Please say that again.'</voice>",
    //Finish
    FINISH : "<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/NewLouderSounds/NN/stopnn.mp3' />",
    //Rules
    GAME_RULES : "<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/NewLouderSounds/NN/instructionsnn.mp3' />",
    GAME_RULES_REPROMPT : "<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/NewLouderSounds/NN/helprepromptnn.mp3' />",
    GAME_PLAY_REPROMPT : [
      "<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/NewLouderSounds/gamerepromptfullsound.mp3' />",
      "<voice name ='Matthew'>'Please Say clue if you don't know the answer' </voice>"
    ],
    //Question Data
    INPUT_DATA : [
        {
          "Round": "School Swoop",
          "VideoArray" : "https://thinktwice3.s3-eu-west-1.amazonaws.com/School+Swoop/SchoolSwoopWithBackEd.mp4",
          "Description": [
            "<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/NewLouderSounds/NN/schoolswoop1nn.mp3' />" + "<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/NewLouderSounds/NN/schoolswooptwonn.mp3' />"
          ],
          "Subquestion": [
            {   
              
                "Question": "<voice name='Matthew'>'Tell me what the snake had on it's back?</voice>", 
                "Answer" : "Chair",
                "Clues": [
                    "something you rest in",
                    "like a camel carrying a something"
                ]
            },
            {
              "Question": "<voice name='Matthew'>'What item that you need to take home was the person singing about?'</voice>",
              "Answer": "astronomy book",
              "Clues": [
                "Twinkle Twinkle little star, something something is what you are?",
                "I read about the planets from one"
              ]
            },
             {
              "Question": "<voice name='Matthew'>'What did the spider have on it's back?</voice>",
              "Answer": "maths book",
              "Clues": [
                "Measurements are recorded in one",
                "Sums are written in one"
              ]
            },
            {
              "Question": "<voice name='Matthew'>'What was your teacher giving instructions about?'</voice>",
              "Answer": "violin",
              "Clues": [
                "musical tunes are played on one",
                "Strings are it's main feature"
              ]
            },
            {
              "Question": "<voice name='Matthew'>'What item collapsed that reminds you of what you need to take home?'</voice>",
              "Answer": "woodwork",
              "Clues": [
                "You use a saw with it",
                "a house can be made from it"
              ]
            },
             {
              "Question": "<voice name='Matthew'>'The horse was playing one?'</voice>",
              "Answer": "Violin",
              "Clues": [
                "It has strings on it",
                "A musical instrument"
              ]
            },
             {
              "Question": "<voice name='Matthew'>'After the bell, a lady sings about a what?'</voice>",
              "Answer": "astronomy book",
              "Clues": [
                "You study the sky with it",
                "It features information about the planets"
              ]
            }
          ]
        },
          {
          "Round": "Concert Mania",
          "VideoArray" : "https://thinktwice3.s3-eu-west-1.amazonaws.com/ConcertMania/ConcertManiaWithBackEd.mp4",
          "Description": [
            "<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/NewLouderSounds/NN/concertmaniann.mp3' />"
          ],
          "Subquestion": [
            {   
                "Question": "<voice name='Matthew'>'What was the first band for the concert?'</voice>", 
                "Answer": "Metallica", 
                "Clues": [
                    "A funny taste in the mouth",
                    "Heavy elemental metal"
                ]
            },
            {
              "Question": "<voice name='Matthew'>'Someone had this in their hair to remind you of the band, who is the band please?'</voice>",
              "Answer": "Neil Diamond",
              "Clues": [
                "a guys and also a girls best friend",
                "it has different types of cuts"
              ]
            },
            {
              "Question": "<voice name='Matthew'>'A car zoomed around the concert, what was the band i asked you to remember using this checkmark?'</voice>",
              "Answer": "The Beatles",
              "Clues": [
                "I just squashed one",
                "One of the most famous bands of all time"
              ]
            },
            {
              "Question": "<voice name='Matthew'>'What band was featured on the beatles t-shirt who was driving around the concert?'</voice>",
              "Answer": "The Wiggles",
              "Clues": [
                "Children all over the world love this band",
                "A worm does this quite often"
              ]
            },
            {
              "Question": "<voice name='Matthew'>'what band did the crocodile chef speak of?'</voice>",
              "Answer": "Wet Wet Wet",
              "Clues": [
                "Rhymes with get get get",
                "When you go swimming, you get this"
              ]
            },
            {
              "Question": "<voice name='Matthew'>'What was the last band of the concert?'</voice>",
              "Answer": "Baby Animals",
              "Clues": [
                "Children like to play with a stuffed version of them",
                "Little versions of a creature of the jungle"
              ]
            },
              {
              "Question": "<voice name='Matthew'>'what was the pink panther juggling?'</voice>",
              "Answer": "Baby Animals",
              "Clues": [
                "Little furry friends",
                "new types of furries"
              ]
            }
          ]
        },
        {
          "Round": "Planetary Attack",
          "VideoArray" : "https://thinktwice3.s3-eu-west-1.amazonaws.com/NewLouderSounds/NN/SS/PlanetaryAttackSSVideo.mp4",
          "Description": [
            "<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/NewLouderSounds/NN/BronzeMedalNNNN.mp3' />" + "<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/NewLouderSounds/NN/SS/planetaryattackss.mp3' />"
          ],
          "Subquestion": [
            {   
              
                "Question": "<voice name='Matthew'>'Tell me the largest planet in our solar system?</voice>", 
                "Answer" : "Mercury",
                "Clues": [
                    "It's very hot",
                    "It can also be used to check the temperature"
                ]
            },
            {
              "Question": "<voice name='Matthew'>'What is the smallest planet in our solar system'</voice>",
              "Answer": "Pluto",
              "Clues": [
                "It is quick and slithery",
                "curled around Jupyter's shoulders"
              ]
            },
                        {
              "Question": "<voice name='Matthew'>'What planet did Venus fly into?'</voice>",
              "Answer": "Earth",
              "Clues": [
                "A blue planet",
                "This planet houses most of the storyline for this round"
              ]
            },
                        {
              "Question": "<voice name='Matthew'>'Which planet was named last on Jupyter's t-shirt?</voice>",
              "Answer": "Neptune",
              "Clues": [
                "It is spelt out and is the third letter on the t-shirt",
                "It has another meaning for music in it's name"
              ]
            },
             {
              "Question": "<voice name='Matthew'>'What is the beautiful female planet's name and second largest planet in our solar system?'</voice>",
              "Answer": "Venus",
              "Clues": [
                "She was catching drips from Mercury",
                "This planet dashes into earth"
              ]
            },
            {
              "Question": "<voice name='Matthew'>'The handsome Planet wearing a dressing gown is what'</voice>",
              "Answer": "Mars",
              "Clues": [
                "Venus knocks on his door",
                "A planet that also catches the attention of a beauitul planet"
              ]
            },
            {
              "Question": "<voice name='Matthew'>'What was the first planet printed on Jupiter's t-shirt?</voice>",
              "Answer": "Saturn",
              "Clues": [
                "It was spelt out on his shirt",
                "It is the first letter that spells out a hot star"
              ]
            }
          ]
        },
         {
          "Round": "Chemistry Quiz",
          "VideoArray" : "https://thinktwice3.s3-eu-west-1.amazonaws.com/NewLouderSounds/NN/SS/ChemistryQuizSSVideo.mp4",
          "Description": [
            "<voice name='Matthew'>'Welcome to the final round for this category as a master'</voice>" + "<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/NewLouderSounds/NN/SS/planetaryattackss.mp3' />"
          ],
          "Subquestion": [
            {   
              
                "Question": "<voice name='Matthew'>'What was the boy doing that reminds you of this element?'</voice>", 
                "Answer" : "Hydrogen",
                "Clues": [
                    "The little alien blue boy was saying this to you",
                    "This element starts with h"
                ]
            },
            {
              "Question": "<voice name='Matthew'>'This 2nd element was marked with balloons'</voice>",
              "Answer": "Helium",
              "Clues": [
                "This element is a gas",
                "This element can make you talk funny"
              ]
            },
             {
              "Question": "<voice name='Matthew'>'The little blue boy runs on this element'</voice>",
              "Answer": "Lithum",
              "Clues": [
                "This element makes things tick",
                "this element can work with time"
              ]
            },
              {
              "Question": "<voice name='Matthew'>'The bear reminds you of this element'</voice>",
              "Answer": "Beryllium",
              "Clues": [
                "This element starts with B",
                "this element is also a metal"
              ]
            },
             {
              "Question": "<voice name='Matthew'>'The little hero mouse marks this element'</voice>",
              "Answer": "Nitrogen",
              "Clues": [
                "This element can also be a savior in this level category",
                "It is also a gas"
              ]
            },
            {
              "Question": "<voice name='Matthew'>'What was the frying pan chopping on that marks this element'</voice>",
              "Answer": "Boron",
              "Clues": [
                "It is also used for chopping on",
                "This element is a mineral"
              ]
            },
        
            {
              "Question": "<voice name='Matthew'>'what type of sign was the cricket holding?'</voice>",
              "Answer": "Neon",
              "Clues": [
                "This element starts with N",
                "It was pink and yellow"
              ]
            },
          ]
        },
                 {
          "Round": "Party Trick",
          "VideoArray" : "https://thinktwice3.s3-eu-west-1.amazonaws.com/NewLouderSounds/NN/SS/PartyTrickSSVideo.mp4",
          "Description": [
            "<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/NewLouderSounds/NN/SilverMedalNNNN.mp3' />" + "<voice name='Matthew'>'Congratulations, you have arrived into the memory champion's category. We will start with a couple of easy levels to give your brain a little rest first, then we will progress to the hardest remaining levels that can ultimately make you a memory champion.</voice>" + "<audio src='' />"
          ],
          "Subquestion": [
            {   
              
                "Question": "<voice name='Matthew'>'What was the first guest at the party's name?</voice>", 
                "Answer" : "Timothy",
                "Clues": [
                    "It melts into the floor",
                    "Also the name for something brown, sweet and tasty"
                ]
            },
            {
              "Question": "<voice name='Matthew'>'Who was the second guest?'</voice>",
              "Answer": "Miles",
              "Clues": [
                "You look at your speedometer to check it out",
                "Racing for this amount of time"
              ]
            },
             {
              "Question": "<voice name='Matthew'>'Who was holding a baby?'</voice>",
              "Answer": "Katie",
              "Clues": [
                "This name was also sounded out",
                "The lady whom is also a couple of letters"
              ]
            },
              {
              "Question": "<voice name='Matthew'>'This person was laughing'</voice>",
              "Answer": "Timothy",
              "Clues": [
                "A giggle from the sweet",
                "Melting into the floor"
              ]
            },
             {
              "Question": "<voice name='Matthew'>'This person drives you along a country road'</voice>",
              "Answer": "Miles",
              "Clues": [
                "A speed gage for your something",
                "250 per hour"
              ]
            },
            {
              "Question": "<voice name='Matthew'>'She greets you with a Hello'</voice>",
              "Answer": "Katie",
              "Clues": [
                "She is rocking a baby in her arms",
                "Her name is also letters"
              ]
            },
          ]
        },
                 {
          "Round": "Shopping Shark",
          "VideoArray" : "https://thinktwice3.s3-eu-west-1.amazonaws.com/NewLouderSounds/NN/SS/ShoppingSharkSSVideo.mp4",
          "Description": [
            "<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/NewLouderSounds/NN/SS/shoppinsharkss.mp3' />"
          ],
          "Subquestion": [
            {   
              
                "Question": "<voice name='Matthew'>'What item greets you at the door?'</voice>", 
                "Answer" : "Lettuce",
                "Clues": [
                    "He is acting pretty cool",
                    "He is usually green in color"
                ]
            },
            {
              "Question": "<voice name='Matthew'>'Which item was wiggling on the floor'</voice>",
              "Answer": "Cucumber",
              "Clues": [
                "He grunted at you",
                "He is long and purple"
              ]
            },
             {
              "Question": "<voice name='Matthew'>'Which item was dripping from the ceiling'</voice>",
              "Answer": "Butter",
              "Clues": [
                "It is usually yellow",
                "This item is of a soft texture"
              ]
            },
              {
              "Question": "<voice name='Matthew'>'what item was stuck to your hands'</voice>",
              "Answer": "Tomato",
              "Clues": [
                "It squelches under you",
                "You feel into it"
              ]
            },
             {
              "Question": "<voice name='Matthew'>'which item that i gave you to remember was singing'</voice>",
              "Answer": "Bread",
              "Clues": [
                "Singing about toast",
                "The forth item on your list"
              ]
            },
            {
              "Question": "<voice name='Matthew'>'What was your last item at the shop'</voice>",
              "Answer": "Butter",
              "Clues": [
                "sticky and dripping",
                "falling from the roof"
              ]
            },
        
            {
              "Question": "<voice name='Matthew'>'Which item had a hat on sideways?'</voice>",
              "Answer": "Lettuce",
              "Clues": [
                "He was looking pretty cool",
                "He said howdy, to you"
              ]
            },
          ]
        },
                 {
          "Round": "Appointment Appeal",
          "VideoArray" : "https://thinktwice3.s3-eu-west-1.amazonaws.com/NewLouderSounds/NN/SS/AppAppealVideo.mp4",
          "Description": [
            "<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/NewLouderSounds/NN/apptappeal1nn.mp3' />" + "<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/NewLouderSounds/NN/SS/appappealtwoss.mp3' />"
          ],
          "Subquestion": [
            {   
              
                "Question": "<voice name='Matthew'>'Which appointment do you have first. Please say the day of the week and the item. Example, sunday rump roast'</voice>", 
                "Answer" : "Monday Piano Lessons",
                "Clues": [
                    "They sat in a circle listening to",
                    "A man was playing on one with a silent audience"
                ]
            },
            {
              "Question": "<voice name='Matthew'>'What was the second appointment. Please tell me the day and item. Example, sunday rump roast'</voice>",
              "Answer": "Wednesday Play Group",
              "Clues": [
                "The little boy says this day to you",
                "Kids go here to play"
              ]
            },
             {
              "Question": "<voice name='Matthew'>'What was the third appointment. Please remember to tell me the day and item. Example, tuesday movie theatre'</voice>",
              "Answer": "Saturday Car Wash",
              "Clues": [
                "It was raining black umbrellas for this memory marker",
                "You visit this place to clean your car usually on a"
              ]
            },
              {
              "Question": "<voice name='Matthew'>'Please tell me your forth appointment. Remember to tell me the day and the item. Example, tuesday movie theatre'</voice>",
              "Answer": "Friday Homeless Shelter",
              "Clues": [
                "He is frying an egg on the road",
                "It is hot and you smell food frying"
              ]
            },
             {
              "Question": "<voice name='Matthew'>'tell me your fifth appointment. Please remember to tell me the day and the item. Example, Monday work day'</voice>",
              "Answer": "Tuesday shoe Shopping",
              "Clues": [
                "The homeless man tell you to do this",
                "this item will keep you walking and you can pick from lots"
              ]
            },
            {
              "Question": "<voice name='Matthew'>'What was the sixth appointment. Tell me the day and item. Example, Tuesday work meeting'</voice>",
              "Answer": "Thursday Wine tasting",
              "Clues": [
                "the deer was jumping up and down with something on it's leg",
                "grapes make this drink"
              ]
            },
        
            {
              "Question": "<voice name='Matthew'>'Please tell me the seventh appointment. the day and item. Example. Sunday Surf Lessons'</voice>",
              "Answer": "Sunday Beach outing",
              "Clues": [
                "It skated across the sky",
                "You felt the cool breeze across your face"
              ]
            },
          ]
        },
                 {
          "Round": "Diary Dash",
          "VideoArray" : "https://thinktwice3.s3-eu-west-1.amazonaws.com/NewLouderSounds/NN/SS/DiaryDashSSVideo.mp4",
          "Description": [
            "<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/NewLouderSounds/NN/diarydash1nn.mp3' />" + "<audio src='https://thinktwice3.s3-eu-west-1.amazonaws.com/NewLouderSounds/NN/SS/DiaryDashTwoSS.mp3' />"
          ],
          "Subquestion": [
            {   
              
                "Question": "<voice name='Matthew'>'When you walk out your front door, you are reminded of this? Just tell me the name of the place'</voice>", 
                "Answer" : "Day Care",
                "Clues": [
                    "Sucking dummies",
                    "You need to drop off there"
                ]
            },
            {
              "Question": "<voice name='Matthew'>'The 2nd place you need to visit is. Please just tell me the name of the place.'</voice>",
              "Answer": "School",
              "Clues": [
                "You send your family members there",
                "Your kids go there to learn"
              ]
            },
             {
              "Question": "<voice name='Matthew'>'The 3rd place in your diary is? Please tell me the place only.'</voice>",
              "Answer": "Library",
              "Clues": [
                "Up into the clouds",
                "A place you borrow at"
              ]
            },
              {
              "Question": "<voice name='Matthew'>'Please tell me the 4th place in your diary? Just the name of the place.'</voice>",
              "Answer": "Car Wash",
              "Clues": [
                "Two words",
                "You clean with it"
              ]
            },
             {
              "Question": "<voice name='Matthew'>'Tell me the 5th place in your diary. Just the name but four words'</voice>",
              "Answer": "newspaper to husbands work",
              "Clues": [
                "",
                ""
              ]
            },
            {
              "Question": "<voice name='Matthew'>'Tell me the 6th place in your diary. Just the name please.'</voice>",
              "Answer": "Florist",
              "Clues": [
                "The old lady handed you some",
                "smells of perfume"
              ]
            },
        
            {
              "Question": "<voice name='Matthew'>'Please tell me the 7th and last place in your diary. Just the name and it is two words'</voice>",
              "Answer": "Nursing Home",
              "Clues": [
                "You mum lives there",
                "Somewhere you go to visit elderly people"
              ]
            },
          ]
        }
      ]
});
