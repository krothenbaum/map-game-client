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
			console.log(action);
			return {
				...state,
 	  		 	score: state.score + action.payload,
 	  		 	strikes: state.strikes + action.strike,
 	  		 	endGame: action.endGame
			}
			
			case 'END_GAME':
			//call function
				return {
					...state,
				}

		default:
			return state
	}
}


export const checkWinner = (winner) => {
	let s;
	let strike=0;
	let gameOver = false; 
	winner ? s=100 : (s=-25, strike++);
	console.log(store.getState().randomMap.strikes + strike);
	if(store.getState().randomMap.strikes + strike >= 3) {
		//then end game
		// dispatch({
		// 	type: 'END_GAME'
		// })
			
		gameOver = true;
	}

	return dispatch => {
		dispatch({
			type: 'SCORE',
			payload:s,
			strike: strike,
			endGame: gameOver
		})
	}
}


