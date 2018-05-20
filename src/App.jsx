import React, {Component} from 'react';
import './App.css';
import {FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';

class App extends Component {
	constructor(props) {
		super(props);
		this.state ={
			query: '',
			artist: null,
			tracks: []
		}
	}

	search(){
		const BASE_URL = 'https://api.spotify.com/v1/search?'
		let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
		let accessToken = 'BQBG1TqpEACBmixkHTn9K7LOQgi_xeVa22j9iy9wDTqfIMjuxSnDW9xCf89LGtsnIpVUNYgX2DJvWW1enEMLuEwwBdnkGt2JnAfO1dgJTIxfYpL8sT2l7rU4mhliUE97UQIYU7mAmppgq3mX26LG6beZZpRkrJwBUfy6U4Cn8QvDOKvBKw&refresh_token=AQAJv6dFEDB8J8YSUl_rBhMGeC8uhSJzUIXC78mK832Sq63bYf5fllHSdauQORt7iCON85rCF11NbCpt17BFVTCeb44UiENs0lEBmQiQ2SuR-CpKlKPdZIBgeWUwOrM_u9c'
		 const ALBUM_URL = 'https://api.spotify.com/v1/artists/';

		let myOptions = {
      		method: 'GET',
      		headers: {
        		'Authorization': 'Bearer ' + accessToken
     		 },
      		mode: 'cors',
      		cache: 'default'
    	};

		console.log('this.state.', this.state);
		console.log('FETCH_URL', FETCH_URL);

		

		fetch(FETCH_URL, myOptions)
		.then(response => response.json())
		.then(json => {
			const artist = json.artists.items[0];
			console.log('artist', artist);
			this.setState({artist});

			FETCH_URL =`${ALBUM_URL}${artist.id}/top-tracks?county=US&`
			console.log('artist\'s top tracks:', json);
				const tracks = json.tracks;
				this.setState({tracks});

			//FETCH_URL =`${ALBUM_URL}${artist.id}/top-tracks?county=US&`
			//fetch(FETCH_URL, myOptions)
			//.then(response => response.json())
			/*.then(json => {
				console.log('artist\'s top tracks:', json);
				const tracks = json.tracks;
				this.setState({tracks});
			})*/
		});
	}


	render() {
		return(
			<div className="App">
			<div className="App-title">Musics from spotify</div>
		{/*This code allows you to use eneter key to search onKeyPress */}
			 <FormGroup>
          		<InputGroup>
            		<FormControl
					type="text" placeholder="search an artist..."
					value={this.state.query}
					onChange={event => {this.setState({query: event.target.value})}}

					onKeyPress={event => {
						if (event.key === 'Enter'){
							this.search()
						}

					}}
					/>
					<InputGroup.Addon onClick={() => this.search()}>
						<Glyphicon glyph = "search"></Glyphicon>
						</InputGroup.Addon>
					</InputGroup>	
			 </FormGroup>
			 {
				this.state.artist !== null
				? <div>
					<Profile 
						artist={this.state.artist}

					/>
					<Gallery 
						tracks={this.state.tracks}
					/>
				  </div>
				: <div></div>
			}
			</div>
		
			)
			
	}

	
}

export default App;