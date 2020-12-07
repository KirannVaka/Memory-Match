/* This is the file that is going to load for the game on to the webpage*/

//These are the global variable that are going to used for the game
var memoryTilesArray = [];
var memoryValues = [];
var tileId = [];
var flippedTiles = 0;
var level = 0;
var moves = 0;
var noOfTilesInGridRow;
var currentArraylength;
var interval;
var second = 0;
var minute = 0;
var hour = 0;
var delay;
var currentTime;
var remark;
var totalMoves = 0;
var totalArrayLength = 0;

// This function is used for shuffling the array elemenets
Array.prototype.ShuffleTiles = function()
{
  var i = currentArraylength, j, temp;
  while(--i > 0)
  {
    j = Math.floor(Math.random() * (i+1));
    temp = this[j];
    this[j] = this[i];
    this[i] = temp;
  }
}


// This is the game Timer function
function starttimmer()
{
  var timmer = document.querySelector(".timmer");
  interval = setInterval(function(){
    currentTime = timmer.innerHTML = "Timer: "+minute+" mins "+second+" secs";
    second++;
    if(second == 60)
    {
      minute++;
      second=0;
    }
    if(minute == 60)
    {
      hour++;
      minute = 0;
    }
  },1000);
}

//This is the function to track moves and change star rating
function movesCounter()
{
  moves++;
  if(flippedTiles==currentArraylength)
  {
    //tracking of total moves in game
    totalMoves = totalMoves + moves;
  }
  //Starts the timer when the first move is made
  if(moves == 1)
  {
    //remark to be displayed after the level
    remarkText = "Excellent Memory!";
    starttimmer();
  }
  /* The follwing statements check if the moves made to comlete the game are in range are defined value.
  The defined values are in proportion 1/2,1 and 2/3 greater than total tiles for each star respectively.
  Changes the star rating depending on the moves
  It also decides the remarks based on the no.of moves made to finish the game*/
  if(moves == (currentArraylength+(currentArraylength/2)+1))
  {
    remarkText = "Good Memomry!";
    var star3Div = document.getElementById("star3");
    star3Div.classList.remove("showStar");
    star3Div.classList.add("hideStar");
  }
  if(moves == ((currentArraylength*2)+1))
  {
    remarkText = "Ok memory!";
    var star2Div = document.getElementById("star2");
    star2Div.classList.remove("showStar");
    star2Div.classList.add("hideStar");
  }
  if(moves >= (currentArraylength+((currentArraylength*3)/2)+1))
  {
    remarkText = "Try Hard";
    var star1Div = document.getElementById("star1");
    star1Div.classList.remove("showStar");
    star1Div.classList.add("hideStar");
  }
  //add current moves to the screen
  var movesDiv = document.getElementById("movesId");
  movesDiv.innerHTML = "Moves: "+moves;
}

//This sequence runs at the end of each level
function levelEndSequence()
{
  totalArrayLength = totalArrayLength + currentArraylength;
  //check if last level is reached, if not than generate the replay or next level sequence
  if(level < 14){
    //freezes the timer
    var timmer = document.querySelector(".timmer");
    timmer.innerHTML = currentTime;
    clearInterval(interval);
    //resets values
    flippedTiles = 0;
    second = 0;
    minute = 0;
    hour = 0;
    moves = 0;

    //generate the end level buttons and text.
    //Places all the buttons inside a sequence container
    var gameBoardDiv = document.querySelector(".gameBoardDiv");
    gameBoardDiv.innerHTML = "";

    var endLevelText = createParagraph("Level "+level+" Completed");
    endLevelText.classList.add("endLevelText");
    var remark = createParagraph(remarkText);
    remark.classList.add("remark");
    var sequenceContainer = createDiv();
    sequenceContainer.classList.add("sequenceContainer");
    var buttonDiv = createDiv();
    var replayButton = createButton("Replay Level");
    replayButton.onclick = game;
    var nextLevelButton = createButton("Next Level");
    nextLevelButton.onclick = levelSelector;
    buttonDiv.classList.add("buttonDiv");
    replayButton.classList.add("buttonLeft");
    nextLevelButton.classList.add("buttonRight");
    sequenceContainer.appendChild(remark);
    sequenceContainer.appendChild(endLevelText);
    buttonDiv.appendChild(replayButton);
    buttonDiv.appendChild(nextLevelButton);
    sequenceContainer.appendChild(buttonDiv);
    gameBoardDiv.appendChild(sequenceContainer);
  }

  //if the last level is reached than generates the end game board
  else
  {
    //congratulations audio
    var winAudio = createAudio("Audio/5_Sec_Crowd_Cheer-Mike_Koenig-1562033255.wav");
    winAudio.play();

    //clears the screen
    document.body.innerHTML = "";
    var winDiv = createDiv();

    //Checks the total no.of moves made for the completion of game and decides the player status.
    if (totalMoves <= (totalArrayLength+(totalArrayLength/2))){
      window.finalRemark = "Excelent Memory!";
    }
    else if (totalMoves <= (totalArrayLength+(totalArrayLength/2))){
      finalRemark = "Good Memory!";
    }
    else if (totalMoves <= (totalArrayLength+((totalArrayLength*3)/2))){
      finalRemark = "Nice Memory!";
    }
    else{
      finalRemark = "Try Hard!";
    }

    //container to hold the win sequence
    winDiv.classList.add("winContainer");
    var winText1 = createParagraph("Congratulation!");
    var winText3 = createParagraph(finalRemark);
    var winText2 = createParagraph("You have Completed the game in " + totalMoves + " Moves and Matched " + totalArrayLength +" tiles");
    winText1.classList.add("win1");
    winText2.classList.add("win2");
    winText3.classList.add("win3");
    winDiv.appendChild(winText1);
    winDiv.appendChild(winText2);
    winDiv.appendChild(winText3);
    document.body.appendChild(winDiv);
  }
}

