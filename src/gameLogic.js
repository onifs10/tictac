// Javascript program to find the

// explanation of code can be found https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-3-tic-tac-toe-ai-finding-optimal-move/
import confetti from "canvas-confetti";


export class Move
{
    constructor()
    {
        let row,col;
    }
}
 
export const PLAYER = 'X', OPPONENT = 'O';
 
// This function returns true if there are moves
// remaining on the board. It returns false if
// there are no moves left to play.
export function isMovesLeft(board)
{
    for(let i = 0; i < 3; i++)
        for(let j = 0; j < 3; j++)
            if (board[i][j] == '')
                return true;
                 
    return false;
}

export function evaluate(b)
{
     
    // Checking for Rows for X or O victory.
    for(let row = 0; row < 3; row++)
    {
        if (b[row][0] == b[row][1] &&
            b[row][1] == b[row][2])
        {
            if (b[row][0] == PLAYER)
                return +10;
                 
            else if (b[row][0] == OPPONENT)
                return -10;
        }
    }
  
    // Checking for Columns for X or O victory.
    for(let col = 0; col < 3; col++)
    {
        if (b[0][col] == b[1][col] &&
            b[1][col] == b[2][col])
        {
            if (b[0][col] == PLAYER)
                return +10;
  
            else if (b[0][col] == OPPONENT)
                return -10;
        }
    }
  
    // Checking for Diagonals for X or O victory.
    if (b[0][0] == b[1][1] && b[1][1] == b[2][2])
    {
        if (b[0][0] == PLAYER)
            return +10;
             
        else if (b[0][0] == OPPONENT)
            return -10;
    }
  
    if (b[0][2] == b[1][1] &&
        b[1][1] == b[2][0])
    {
        if (b[0][2] == PLAYER)
            return +10;
             
        else if (b[0][2] == OPPONENT)
            return -10;
    }
  
    // Else if none of them have
    // won then return 0
    return 0;
}
 
// This is the minimax function. It
// considers all the possible ways
// the game can go and returns the
// value of the board
export function minimax(board, depth, isMax)
{
    let score = evaluate(board);
  
    // If Maximizer has won the game
    // return his/her evaluated score
    if (score == 10)
        return score;
  
    // If Minimizer has won the game
    // return his/her evaluated score
    if (score == -10)
        return score;
  
    // If there are no more moves and
    // no winner then it is a tie
    if (isMovesLeft(board) == false)
        return 0;
  
    // If this maximizer's move
    if (isMax)
    {
        let best = -1000;
  
        // Traverse all cells
        for(let i = 0; i < 3; i++)
        {
            for(let j = 0; j < 3; j++)
            {
                 
                // Check if cell is empty
                if (board[i][j]=='')
                {
                     
                    // Make the move
                    board[i][j] = PLAYER;
  
                    // Call minimax recursively
                    // and choose the maximum value
                    best = Math.max(best, minimax(board,
                                    depth + 1, !isMax));
  
                    // Undo the move
                    board[i][j] = '';
                }
            }
        }
        return best;
    }
  
    // If this minimizer's move
    else
    {
        let best = 1000;
  
        // Traverse all cells
        for(let i = 0; i < 3; i++)
        {
            for(let j = 0; j < 3; j++)
            {
                 
                // Check if cell is empty
                if (board[i][j] == '')
                {
                     
                    // Make the move
                    board[i][j] = OPPONENT;
  
                    // Call minimax recursively and
                    // choose the minimum value
                    best = Math.min(best, minimax(board,
                                    depth + 1, !isMax));
  
                    // Undo the move
                    board[i][j] = '';
                }
            }
        }
        return best;
    }
}
 
// This will return the best possible
// move for the PLAYER
export function findBestMove(INboard)
{
    const board = [...INboard.map(v => [...v])]
    let bestVal = 1000;
    let bestMove = new Move();
    bestMove.row = -1;
    bestMove.col = -1;
  
    // Traverse all cells, evaluate
    // minimax function for all empty
    // cells. And return the cell
    // with optimal value.
    for(let i = 0; i < 3; i++)
    {
        for(let j = 0; j < 3; j++)
        {
             
            // Check if cell is empty
            if (board[i][j] == '')
            {
                 
                // Make the move
                board[i][j] = OPPONENT;
  
                // compute evaluation function
                // for this move.
                let moveVal = minimax(board, 0, true);
  
                // Undo the move
                board[i][j] = '';
  
                // If the value of the current move
                // is more than the best value, then
                // update best
                if (moveVal < bestVal)
                {
                    bestMove.row = i;
                    bestMove.col = j;
                    bestVal = moveVal;
                }
            }
        }
    }
    
    return bestMove;
}


function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}


export const fireWorks = () => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 2 };

    var interval = setInterval(function() {
      var timeLeft = animationEnd - Date.now();
    
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
    
      var particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);

    return {
        stop: () => {
            clearInterval(interval)
        }
    }
}
