import {
	default as React,
		Component,
} from "react";

const initialState = {
	highScores: []
}

export default (state = initialState, action) => {
	switch (action.type) {
		case 'GET_HIGH_SCORES':
		console.log(action.highScores);
			return {
				...state,
				highScores: action.highScores
			}
			default:
				return state
	}
}

export const getHighScores = () => {
	return dispatch => {
		console.log('getScoreBoard');
		const highScores = fetch( 'https://radiant-hamlet-88082.herokuapp.com/api/score/top' )	
		.then((response) => {
			console.log(response);
			return response.json();
		})
		.then((scores) => {
			console.log(scores);
			dispatch(setHighScore(scores));
		});
		// return({type: 'GET_HIGH_SCORES', highScores: highScores})
	}
}

const setHighScore = (highScores) => {
	return ({
		type: 'GET_HIGH_SCORES',
		highScores: highScores
	})
}
