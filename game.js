
var gamePattern = [];

var userClickedPattern = [];

var buttonColors = ["red","blue","green","yellow"];

var level = 0;

var letsPlay = true;

//Start game after a keypress
 $(document).keypress(function(){
   if(letsPlay){
     letsPlay=nextSequence();
   }
 });

//Look for a button press
lookForBtnPress();

//Functions*********************************************************************************
//Initial sequence after a button press on the keyboard
function nextSequence(){

  //Reset the user pattern
  userClickedPattern =[];

  //Increment the level
  level++;

  //Display the level
  $("h1").text("Level: "+level);

  //Generate a random number
  let randomNumber = Math.round(Math.random()*3);

  //Assign a color
  let randomChosenColor = buttonColors[randomNumber];

  //Build Array
  gamePattern.push(randomChosenColor);

  //Select a Random button
  let randomChosenButton = $("#"+randomChosenColor);

  //flash the button
  randomChosenButton.fadeOut(100).fadeIn(100);

  //Play button sound
   playSound("sounds/"+randomChosenColor+".mp3");

   return false;
}

//Store Button press, Green, Red, Blue and Yellow Buttons.
function lookForBtnPress(){
    $(".btn").click(function(){
        let userChosenColor = $(this).attr("id");

        //Store button press in an array
        userClickedPattern.push(userChosenColor);

        playSound("sounds/"+ userChosenColor +".mp3");

        animatePress(userChosenColor);
        checkAnswer(userClickedPattern.length-1);
    });
}

//Play selected sounds
function playSound(soundPath){
    let sound = new Audio(soundPath);
    sound.play();
}

//Animate the button that is pressed
function animatePress(currentColor){
  let currentId = "#"+currentColor;

  $(currentId).addClass("pressed");

  setTimeout(function(){$(currentId).removeClass("pressed");},100);
}

//Answer Compair
function checkAnswer(currentLevel){
  //Get the length of the User Array
  let arrLengthUser = userClickedPattern.length;

  //Get the length of the Comp's Array
  let arrLengthComp = gamePattern.length;

  //Check if the button that was pressed was correct
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){

    if(arrLengthUser === arrLengthComp){

      setTimeout(function(){nextSequence();},1000);
    }
  }
  else{
    //Wrong sequence was detected
    $("body").addClass("game-over");

    setTimeout(function(){$("body").removeClass("game-over");},200);

    playSound("sounds/wrong.mp3");

    $("h1").text("Game Over, Press Any Key to Restart");
    //currentLevel = 0;
    startOver();

  }
}

//Reset the game
function startOver(){
    gamePattern = [];
    userClickedPattern = [];
    level = 0
    letsPlay = true;
}