//the below function flips the tiles and also checks if they are same
function flipTiles(tile,value)
{
  //the below classes are toggled to reveal and hide the tiles
  let front = "front"+tile.id;
  let back = "back"+tile.id;
  let tileFront = document.getElementById(front);
  let tileBack = document.getElementById(back);
  tileFront.classList.remove("front");
  tileBack.classList.add("back");
  //checks conditions for matching the tile
  //if the tile is already matched and if the reference array has only 2 values
  if(tileBack.innerHTML == "" && memoryValues.length < 2)
  {
    var selectAudio = createAudio("Audio/Pop Clip In-SoundBible.com-583746573.wav");
    selectAudio.play();
    //the first clicked tile name is stored in the reference array
    if(memoryValues.length == 0)
    {
      memoryValues.push(value.name);
      tileId.push(tile.id);
      //the second clicked tile name is stored in the reference array
    } else if(memoryValues.length == 1)
    {
      memoryValues.push(value.name);
      tileId.push(tile.id);
      //checks if tiles are the same
      if(memoryValues[0] == memoryValues[1])
      {
        setTimeout(function()
        {
          var correctAudio = createAudio("Audio/Mario_Jumping-Mike_Koenig-989896458.wav");
          correctAudio.play();
        },500);
        flippedTiles += 2;
        // Clear both arrays
        memoryValues = [];
        tileId = [];
        // If the game board tiles are matched completed levelEndSequence is called
        setTimeout(function ()
        {
          if(flippedTiles == currentArraylength)
          {
            levelEndSequence();
          }
        },600);
      }
      else {
        function flipBack()
        {
          var incorrectAudio = createAudio("Audio/Strong_Punch-Mike_Koenig-574430706.wav");
          incorrectAudio.play();
          // Flip the 2 tiles back over
          var tile1Back = document.getElementById("back"+tileId[0]);
          var tile2Back = document.getElementById("back"+tileId[1]);
          var tile1Front = document.getElementById("front"+tileId[0]);
          var tile2Front = document.getElementById("front"+tileId[1]);
          tile1Back.innerHTML = "";
          tile2Back.innerHTML = "";
          tile1Front.classList.toggle("front");
          tile2Front.classList.toggle("front");
          tile1Back.classList.toggle("back");
          tile2Back.classList.toggle("back");
          // Clear both arrays
          memoryValues = [];
          tileId = [];
        }
        //delays flipback function so that the second tiles is revealed for some time
        setTimeout(flipBack,500);
      }
    }
    movesCounter();
  }
}

