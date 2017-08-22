import {
	default as React,
		Component,
} from "react";

import { Redirect } from 'react-router'

import './styles.css';

class ScoreForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			redirectToScoreboard: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({name: event.target.value});
	}

	handleSubmit(event) {

		let body = {
			name: this.state.name,
			score: this.props.score
		};

		console.log(body);
		
		fetch('https://radiant-hamlet-88082.herokuapp.com/api/score', {
			method:'POST',
			body: JSON.stringify(body)
		})
		.then(response => {
				this.setState({redirectToScoreboard: true});
		});
		event.preventDefault();
	}

	render() {
		if(this.state.redirectToScoreboard) {
			return (
				<Redirect to='/map-game-client/scoreboard'/>
			)
		}
		return(
			<div className='scoreform-container'>
				<h1 className='game-over'>GAME OVER</h1>
				<p className='final-score'>{this.props.score}</p>
				<form onSubmit={this.handleSubmit}>
					<input type='text' name='name' placeholder='ENTER NAME' value={this.state.name} onChange={this.handleChange}/> <br />
					<input type='submit' value='Submit Score'/>
				</form>
			</div>
		);
	}
}

// action='https://radiant-hamlet-88082.herokuapp.com/api/score' method='POST' 

export default ScoreForm