import { Chess } from 'chess.js';
import create from 'prompt-sync';

const prompt = create();
const chess = new Chess();
let isComputerPlayingWhite = true;

const negInf = -9999;
const inf = 9999;

const pieceValues = [1, 3, 3, 5, 9, 900];
let whitePieces = [0, 0, 0, 0, 0, 0]; // Element 0 - Pawns, Element 1 - Knight, Element 2 - Bishop, Element 3 - Rook, Element 4 - Queen, Element 5 King
let blackPieces = [0, 0, 0, 0, 0, 0]; // Element 0 - Pawns, Element 1 - Knight, Element 2 - Bishop, Element 3 - Rook, Element 4 - Queen, Element 5 King


// Begin Code
let engineDepth = prompt("What Engine Depth: ");
const a = prompt("Play as W or B? ");
if (a == 'B' || a == 'b') {

  console.log("Computer Is Playing White");
  isComputerPlayingWhite = true;
  computerMove(); // Let compueter makes first move
  printBoard();
}
else {
  isComputerPlayingWhite = false;
  console.log("Computer Is Playing Black")
}
console.log("Is Computer Playing White??? : " + isComputerPlayingWhite);

while (!chess.isGameOver()) {
  getInput();
  printBoard();
  computerMove();
  printBoard();
}

function getPieces(posistion) {
  whitePieces = [0, 0, 0, 0, 0, 0];
  blackPieces = [0, 0, 0, 0, 0, 0];

  for (let i = 0; i < posistion.length; i++) {
    for (let j = 0; j < posistion[i].length; j++) {
      if (posistion[i][j] != null) {
        if (posistion[i][j]["type"] === "p") {
          if (posistion[i][j]["color"] === "b") {
            blackPieces[0]++
          } else {
            whitePieces[0]++
          }
        }
        else if (posistion[i][j]["type"] === "n") {
          if (posistion[i][j]["color"] === "b") {
            blackPieces[1]++
          } else {
            whitePieces[1]++
          }
        }
        else if (posistion[i][j]["type"] === "b") {
          if (posistion[i][j]["color"] === "b") {
            blackPieces[2]++
          } else {
            whitePieces[2]++
          }
        }
        else if (posistion[i][j]["type"] === "r") {
          if (posistion[i][j]["color"] === "b") {
            blackPieces[3]++
          } else {
            whitePieces[3]++
          }
        }
        else if (posistion[i][j]["type"] === "q") {
          if (posistion[i][j]["color"] === "b") {
            blackPieces[4]++
          } else {
            whitePieces[4]++
          }
        }
        else if (posistion[i][j]["type"] === "k") {
          if (posistion[i][j]["color"] === "b") {
            blackPieces[5]++
          } else {
            whitePieces[5]++
          }
        }
      }
    }
  }
}

function evaluate() {
  getPieces(chess.board()); // gets total count of each type of pieces and by color

  const materialScore = 
    pieceValues[0] * (whitePieces[0] - blackPieces[0]) +
    pieceValues[1] * (whitePieces[1] - blackPieces[1]) +
    pieceValues[2] * (whitePieces[2] - blackPieces[2]) +
    pieceValues[3] * (whitePieces[3] - blackPieces[3]) +
    pieceValues[4] * (whitePieces[4] - blackPieces[4]) +
    pieceValues[5] * (whitePieces[5] - blackPieces[5]);

  return materialScore;
}

function computerMove() {
  const bestMove = calculateMove(isComputerPlayingWhite);
  console.log("Computer Move: " + bestMove);
  chess.move(bestMove);
}

function negamax(depth, isWhitePlaying){
  if (depth == 0 || chess.isGameOver()){
    const color = isWhitePlaying ? 1 : -1; // if true then multiply by one, if false then multiply by -1
    return color * evaluate();
  }
  const legalMoves = chess.moves();
  let score = negInf;
  legalMoves.forEach(element =>{ // Gets greatest score
    chess.move(element);
    score = Math.max(score, -negamax(depth-1, !isWhitePlaying));
    chess.undo();
  });
  return score;
}

function calculateMove(isWhiteToPlay) {  // setup root nodes
  const legalMoves = chess.moves();
  var moveRatings = [];
  var ref = negInf;
  var refIndex = 0;
  for (let x = 0; x < legalMoves.length; x++) {
    chess.move(legalMoves[x]);
    var rating = -negamax(engineDepth,!isWhiteToPlay);
    chess.undo();
    moveRatings.push(rating);
    if (rating > ref) {
      ref = rating;
      refIndex = x;
    }
  }
  console.log(legalMoves);
  console.log(moveRatings);

  return legalMoves[refIndex]
}

function printBoard() {
  console.log(chess.ascii());; // Print text version of chess board
}

function getInput() {
  let bool = true;
  let x = prompt("Enter Move: ");

  while (bool) {
    if (x == "q") {
      throw new Error(); // Quits Program By Force
    }
    if (x == 'e') {
      console.log("Eval: " + evaluate());
    }
    if (x == 'c') {
      console.log("SockFish thinks you should play: " + calculateMove(!isComputerPlayingWhite));
    }
    bool = false;
    try {
      chess.move(x);
    } catch (error) {
      x = prompt("Invalid Input: ");
      bool = true;
    }
  }
}
