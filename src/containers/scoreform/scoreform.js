import {
	default as React,
		Component,
} from "react";

import './styles.css';

class ScoreForm extends Component {
	render() {
		return(
			<div className='scoreform-container'>
				<h1 className='game-over'>GAME OVER</h1>
				<p className='final-score'>{this.props.score}</p>
				<form action='https://radiant-hamlet-88082.herokuapp.com/api/score' method='POST'>
					<input type='text' name='name' placeholder='ENTER NAME'/>
					<input type='hidden' name='score' value={this.props.score} /><br />
					<input type='submit' value='Submit Score' />
				</form>
			</div>
		);
	}
}

export default ScoreForm