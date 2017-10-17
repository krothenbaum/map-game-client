import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
	setLocation,
	getFirstMap,
	fetchRandomCities,
	changeGameState
} from './reducers'

import { resetGame } from '../random/randomMap';

import RandomCityMap from '../random';
import ScoreForm from '../scoreform/scoreform';
import GameStatus from '../gamestatus/gamestatus';
import ReactAnimatedEllipsis from 'react-animated-ellipsis';


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

	componentDidMount() {
		console.log('FIRST');
		this.props.getFirstMap();
	}

	componentWillUnmount() {
		this.isUnmounted = true;
	}

	render() {
		let rands = [];
		const cities = this.props.randomCities[0];
		console.log(this.props);

		if(cities){
			let winner = null;
			cities.forEach((c, i) => {
				c.city === this.props.winner ? winner = true : winner = false;
				const center = {'lat':c.lat, 'lng':c.lon}
				rands.push(<div className='randomMapStyle' key={i+100}>
					<RandomCityMap key={i} winner={winner} distance={c.distance} center={center} name={c.city} />				</div>);
			})
		}

		// Render high score form is game has ended
		if(this.props.endGame) {
			return (
				<ScoreForm score={this.props.score} resetGame={this.props.resetGame} />
			);
		}

		//If game is loading render instructions and wait until first fetch is complete to allow game to start
		if(this.props.gameStart) {
			return (

				<div className='align-center instructions'>
					<h1>What city is closest?</h1>
					<p>Please accept the geolocation alert. On the next screen you will be presented with 3 random cities. Guess which city is closest to your current location.</p>
					{this.props.loading ? <h2>WAKING SERVER<ReactAnimatedEllipsis/></h2> : <button onClick={this.props.changeGameState} className='btn'>Start Game</button>}

				</div>
			)
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
	endGame: state.randomMap.endGame,
	gameStart: state.yourMap.gameStart,
	loading: state.yourMap.loading
})

const mapDispatchToProps = dispatch => bindActionCreators({
	setLocation,
	getFirstMap,
	fetchRandomCities,
	resetGame,
	changeGameState,
	changePage: () => push('/scoreboard')
}, dispatch)

YourMap.defaultProps = {
	gameStart: true,
	loading: true
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(YourMap)
