# Project Name - Memory Matching Game
- The memory game is a indulging process that will stimulate your memory power. The game has several tiles generated on the screen. Each tile has an object that is hidden, among these hidden objects there are pairs. When an player clicks on a tile, the tile will flip and the object will be revealed. If the player successfully selects tiles with similar objects one after the other, a match will be made and the tiles will remain revealed for the rest of the game, otherwise both tiles will be flipped back.
- For my game all odd levels, such as 1,3,5..., are going to have pair of tiles similar chemical element its symbol and name.
- All the odd levels have the pairing tiles with symbol in one tile and name on the other. If the symbol and the name are a match, then a match is said to be succefully made.
- To win the game a player has to successfully match all the tiles in the game board.

## Main APIs:
### ShuffleTiles
- This API will shuffle the elments of an array and stores them in the same array for the defined length.

### startTimer
- This API runs the game timer and inserts the values into the gameTiles

### movesCounter
- This API keeps track of the no.of moves made in the game and add them on the HTML page.
- This API also decides the star rating based on the number of moves made for completion of level.
- The API also decides the comment for the user memory ability.

### levelEndSequence
- This API generates the end level sequence for the game after it is completed.
- This API also reset the variables for the game such as sec, minutes and other game variables.
- This API also generates button to move to next level or to replay the level.
- This API also checks if all the levels are cleared and generated the end game stats and text.

### flipTiles
- This flips the clicked tiles and reveals the tiles for the user.
- Then checks if two tiles are selected. If two tiles are selected then it runs a sequence of code to check for matching tiles.
- If matching then tiles are freezed, if not them they are flipped back.
- This also starts the movesCounter on each clicked.

### game
- This is a mojor API that creates all the game elements required for the game.
- It creates the game heading.
- It creates the game star elements.
- It creates the game timer div to add timer.
- It creates the move division to add moves of the game.
- It creates the game division and tiles.
- The shuffle array API is called and the tiles values are shuffled.
- The values are added to the tiles back face.
- The classes are added to the tiles.
- The tiles are revealed at the beginning of the game for a brief amount of time.
- The gameDiv length is adjusted based on the tiles length and screen size.
- The tiles are added with on click functionality.

### levelSelector
- The level is incremented after each level.
- The variables for ecah level are defined.
- 14 levels are created in this set of insructions.
- The array with values is stored in a refrence array for odd levels and even levels.


## Minimum Requirements
1.System installed with OS.

2.WEb browser compatible with HTML5.


## Installing
Open Index HTML document in web browser.
