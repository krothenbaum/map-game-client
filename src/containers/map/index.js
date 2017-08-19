/* global google */
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
	setLocation,
	getFirstMap,
	fetchRandomCities
} from './reducers'

import RandomCityMap from '../random'
import canUseDOM from "can-use-dom";

import raf from "raf";
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

import ScoreForm from '../scoreform/scoreform'
import './styles.css'

const geolocation = (
		canUseDOM && navigator.geolocation ?
		navigator.geolocation : 
		({
			getCurrentPosition(success, failure) {
				failure(`Your browser doesn't support geolocation.`);
			},
		})
		);

const GeolocationExampleGoogleMap = withGoogleMap(props => (
			<GoogleMap defaultZoom={12} center={props.center} >
				<Marker position={props.center} title='You are (near) here.' />
			</GoogleMap>
			));






/*
	* https://developers.google.com/maps/documentation/javascript/examples/map-geolocation
	*
	* Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
	*/


class YourMap extends Component {
	constructor(props){
		super(props);
		let state = {
			center: null,
		};
		this.state = state;

		this.simpleGet = this.simpleGet.bind(this);
	}

	isUnmounted = false;
	componentWillReceiveProps(){
	}
	componentDidMount() {

		this.props.getFirstMap();
		//let winner = Math.floor(Math.random()*4)

	}

	componentWillUnmount() {
		this.isUnmounted = true;
	}
	componentDidUpdate(){

	}

	simpleGet(){
		console.log('simple get');
		// url (required), options (optional)
		fetch('https://radiant-hamlet-88082.herokuapp.com/api/score', {
				method: 'get'
		}).then(function(response) {
			console.log('response')
			console.log(response);
						
		}).catch(function(err) {
			console.log(err);
				// Error :(
		});
	}

	render() {
		let rands = [];
		const cities = this.props.randomCities[0];
		
		if(cities){ //There's def a better way.  
			let winner = null; 
			cities.forEach((c, i) => {
				c.city == this.props.winner ? winner = true : winner = false;  
				const center = {'lat':c.lat, 'lng':c.lon} 
				rands.push(<div className='randomMapStyle'>
					<RandomCityMap  key={i} winner={winner} distance={c.distance} center={center} name={c.city} />
				</div>);			
			})
		}

		if(this.props.endGame) {
			return (
				<div><h1>GAME OVER</h1>
					<h2>{this.props.score}</h2>
					<ScoreForm score={this.props.score} />
				</div>
				);
		}
		return (
			<div>
				<GeolocationExampleGoogleMap
					key={'frenchtoast'}
					containerElement={
						<div style={{ height: `200px` }} />
					}
					mapElement={
						<div style={{ height: `200px` }} />
					}
					center={this.props.center}
				/>
				<div>
					<h2 className='score'>Your Score: {this.props.score}</h2>
					<h3 className='strikes'>Strikes: {this.props.strikes}</h3>
				</div>
				{rands}
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
	changePage: () => push('/about-us')
}, dispatch)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(YourMap)
