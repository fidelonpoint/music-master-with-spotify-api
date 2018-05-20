import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile';

class App extends Component {
	constructor(props){
		super(props);
		this.state ={
			query: '',
			artist: null
		}
	}

	search(){
		console.log('this.state', this.state); 

    	const BASE_URL = 'https://api.spotify.com/v1/search?';
    	let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    	console.log('FETCH_URL', FETCH_URL);

    	// My fucntion with my access token to connect to spotify 
    	let accessToken = 'BQDut_pC7xOjGG13J91urMCgnuhPIzmjAZZDD1ls5fuExN7G1WuhO8LWPiucr9kDvTaVdFodzp9lqiDhIdozmJDUWKxMoxTCXAww5rPiotdSgqcc2a7cl5gifZGdka4fLzNgyYSpNthg_6pXECzELnrpdF-NTh5oR4ZdTRWMrK3JUq3QhA&refresh_token=AQCnkt5gVXmt9_PDyBOVtGucvmmD5tLzZu0cAzhijrzbrDEv5DgwASEmk8INO7h4Vo0KymEs4f7BK8M3m2bHqsRgJfornrh41H4up9khLL58YuHPGjbP-fOyXNrvnXCNYkI'

    	    let myOptions = {
		      method: 'GET',
		      headers: {
		        'Authorization': 'Bearer ' + accessToken
		      },
		      mode: 'cors',
		      cache: 'default'
		    };
		    //End

    	fetch( FETCH_URL, myOptions)
    	.then(response => response.json())
    	.then(json => {
    		const artist = json.artists.items[0];
    		console.log('artist', artist);
    		this.setState({artist});
    	});

	}


	render() {
		return(
			<div className="App"> 
			<div className="App-title"> Music Master</div>

			<FormGroup>
				<InputGroup>
				<FormControl 
					type ="text"
					placeholder="Search for an artist..."
					value={this.state.query}
					onChange= {event => {this.setState({query: event.target.value})}}
					onKeyPress={event => {
						if (event.key === 'Enter'){
							this.search()
						}
					}}
				/> 
				<InputGroup.Addon onClick= {() => this.search()}>
					<Glyphicon glyph ="search"></Glyphicon>
				</InputGroup.Addon>
				</InputGroup>
			</FormGroup>

			<Profile
				artist={this.state.artist}
			/>
			<div className="Gallery">
				Gallery
			</div>

			</div>
			)
	}

	// methods
}
export default App;