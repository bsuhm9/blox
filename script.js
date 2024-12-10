const debug = true;
const form = document.getElementById("bloxForm");
const player1Name = document.getElementById("player1");
const player2Name = document.getElementById("player2");
const playButton = document.getElementById("playBtn");
const tableElement = document.getElementById("bloxTable");

class Player {
  //Class to hold details about each blox player.
  //Includes name, score, determining if it their turn, and other specifics
  constructor(name) {
    this.name = name;
    this.moveDirection = "All";
    this.score = 0;
  }

  getScore() {
    return this.score;
  }

  addToScore(value) {
    //increment player score ignoring blank values
    if (isNaN(value)) {
    } else {
      this.score += value;
    }


    if(bloxBoard.currentPlayer === 1){
        const score1El = document.getElementById('player1Score')
        score1El.innerHTML = this.score;
    }else{
        const score2El = document.getElementById('player2Score')
        score2El.innerHTML = this.score;
    }
    
  }
}

class Board {
  constructor() {
    this.currentSquare = -1;
    this.currentRow = -1;
    this.currentCol = -1;
    this.lastSquare = -1;
    this.lastRow = -1;
    this.lastCol = -1;
    this.currentPlayer = 1;
    this.moveCount = 0;

    //grab all the table cells
    const bloxTable = document.querySelectorAll("td");
    bloxTable.forEach((cell) => {
      //loop the cells and populate with a non-zero random integer
      //exclude 0 from possible values for populating the grid as we want to psuedo-mimic a Sudoku board.
      let outcome = this.getRandomInt(-9, 9);
      while (outcome === 0) {
        outcome = this.getRandomInt(-9, 9);
      }

      //remove the (-) symbol and simply show red numbers
      if (outcome < 0) {
        cell.classList.add("negative");
      }
      //display the value on the board
      cell.innerHTML = Math.abs(outcome);

    });

    this.table = bloxTable;


  }

