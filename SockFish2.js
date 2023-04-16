import { Chess } from 'chess.js';
//import {Chessboard} from '@chrisoakman/chessboardjs'
import create from 'prompt-sync';

const prompt = create();
//const Chess = require("chess.js");

const chess = new Chess();
//var chessBoard = new Chessboard('myBoard');
let isComputerPlayingBlack = true;
// var config = {
//     draggable: true,
//     position: 'start',
//     onDragStart: onDragStart,
//     onDrop: onDrop,
//     onSnapEnd: printBoard
//   };

const pieceValues = [1,3,3,5,9, 900];
let whitePieces = [0,0,0,0,0,0]; // Element 0 - Pawns, Element 1 - Knight, Element 2 - Bishop, Element 3 - Rook, Element 4 - Queen, Element 5 King
let blackPieces = [0,0,0,0,0,0]; // Element 0 - Pawns, Element 1 - Knight, Element 2 - Bishop, Element 3 - Rook, Element 4 - Queen, Element 5 King

const depth = 3;

if(prompt("Play as W or B? ") == 'B'){
    isComputerPlayingBlack = false;
    calculateMove(); // Let compueter makes first move
    printBoard();
}

while (!chess.isGameOver()){
    getInput();
    printBoard();
    calculateMove();
    printBoard();
}

function getPiece(piece){
    if (piece === null) {
        return 0;
    }
    var value = 0;
        if (piece.type === 'p') {
            value = pieceValues[0];
        } else if (piece.type === 'r') {
            value =  pieceValues[1];
        } else if (piece.type === 'n') {
            value =  pieceValues[2];
        } else if (piece.type === 'b') {
            value = pieceValues[3] ;
        } else if (piece.type === 'q') {
            value = pieceValues[4];
        } else if (piece.type === 'k') {
            value = pieceValues[5];
        }

        if (piece.color === 'b'){
            value *= -1;
        }
        return value;
}

function getPieces(posistion){
    
    whitePieces = [0,0,0,0,0,0];
    blackPieces = [0,0,0,0,0,0];
    
    for (let i = 0; i < posistion.length; i++) {
        for (let j = 0; j < posistion[i].length; j++) {
                if(posistion[i][j] != null){
                if (posistion[i][j]["type"] === "p"){
                    if (posistion[i][j]["color"] === "b"){
                            blackPieces[0]++
                        }else{
                            whitePieces[0]++
                        }
                }
                else if (posistion[i][j]["type"] === "n"){
                     if (posistion[i][j]["color"] === "b"){
                            blackPieces[1]++
                        }else{
                            whitePieces[1]++
                        }
                }
                else if (posistion[i][j]["type"] === "b"){
                    if (posistion[i][j]["color"] === "b"){
                            blackPieces[2]++
                        }else{
                            whitePieces[2]++
                        }
                }
                else if (posistion[i][j]["type"] === "r"){
                    if (posistion[i][j]["color"] === "b"){
                            blackPieces[3]++
                        }else{
                            whitePieces[3]++
                        }
                }
                else if (posistion[i][j]["type"] === "q"){
                    if (posistion[i][j]["color"] === "b"){
                            blackPieces[4]++
                        }else{
                            whitePieces[4]++
                        }
                }
                else if (posistion[i][j]["type"] === "k"){
                    if (posistion[i][j]["color"] === "b"){
                            blackPieces[5]++
                        }else{
                            whitePieces[5]++
                        }
                }
            }  
        }
    }     

}

// Ok so basically the two main functions are evaluate which will determine which posistion is winning and negamax that will search through all of those posistions
function evaluate(posistion){

     getPieces(posistion);
    
    const materialScore =   pieceValues[0] * (whitePieces[0]-blackPieces[0]) + 
                            pieceValues[1] * (whitePieces[1]-blackPieces[1]) + 
                            pieceValues[2] * (whitePieces[2]-blackPieces[2]) + 
                            pieceValues[3] * (whitePieces[3]-blackPieces[3]) + 
                            pieceValues[4] * (whitePieces[4]-blackPieces[4]) + 
                            pieceValues[5] * (whitePieces[5]-blackPieces[5]);

                        /*

   var materialScore = 0;
   for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
        if (posistion[i][j] != null){
            materialScore += getPiece(posistion[i][j]);
        }
        
    }
``}
                        */
                           
    // let relativeComputer; // +1 if Computer is White, -1 If Computer Is black
    
    // if (!isComputerPlayingBlack){ // Playing White
    //     relativeComputer = 1;
    // }
    // else{
    //     relativeComputer = -1; // Playing Black
        
    // }
    
    return materialScore;
}
// will negamax return the numberical evaluation of (thats the)
// function maxPlayerValue(posistion, depth, alpha, beta){
//     if (depth == 0){
//         //console.log(chess.ascii());
//         //console.log(chess.fen());
//         let s = evaluate(posistion);
//         //console.log(s);
//         return evaluate(s);
//     }
//     let bestSoFar = -999999;
//     chess.moves().forEach(element => {
//         chess.move(element);
//         let response = minPlayerValue(posistion,depth-1, alpha, beta);
//         chess.undo();
//         if (response > bestSoFar){
//             bestSoFar = response;
//             alpha = Math.max(alpha, bestSoFar)
//             if (alpha >= beta){
//                 return bestSoFar;
//             }
//         }
        
