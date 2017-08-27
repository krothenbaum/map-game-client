import {
	default as React,
		Component,
} from "react";

import { getHighScores } from './reducers';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import '../../../src/main.css';

class ScoreBoard extends Component {
	// get top scores from api and then render.
	componentDidMount() {
		this.props.getHighScores();
	}

	render() {
		let scores = [];
		const colors = ['red'];
		// let rank = 1;
		this.props.highScores.map((record, rank) => {
			scores.push(<div className='record' key={rank}>
				<div className={'rank ' + colors[rank]}>{rank+1}</div>
				<div className={'name ' + colors[rank]}>{record.name}</div>
				<div className={'score ' + colors[rank]}>{record.score}</div>
			</div>);
		});

		return(
			<div className='align-center'>
				<div className='record'>
					<div className='rank header'>RANK</div>
					<div className='name header'>NAME</div>
					<div className='score header'>SCORE</div>
				</div>
				{scores}
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
