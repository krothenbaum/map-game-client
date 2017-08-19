import {
	default as React,
		Component,
} from "react";

import {getHighScores} from './reducers';
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class ScoreBoard extends Component {
	// get top scores from api and then render.
	componentDidMount() {
		console.log(this);
		this.props.getHighScores();
	}

	render() {
		return(
			<div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return({
		highScores: state.scoreBoard.highScores
	})
}

const mapDispatchToProps = dispatch => bindActionCreators({
	getHighScores 
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScoreBoard)