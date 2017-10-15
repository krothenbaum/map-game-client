import React from 'react';
import { Route, Link } from 'react-router-dom'
import Map from '../map'
import ScoreBoard from '../scoreboard/scoreboard'
import '../../../src/main.css';

const App = () => (
	<div>
		<header>
			<Link to="/map-game-client" className='header-link'>Restart Game</Link>
			{/*<Link to="/home">Home</Link>
			<Link to="/about-us">About</Link>
			<Link to="/RandomCityMap">Random Cities</Link>*/}
			<Link to="/map-game-client/scoreboard" className='header-link'>Score Board</Link>

		</header>

		<main>
			<Route exact path="/map-game-client" component={Map} />
			{/*<Route exact path="/home" component={Home} />
			<Route exact path="/about-us" component={About} />
			<Route exact path="/RandomCityMap" component={RandomCityMap} />*/}
			<Route exact path="/map-game-client/scoreboard" component={ScoreBoard} />

		</main>
	</div>
)


export default App
