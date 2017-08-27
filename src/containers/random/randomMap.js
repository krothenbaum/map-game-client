import store from '../../store';

const initialState = {
	count: 0,
	randomLocations: [],
	winner: false,
	score: 0 ,
	strikes: 0,
	endGame: false
}

export default (state = initialState, action) => {
	switch (action.type) {

		case 'SCORE':
			console.log(state);
			return {
				...state,
 	  		 	score: state.score + action.payload,
 	  		 	strikes: state.strikes + action.strike,
 	  		 	endGame: action.endGame
			}
	
			case 'RESET_GAME':
			//call function
				return {
					...state,
					score: 0,
					strikes: 0,
					endGame: false
				}

		default:
			return state
	}
}

export const resetGame = () => {
	return dispatch => {
		dispatch({
			type: 'RESET_GAME'
		})
	}
}


export const checkWinner = (winner) => {
	let s;
	let strike=0;
	let gameOver = false; 
	winner ? s=100 : (s=-25, strike++);
	console.log(store.getState().randomMap.strikes + strike);
	if(store.getState().randomMap.strikes + strike >= 3) {
		gameOver = true;
	}

	return dispatch => {
		dispatch({
			type: 'SCORE',
			payload: s,
			strike: strike,
			endGame: gameOver
		})
	}
}