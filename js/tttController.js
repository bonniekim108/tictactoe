angular
    .module('tttApp')
    .controller('TttController', TttController);
    TttController.$inject = ['$firebase', '$scope'];  


   //"the container for the rest of the stuff"
function TttController($firebase, $scope) {    


    function getGame() {
        var ref = new Firebase('https://tttgameapp.firebaseio.com/tttgame');
        var game = $firebase(ref).$asObject();
        game.board = [["", "", ""], ["", "", ""], ["", "", ""]];
        return game;
    }

    $scope.game = getGame();
    
    $scope.game.endGame = false;
    $scope.game.currentPlayer = null;
    $scope.game.$save();

    $scope.startGame = startGame;
    $scope.resetGame = resetGame;
    $scope.playGrid = playGrid;
    $scope.isSet = isSet;
    $scope.tieGame = tieGame;
    $scope.isPlayerChosen = false;
    $scope.playerChosen = playerChosen;
    $scope.isOWinner = isOWinner;
    $scope.isXWinner = isXWinner;


    $scope.isPlayerChosen = function() {
        return !$scope.game.currentPlayer;
    };    
    //$scope.$watch for monitoring scope values for changes//

    $scope.$watch('playerX', playerChosen);
    $scope.$watch('playerO', playerChosen);

    function playerChosen(newValue, oldValue) {
        $scope.game.currentPlayer = newValue;
    }; 


/*$scope.game.$loaded().then(  <--broken. Should stop players from choosing other sides' markers */
    
    function startGame() {

    $scope.game.board = [["", "", ""], ["", "", ""], ["", "", ""]]; //empty gameboard at the start of each game//
    $scope.game.xturn = true;  
    $scope.game.oturn = false;
    $scope.game.endGame = false;
    $scope.game.$save();
    $scope.tieGame = false;
}   


function playGrid(row, column) {       //turn-taking between players
    if ($scope.game.endGame === true) {
        alert('game ended');
        return;
    }

    if($scope.game.xturn) {
        $scope.game.board[row][column] = "x";

        $scope.currentPlayer = 'o';
        $scope.game.xturn = false;
        $scope.game.oturn = true;
        $scope.game.$save();
    }  
    else if ($scope.game.oturn){
        $scope.game.board[row][column] = "o";

        $scope.currentPlayer = 'x';
        $scope.game.xturn = true;
        $scope.game.oturn = false;
        $scope.game.$save();

    }

   
    if (isWinner('x') === true) {
        alert('X won');
        $scope.game.endGame = true;
        return;
    }

    if (isWinner('o') === true) {
        alert('O won');
        $scope.game.endGame = true;
        return;
    }

    if (tieGame() === true) {
        alert('Game was tied');
        $scope.game.endGame = true;
        return;
    }

    if (!gridHasEmptyField()) {

    }

    $scope.xturn = !$scope.xturn;

    $scope.game.$save();
    }

function gridHasEmptyField () {
    var result = false,
        grid = $scope.game.board;

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
    $scope.game.board = [["", "", ""], ["", "", ""], ["", "", ""]];
    $scope.game.xturn = false;
    $scope.game.oturn = false;
    $scope.game.$save();
}

function isSet(something, square) {
    return (something & square) == square;
}

//winning conditions

function isWinner(player) {
    console.log(player);
    for (var i = 0; i < 3; i++) {

        for (var j = 0; j < 3; j++) {

            if($scope.game.board[0][0] == player && 
            $scope.game.board[0][1] == player && $scope.game.board[0][2] == player) {
                return true;
                              
            } 

            if($scope.game.board[1][0] == player && 
            $scope.game.board[1][1] == player && $scope.game.board[1][2] == player) {
                return true; 
                              
            }

            if($scope.game.board[2][0] == player &&
            $scope.game.board[2][1] == player && $scope.game.board[2][2] == player) {
                return true; 
                              
            }

            if($scope.game.board[0][0] == player &&
             $scope.game.board[1][0] == player && $scope.game.board[2][0] == player) {
                return true;   
                             
            }

            if($scope.game.board[1][0] == player &&
            $scope.game.board[1][1] == player && $scope.game.board[1][2] == player) {
                return true;    
                              
            }
            if($scope.game.board[2][0] == player &&
            $scope.game.board[2][1] == player && $scope.game.board[2][2] == player) {
                return true;
                                    
            }
            if($scope.game.board[0][0] == player &&
            $scope.game.board[1][1] == player && $scope.game.board[2][2] == player) {
                return true;
                               
            }
            if($scope.game.board[0][2] == player &&
             $scope.game.board[1][1] == player && $scope.game.board[2][0] == player) {
                return true; 
                                 
            }
        }    
    }

    return false;
}      

function isXWinner () {
    return isWinner("x");
}

function isOWinner () {
    return isWinner("o");
}

//tie conditions
function tieGame() {    
    for (var i = 0; i < 3; i++) {

        for (var j = 0; j < 3; j++) {  
            console.log($scope.game)          
            if (
                (($scope.game.board[0][0] == "x") || ($scope.game.board[0][0] == "o")) &&
                (($scope.game.board[0][1] == "x") || ($scope.game.board[0][1] == "o")) &&
                (($scope.game.board[0][2] == "x") || ($scope.game.board[0][2] == "o")) &&
                (($scope.game.board[1][0] == "x") || ($scope.game.board[1][0] == "o")) &&
                (($scope.game.board[1][1] == "x") || ($scope.game.board[1][1] == "o")) &&
                (($scope.game.board[1][2] == "x") || ($scope.game.board[1][2] == "o")) &&
                (($scope.game.board[2][0] == "x") || ($scope.game.board[2][0] == "o")) &&
                (($scope.game.board[2][1] == "x") || ($scope.game.board[2][1] == "o")) &&
                (($scope.game.board[2][2] == "x") || ($scope.game.board[2][2] == "o"))
                ) {
                    return true;

                }

            }                   
        }

            return false;
        };
}





