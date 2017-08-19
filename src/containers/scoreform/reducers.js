import thunk from 'redux-thunk'
import store from '../../store'

const initialState = {
	highScores: []
}

export default (state = initialState, action) => {
	switch (action.type) {
		case 'GET_HIGH_SCORES':
			return {
				...state,
				highScores: action.highScores
			}
			default:
				return state
			}
	}
}