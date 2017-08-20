import {
	default as React,
		Component,
} from "react";

import { getHighScores } from './reducers';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './styles.css';

class ScoreBoard extends Component {
	// get top scores from api and then render.
	componentDidMount() {
		this.props.getHighScores();
	}

	render() {
		let scores = [];
		let rank = 1;
		this.props.highScores.map(record => {
			scores.push(<div className='record'>
				<div className='rank'>{rank}</div>
				<div className='name'>{record.name}</div>
				<div className='score'>{record.score}</div>
			</div>);
			rank++;
		});
		
		return(
			<div className='scoreboard-container'>
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