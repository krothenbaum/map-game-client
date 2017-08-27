import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
	setLocation,
	getFirstMap,
	fetchRandomCities
} from './reducers'

import { resetGame } from '../random/randomMap';

import RandomCityMap from '../random';
import ScoreForm from '../scoreform/scoreform';
import GameStatus from '../gamestatus/gamestatus';


import 'whatwg-fetch';

import {
	default as React,
		Component,
} from "react";


import {
	withGoogleMap,
	GoogleMap,
	Marker,
} from "react-google-maps";



import '../../../src/main.css';

// const geolocation = (
// 		canUseDOM && navigator.geolocation ?
// 		navigator.geolocation :
// 		({
// 			getCurrentPosition(success, failure) {
// 				failure(`Your browser doesn't support geolocation.`);
// 			},
// 		})
// 		);

const GeolocationExampleGoogleMap = withGoogleMap(props => (
			<GoogleMap defaultZoom={12} center={props.center} >
				<Marker position={props.center} title='You are (near) here.' />
			</GoogleMap>
			));

class YourMap extends Component {
	constructor(props){
		super(props);
		let state = {
			center: null,
		};
		this.state = state;
	}

	isUnmounted = false;
	componentWillReceiveProps(){
	}
	componentDidMount() {
		this.props.getFirstMap();
	}

	componentWillUnmount() {
		this.isUnmounted = true;
	}

	render() {
		let rands = [];
		const cities = this.props.randomCities[0];

		if(cities){ //There's def a better way.
			let winner = null;
			cities.forEach((c, i) => {
				c.city === this.props.winner ? winner = true : winner = false;
				const center = {'lat':c.lat, 'lng':c.lon}
				rands.push(<div className='randomMapStyle' key={i+100}>
					<RandomCityMap key={i} winner={winner} distance={c.distance} center={center} name={c.city} />				</div>);
			})
		}

		if(this.props.endGame) {
			return (
				<ScoreForm score={this.props.score} resetGame={this.props.resetGame} />
			);
		}
		return (
			<div>
				<GeolocationExampleGoogleMap
					key={'frenchtoast'}
					containerElement={
						<div />
					}
					mapElement={
						<div style={{ height: `200px` }} />
					}
					center={this.props.center}
				/>
				<GameStatus score={this.props.score} strikes={this.props.strikes} />

				<div className='align-center'>
					{rands}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	count: state.counter.count,
	randomCities: state.yourMap.randomCities,
	winner: state.yourMap.winner,
	position: state.yourMap.position,
	center: state.yourMap.center,
	score: state.randomMap.score,
	strikes: state.randomMap.strikes,
	endGame: state.randomMap.endGame
})

const mapDispatchToProps = dispatch => bindActionCreators({
	setLocation,
	getFirstMap,
	fetchRandomCities,
	resetGame,
	changePage: () => push('/scoreboard')
}, dispatch)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(YourMap)
