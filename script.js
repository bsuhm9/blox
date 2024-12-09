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
    this.currentTurn = false;
    this.moveDirection = "All";
    this.score = 0;
  }

  beginTurn() {
    this.currentTurn = true;
  }

  endTurn() {
    this.currentTurn = false;
  }

  getTurn() {
    return this.currentTurn;
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
  }
}

class Board {
  constructor() {
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
      debug ? console.log(Math.abs(outcome)) : "";
    });

    this.currentSquare = 0;
  }

  getRandomInt(min, max) {
    //get a random integer inclusive of the min and max values
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  buildBoard() {
    //build a grid of 81 squares or 9x9 board filled with random values ranging from -9 to 9
    // for (let i = 0; i < 9; i++) {
    //   for (let j = 0; j < 9; j++) {
    //     //exclude 0 from possible values for populating the grid as we want to psuedo-mimic a Sudoku board.
    //     let outcome = this.getRandomInt(-9, 9);
    //     while(outcome === 0)
    //     {
    //         outcome = this.getRandomInt(-9,9);
    //     }
    //     //once the value is obtained, populate the square
    //     this.grid[i][j] = outcome;
    //     console.log(cellNum);
    //     //const square = document.getElementById(`${cellNum}`);
    //     //console.log(square);
    //   }
    // }
  }
}

const player1 = new Player("Fred");
const player2 = new Player("Wilbur");

player1.beginTurn();
//console.log(player1.getTurn());

let bloxBoard; // = new Board();

//bloxBoard.buildBoard();

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

// Attach one listener that will detect clicks on any of the <td> elements.
const tdElem = document.querySelector("table");

//add the event listener with the event and delegation to the tagName
tdElem.addEventListener("click", (event) => {
  if (event.target.tagName === "TD") {
    //change value to integer, update player score, and set the current squaure
    cellValue = parseInt(event.target.innerHTML);

    //hangle the negative values correctly even though they don't include the (-)
    debug ? console.log(event.target.classList.value) : '';

    if (event.target.classList.value === "negative") {
      cellValue *= -1;
    }

    player1.addToScore(cellValue);
    debug ? console.log(player1.getScore()) : "";
    bloxBoard.currentSquare = event.target.id;

    //remove the cell value when clicked
    event.target.innerHTML = "";
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
    //name values are valid, create the board
    bloxBoard = new Board();

    debug ? console.log("Good Form") : "";

    //show the board and update the button text
    tableElement.classList.remove("hidden");
    playButton.value = "Restart";

    e.preventDefault();
  } else {
    e.preventDefault();
    debug ? console.log("Bad Form") : "";
  }
});
