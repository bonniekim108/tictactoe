angular
    .module('tttApp')
    .controller('TttController', TttController);
    TttController.$inject = ['$firebase', '$scope'];  


   //"the container for the rest of the stuff"
function TttController($firebase, $scope) {    

    function getGame() {
        var ref = new Firebase('https://tttgameapp.firebaseio.com/tttgame');
        var game = $firebase(ref).$asObject();
        return game;
    }


    var self = this;
    self.startGame = startGame;
    self.endGame = false;
    self.resetGame = resetGame;
    self.playGrid = playGrid;
    self.isSet = isSet;
    self.tieGame = tieGame;
    self.chooseCell = null;
    self.currentPlayer = null;

    self.isPlayerChosen = function() {
        return !self.currentPlayer;
    };    

    $scope.$watch('playerX', playerChosen);
    $scope.$watch('playerO', playerChosen);

    function playerChosen(newValue, oldValue) {
        self.currentPlayer = newValue;
    };


function startGame() {

    self.gameBoard = [["", "", ""], ["", "", ""], ["", "", ""]]; //empty gameboard at the start of each game"
    self.xturn = true;  
    self.oturn = false;
    self.endGame = false;
}   



function playGrid(row, column) {       //turn-taking between players
    if (self.endGame === true) {
        alert('game ended');
        return;
    }


    if(self.xturn === true) {
        self.gameBoard[row][column] = "x";
    }  else {
        self.gameBoard[row][column] = "o";
    }

   
    if (isWinner('x') === true) {
        alert('X won');
        self.endGame = true;
        return;
    }

    if (isWinner('o') === true) {
        alert('O won');
        self.endGame = true;
        return;
    }

    if (tieGame() === true) {
        alert('Game was tied');
        self.endGame = true;
        return;
    }

    if (!gridHasEmptyField()) {

    }

    self.xturn = !self.xturn;

    }

function gridHasEmptyField () {
    var result = false,
        grid = self.gameBoard;

    for (var i = (grid.length - 1); i >= 0; --i) {
        var element = grid[i];

        for (var j = (element.length - 1); j >=0; --j) {
            result = grid[i][j] == "";

            if (result)
                return true;
        };

    };

    return result;

};    

function resetGame() {              //when players press "reset" button, gameboard becomes empty again
    self.gameBoard = [["", "", ""], ["", "", ""], ["", "", ""]];
    self.xturn = false;
    self.oturn = false;
}

function isSet(something, square) {
    return (something & square) == square;
}

//conditions for "x" to win the game
function isWinner(player) {

    for (var i = 0; i < 3; i++) {

        for (var j = 0; j < 3; j++) {

            if(self.gameBoard[0][0] == player && 
            self.gameBoard[0][1] == player && self.gameBoard[0][2] == player) {
                return true;
                              
            } 

            if(self.gameBoard[1][0] == player && 
            self.gameBoard[1][1] == player && self.gameBoard[1][2] == player) {
                return true; 
                              
            }

            if(self.gameBoard[2][0] == player &&
            self.gameBoard[2][1] == player && self.gameBoard[2][2] == player) {
                return true; 
                              
            }

            if(self.gameBoard[0][0] == player &&
             self.gameBoard[1][0] == player && self.gameBoard[2][0] == player) {
                return true;   
                             
            }

            if(self.gameBoard[1][0] == player &&
            self.gameBoard[1][1] == player && self.gameBoard[1][2] == player) {
                return true;    
                              
            }
            if(self.gameBoard[2][0] == player &&
            self.gameBoard[2][1] == player && self.gameBoard[2][2] == player) {
                return true;
                                    
            }
            if(self.gameBoard[0][0] == player &&
            self.gameBoard[1][1] == player && self.gameBoard[2][2] == player) {
                return true;
                               
            }
            if(self.gameBoard[0][2] == player &&
             self.gameBoard[1][1] == player && self.gameBoard[2][0] == player) {
                return true; 
                                 
            }
        }    
    }

    return false;
}      

            // tie in the game
function tieGame() {

    
    for (var i = 0; i < 3; i++) {

        for (var j = 0; j < 3; j++) {            
            if (((self.gameBoard[0][0] == "x") || (self.gameBoard[0][0] == "o")) &&
                ((self.gameBoard[0][1] == "x") || (self.gameBoard[0][1] == "o")) &&
                ((self.gameBoard[0][2] == "x") || (self.gameBoard[0][2] == "o")) &&
                ((self.gameBoard[1][0] == "x") || (self.gameBoard[1][0] == "o")) &&
                ((self.gameBoard[1][1] == "x") || (self.gameBoard[1][1] == "o")) &&
                ((self.gameBoard[1][2] == "x") || (self.gameBoard[1][2] == "o")) &&
                ((self.gameBoard[2][0] == "x") || (self.gameBoard[2][0] == "o")) &&
                ((self.gameBoard[2][1] == "x") || (self.gameBoard[2][1] == "o")) &&
                ((self.gameBoard[2][2] == "x") || (self.gameBoard[2][2] == "o"))) {
                    return true;
                }

            }                   
        }

            return false;
        };
}





