import * as util from '../util'

const initialState = {
    history: [{
        squares: Array(9).fill(null),
        psquare: 0,
        winline: Array(3).fill(null),
    }],
    stepNumber: 0,
    xIsNext: true,
    order: true,
}

export default function Reducer(state=initialState, action) {
    switch(action.type){
        case "handleClick":
            const history = state.history.slice(0, state.stepNumber + 1);
            const current = history[history.length - 1];
            const squares = current.squares.slice();
            if(current.winline[0] != null || squares[action.squareIndex]) {
                return state;
            }
            squares[action.squareIndex] = state.xIsNext ? 'X' : 'O';
            const wins = util.calculateWinner(squares);
            return Object.assign({}, state, {
                history: history.concat([{
                    squares: squares,
                    psquare: action.squareIndex,
                    winline: wins ? wins.winline : Array(3).fill(null),
                }]),
                stepNumber: history.length,
                xIsNext: !state.xIsNext,
            });

        case "jumpTo":
            return Object.assign({}, state, {
                stepNumber: action.stepNumber,
                xIsNext: (action.stepNumber % 2) === 0,
            });
        
        case "toggleClick":
            return Object.assign({}, state, {
                order: !state.order,
            });
        default:
            return state;
    }
}