//This function will create the game area and calls the necessary functions to run the game
function game()
{
  //clears HTML before generating game
  document.body.innerHTML="";
  //creting game heading
  createHeading("Memory Game");
  //Score Elements are created and are placed in a container
  var scoreElements = createDiv();
  //stars section and stars are created
  var star1Div = createDiv();
  star1Div.id = "star1";
  star1Div.classList.add("showStar");
  var star2Div = createDiv();
  star2Div.id = "star2";
  star2Div.classList.add("showStar");
  var star3Div = createDiv();
  star3Div.id = "star3";
  star3Div.classList.add("showStar");
  var starsDiv = createDiv();
  starsDiv.classList.add("starsContainer");
  starsDiv.appendChild(star1Div);
  starsDiv.appendChild(star2Div);
  starsDiv.appendChild(star3Div);
  //timer section is created
  var timmerDiv = createDiv();
  timmerDiv.classList.add("timmer");
  timmerDiv.innerHTML = "Timer: 0 mins 0 secs";
  //moves section is created
  var movesDiv = createDiv();
  movesDiv.classList.add("moves");
  movesDiv.id = "movesId";
  movesDiv.innerHTML = "Moves: 0"

  scoreElements.classList.add("scoreElementsContainer")
  scoreElements.appendChild(starsDiv);
  scoreElements.appendChild(timmerDiv);
  scoreElements.appendChild(movesDiv);
  document.body.appendChild(scoreElements);


  //creates game board
  var gameBoardDiv = createDiv();
  gameBoardDiv.classList.add("gameBoardDiv");
  if (window.matchMedia('screen and (max-width: 825px)').matches) {
    window.divWidth = (70)*(noOfTilesInGridRow);
    gameBoardDiv.style.width = divWidth+"px";
    document.body.appendChild(gameBoardDiv);
  }
  else {
    window.divWidth = (140)*(noOfTilesInGridRow);
    gameBoardDiv.style.width = divWidth+"px";
    document.body.appendChild(gameBoardDiv);
  }
  //assigning width to game board depending on array length


  //calling the shuffle function
  memoryTilesArray.ShuffleTiles();

  //creating tiles for the game
  for(let i = 0; i < currentArraylength; i++)
  {
    var tiles = createDiv();
    tiles.classList.add("tile");
    tiles.id = i;
    let tileFront = createDiv();
    tileFront.id = "front"+i;
    let tileBack = createDiv();
    let val = memoryTilesArray[i];
    //tile is assigned with the value which will be visible and revealed at the starting of the game
    tileBack.style.background = "url("+ val.img +") no-repeat center center";
    tileBack.style.backgroundSize = "100%";
    tileBack.classList.add("back");
    tileBack.id = "back"+i;
    //reveals the tiles and hides them for defined time for each level
    setTimeout(function()
    {
      tileBack.classList.remove("back");
      tileFront.classList.add("front");
    },delay);
    //adds front and back of the cards
    tiles.appendChild(tileFront);
    tiles.appendChild(tileBack);
    //Calling the function flipTiles when a tile is clicked
    tiles.addEventListener('click', function()
    {
      flipTiles(this,val);
    });
    gameBoardDiv.appendChild(tiles);
  }
}

//This function increases the levels after each game and defines the values for each level of the game from level 1 to level 14
function levelSelector()
{
  level ++;
  if(level == 1){
    memoryTilesArray = gameTiles[0];
    currentArraylength = 4;
    noOfTilesInGridRow = 2;
    delay = 1000;
    game();
  }
  if(level == 2)
  {
    memoryTilesArray = gameTiles[1];
    currentArraylength = 4;
    noOfTilesInGridRow = 2;
    delay = 1200;
    game();
  }
  if(level == 3)
  {
    memoryTilesArray = gameTiles[0];
    currentArraylength = 6;
    noOfTilesInGridRow = 3;
    delay = 1500;
    game();
  }
  if(level == 4)
  {
    memoryTilesArray = gameTiles[1];
    currentArraylength = 6;
    noOfTilesInGridRow = 3;
    delay = 1700;
    game();
  }
  if(level == 5)
  {
    memoryTilesArray = gameTiles[0];
    currentArraylength = 8;
    noOfTilesInGridRow = 4;
    delay = 1900;
    game();
  }
  if(level == 6)
  {
    memoryTilesArray = gameTiles[1];
    currentArraylength = 8;
    noOfTilesInGridRow = 4;
    delay = 2500;
    game();
  }
  if(level == 7)
  {
    memoryTilesArray = gameTiles[0];
    currentArraylength = 12;
    noOfTilesInGridRow = 4;
    delay = 2600;
    game();
  }
  if(level == 8)
  {
    memoryTilesArray = gameTiles[1];
    currentArraylength = 12;
    noOfTilesInGridRow = 4;
    delay = 2800;
    game();
  }
  if(level == 9)
  {
    memoryTilesArray = gameTiles[0];
    currentArraylength = 16;
    noOfTilesInGridRow = 4;
    delay = 3900;
    game();
  }
  if(level == 10)
  {
    memoryTilesArray = gameTiles[1];
    currentArraylength = 16;
    noOfTilesInGridRow = 4;
    delay = 4200;
    game();
  }
  if(level == 11)
  {
    memoryTilesArray = gameTiles[0];
    currentArraylength = 20;
    noOfTilesInGridRow = 5;
    delay = 4400;
    game();
  }
  if(level == 12)
  {
    memoryTilesArray = gameTiles[1];
    currentArraylength = 20;
    noOfTilesInGridRow = 5;
    delay = 4700;
    game();
  }
  if(level == 13)
  {
    memoryTilesArray = gameTiles[0];
    currentArraylength = 24;
    noOfTilesInGridRow = 6;
    delay = 5000;
    game();
  }
  if(level == 14)
  {
    memoryTilesArray = gameTiles[1];
    currentArraylength = 24;
    noOfTilesInGridRow = 6;
    delay = 5400;
    game();
  }
}
//starts the function game when the HTML page loads
window.onload = levelSelector;