//     });
    
// }
//     function alphaBetaMax(posistion, depth, alpha, beta){
//         if (depth == 0) return evaluate(posistion);
    
//         chess.moves().forEach(element => {
//             chess.move(element);
//             let score = alphaBetaMin(posistion, depth-1, alpha, beta);
//             chess.undo();
//             if (score < beta){
//                 return beta;
//             }
//             if (score > alpha){
//                 alpha = score;
//             }
//         });
//         return alpha;
//     }

//     function alphaBetaMin(posistion, depth, alpha, beta){
//         if (depth == 0) return -evaluate(posistion);
        
//         chess.moves().forEach(element => {
//             chess.move(element);
//             let score = alphaBetaMax(posistion,depth-1, alpha, beta);
//             chess.undo();
//             if (score <= alpha){
//                 return alpha;
//             }
//             if (score > beta){
//                 beta = score;
//             }
            
//         });
//     //console.log("Score: " + score);
//     return beta;
//     }

//     function minPlayerValue(posistion, depth, alpha, beta){
//         if (depth == 0){
//             //console.log(chess.ascii());
//             //console.log(chess.fen());
//             let s = evaluate(posistion);
//             //console.log(s);
//             return evaluate(s);
//         }
//         let bestSoFar = 999999;
//         chess.moves().forEach(element => {
//             chess.move(element);
//             let response = maxPlayerValue(posistion,depth-1, alpha, beta);
//             chess.undo();
//             if (response < bestSoFar){
//                 bestSoFar = response;
//                 alpha = Math.min(alpha, bestSoFar)
//                 if (alpha >= beta){
//                     return bestSoFar;
//                 }
//             }
            
    
//             return bestSoFar;
//         });
//         //console.log("Score: " + score);
//         return bestSoFar;
//     }





function calculateMove(){ // Ref website https://www.freecodecamp.org/news/simple-chess-ai-step-by-step-1d55a9266977/
    
    const legalMoves = chess.moves();
    var moveRatings = [];
    var ref = 0;
    var refIndex = 0;
    for (let x = 0; x < legalMoves.length; x++){
        chess.move(legalMoves[x]);
        const board = chess.board();
        var rating = evaluate(board);
        chess.undo();
        moveRatings.push(rating);

        if (isComputerPlayingBlack){
            if (rating < ref){ // Find smallest number
                ref = rating; // Update ref as newest lowest value
                refIndex = x;
            }
        }
        else{
            if (rating > ref){ // Find biggest number
                ref = rating; // Update ref as newest lowest value
                refIndex = x;
            }
        
        }
    }
    console.log("Best Move Is " + legalMoves[refIndex]);
    chess.move(legalMoves[refIndex]);

}

function randomMove(){
    const moves = chess.moves();
    chess.move(moves[Math.floor(Math.random() * moves.length)]);
}

function printBoard(){
    
    console.log(chess.ascii());; // Print text version of chess board
    //chessBoard.posistion(chess.fen());
}

function getInput(){
    let bool = true;
    let x = prompt("Enter Move: ");
    
    while (bool){
        if (x == "q"){
            throw new Error(); // Quits Program By Force
        }
        if (x == 'e'){
            console.log("Eval: " + evaluate(chess.board()));
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
    // // UI Stuff
    //      function onDragStart (source, piece, position, orientation) {
    //          // do not pick up pieces if the game is over
    //          if (game.game_over()) return false
           
    //          // only pick up pieces for the side to move
    //          if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
    //              (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    //            return false
    //          }
    //        }
           
    //        function onDrop (source, target) {
    //          // see if the move is legal
    //          var move = game.move({
    //            from: source,
    //            to: target,
    //            promotion: 'q' // NOTE: always promote to a queen for example simplicity
    //          })
           
    //          // illegal move
    //          if (move === null) return 'snapback'
           
    //          updateStatus()
    //        }
           
           // update the board position after the piece snap
           // for castling, en passant, pawn promotion
        //    function onSnapEnd () {
        //      printBoard();
        //    }
           
           function updateStatus () {
             var status = ''
           
             var moveColor = 'White'
             if (game.turn() === 'b') {
               moveColor = 'Black'
             }
           
             // checkmate?
             if (game.in_checkmate()) {
               status = 'Game over, ' + moveColor + ' is in checkmate.'
             }
           
             // draw?
             else if (game.in_draw()) {
               status = 'Game over, drawn position'
             }
           
             // game still on
             else {
               status = moveColor + ' to move'
           
               // check?
               if (game.in_check()) {
                 status += ', ' + moveColor + ' is in check'
               }
             }
           }
