import React from 'react';
import { Route, Link } from 'react-router-dom'
import Home from '../counter'
import Map from '../map'
import About from '../about'
import RandomCityMap from '../random'
import ScoreBoard from '../scoreboard/scoreboard'

const App = () => (
	<div>
		<header>
			<Link to="/">Map</Link>
			{/*<Link to="/home">Home</Link>
			<Link to="/about-us">About</Link>
			<Link to="/RandomCityMap">Random Cities</Link>*/}
			<Link to="/ScoreBoard">Score Board</Link>
			
		</header>

		<main>
			<Route exact path="/" component={Map} />    
			{/*<Route exact path="/home" component={Home} />
			<Route exact path="/about-us" component={About} />
			<Route exact path="/RandomCityMap" component={RandomCityMap} />*/}
			<Route exact path="/ScoreBoard" component={ScoreBoard} />
			
		</main>
	</div>
)


export default App