  getRandomInt(min, max) {
    //get a random integer inclusive of the min and max values
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  switchTurns() {
    if (this.currentPlayer === 1) {
      this.currentPlayer = 2;
    } else {
      this.currentPlayer = 1;
    }
  }

  clearValid()  {
    this.table.forEach((cell) => {
        //loop the cells and clear the "valid class", removing the background cell shading
        cell.classList.remove('valid');
      });
  }

  validSquare(cell) {
    let isValid = false;

    log(`previous: ${this.lastRow},${this.lastCol}, current: ${this.currentRow}, ${this.currentCol} (${cell.id})`);

    const rowEl = document.querySelectorAll(`[data-row="${this.currentRow}"`);
    const colEl = document.querySelectorAll(`[data-col="${this.currentCol}"`);

    if (
        Number.isNaN(parseInt(cell.innerHTML)) //cell is blank
        //||
      ) {
        isValid = false;
        return isValid;
      }

    if (this.moveCount > 1) {
        
        if(this.currentPlayer === 1){
            if(player1.moveDirection === 'Horizontal' && this.lastRow === this.currentRow){
                isValid = true;
                this.clearValid();

                colEl.forEach((cell) => {
                    cell.classList.add("valid");
                  });
            }
            if (player1.moveDirection === 'Vertical' && this.lastCol === this.currentCol) {
                isValid = true;
                this.clearValid();

                rowEl.forEach((cell) => {
                    cell.classList.add("valid");
                  });
            } 

            }
            else{
                if(player2.moveDirection === 'Horizontal' && this.lastRow === this.currentRow){
                    isValid = true;
                    this.clearValid();
    
                    colEl.forEach((cell) => {
                        cell.classList.add("valid");
                      });
                }
                if (player2.moveDirection === 'Vertical' && this.lastCol === this.currentCol) {
                    isValid = true;
                    this.clearValid();
    
                    rowEl.forEach((cell) => {
                        cell.classList.add("valid");
                      });
                } 
            }

        }
        
  

    //on move 2, allow any square in the row/col of the first move
    if (
      this.moveCount === 1 &&
      (this.lastRow === this.currentRow || this.currentCol === this.lastCol)
    ) {
      isValid = true;
      this.clearValid();

      //player 2 chose a horizontal move
      if (this.lastRow === this.currentRow) {
        player2.moveDirection = "Horizontal";
        player1.moveDirection = "Vertical";

        colEl.forEach((cell) => {
            cell.classList.add("valid");
          });


      } else {
        //player 2 chose a vertical move
        player2.moveDirection = "Vertical";
        player1.moveDirection = "Horizontal";
        
        rowEl.forEach((cell) => {
            cell.classList.add("valid");
          });
      }

      log(`Player1 Direction: ${player1.moveDirection}`);
      log(`Player2 Direction: ${player2.moveDirection}`);
    }

    //allow any square on the first move
    if (this.moveCount === 0) {
      isValid = true;

      rowEl.forEach((cell) => {
        cell.classList.add("valid");
      });

      colEl.forEach((cell) => {
        cell.classList.add("valid");
      });
    }

    return isValid;
  }


}


setTimeout(function () {
    const notice = document.getElementById('rules-notice');
    //notice.classList.remove('bg-warning');
    //notice.classList.remove('py-3');
    notice.classList.add('hidden');
    
    //console.log(notice);
}, 20000);

const getCurrentPlayer = () => {
  if (bloxBoard.currentPlayer === 1) {
    return player1;
  } else {
    return player2;
  }
};

//Console log debuggin into while global variable is set accordingly
const log = (output) => {
  debug ? console.log(output) : "";
};

const player1 = new Player();
//player1.currentTurn = true;
const player2 = new Player();
const bloxBoard = new Board();

/*
00 01 02 03 04 05 06 07 08
09 10 11 12 13 14 15 16 17
18 19 20 21 22 23 24 25 26
27 28 29 30 31 32 33 34 35
36 37 38 39 40 41 42 43 44
45 46 47 48 49 50 51 52 53
54 55 56 57 58 59 60 61 62
63 64 65 66 67 68 69 70 71
72 73 74 75 76 77 78 79 80
*/

const gamePlayControl = () => {
  //Holds the main logic to handle the blox game
  //firstMove(player1);
  //secondMove(player2);
  //routineMove();
};

const firstMove = (player) => {
  //Handles the particulars of the first move
  player1.beginTurn();
  //do stuff
  //player1.endTurn();
};

const secondMove = (player) => {
  //Handles the particulars of the first move
  //player2.beginTurn();
  //do stuff
  //set player.moveDirection for both participants
  //player2.endTurn();
};

const routineMove = () => {
  //Handles the particulars of all subsequent moves
};

// Attach one listener that will detect clicks on any of the <td> elements.
const tdElem = document.querySelector("table");

//add the event listener with the event and delegation to the tagName
tdElem.addEventListener("click", (event) => {
  if (event.target.tagName === "TD") {

    //set the current squaure, determine the row/column
    bloxBoard.currentSquare = event.target.id;
    bloxBoard.currentRow = parseInt(event.target.dataset.row);
    bloxBoard.currentCol = parseInt(event.target.dataset.col);

    //is this a valid square to be clicked?
    //add logic here (should have innerHTML/number, )
    if (bloxBoard.validSquare(event.target)) {

      //change value to integer and remove the cell value when clicked
      cellValue = parseInt(event.target.innerHTML);
      event.target.innerHTML = "";
 
      //handle the negative values correctly even though they don't include the (-), remove negative class after it is used
      if (event.target.classList.value.toString().includes("negative")) {
        cellValue *= -1;
        event.target.classList.remove("negative");
      }

      //update player score
      getCurrentPlayer().addToScore(cellValue);

      log(getCurrentPlayer());
      log(getCurrentPlayer().getScore());

      //end turn
      bloxBoard.moveCount++;
      bloxBoard.lastSquare = bloxBoard.currentSquare;
      bloxBoard.lastRow = bloxBoard.currentRow;
      bloxBoard.lastCol = bloxBoard.currentCol;
      bloxBoard.switchTurns();
    }
  }
});

//Validate player name requirements
const validLength = (input, min) => {
  if (input.value.trim().length > min) {
    input.parentElement.classList.remove("invalid");
    return true;
  } else {
    input.parentElement.classList.add("invalid");
    return false;
  }
};

//Form submission
form.addEventListener("submit", (e) => {
  if (validLength(player1Name, 3) && validLength(player2Name, 3)) {
    //name values are valid, show the board
    log("Good Form");

    //load the players
    player1.name = player1Name.value;
    player2.name = player2Name.value;

    //show the board and update the button text
    tableElement.classList.remove("hidden");
    playButton.style.visibility = 'hidden';

    //start the game
    gamePlayControl();
    e.preventDefault();
  } else {
    e.preventDefault();
    log("Bad Form");
  }
});
