import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';

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
    	const ALBUM_URL = 'https://api.spotify.com/v1/artists/';

    	// My fucntion with my access token to connect to spotify 
    	let accessToken = 'BQCPssZfEfRFklgoPlJfjfG6de6L0CXI8-xP-1drK4FudKa5cWHiR1CaR_Kjl8ue32y4iMn6pgRHuCh-MsuRYlxSiR8HBX56LdPqaolJD2-qwBTqtx0s3786eT-rTbAoWdR4g_TxOgW1nWWpDGzn4ERZ1SBVe5gK6H8DVn8YC53JPXlPKA&refresh_token=AQBVyDj_yLiGsjZgMXLNC1Be0-c0RhGTk2vp9qK2RJqkQAswTLr-CTdYIn7s5Oqviinibn5ztpF8Cf3-B0tyeKcKlDO6zmhLkQvpru7jKfaJLg8PPei_u4eeM1O5g52tIRY'

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

    	FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`
    	fetch(FETCH_URL, myOptions)
	    	.then(response => response.json())
	      	.then(json => {
	        console.log('artist\'s top tracks:', json);
	        const { tracks } = json;
	        this.setState({tracks});
	      })

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
			{
				this.state.artist !== null
				?	
				<div>
					<Profile
						artist={this.state.artist}
					/>
					<div className="Gallery">
						Gallery
					</div>
				</div>
				:<div></div>
			}
			</div>
			)
	}

	// methods
}
export default App;