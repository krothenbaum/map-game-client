import {
	default as React,
		Component,
} from "react";

class ScoreForm extends Component {
	render() {
		return(
			<div>
				<form action='https://radiant-hamlet-88082.herokuapp.com/api/score' method='POST'>
					<p>Enter Name: </p>
					<input type='text' name='name'/>
					<input type='hidden' name='score' value={this.props.score} />
					<input type='submit' value='Submit Score' />
				</form>
			</div>
		);
	}
}

export default ScoreForm