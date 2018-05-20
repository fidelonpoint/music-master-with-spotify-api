import React, { Component } from 'react';
import './App.css';

class Profile extends Component {
	render() {
		console.log('this.props', this.props);
		let artist = {
			name: '', 
			followers: {total: ''},
			images: [{url: ''}],
			genres: []
		};
		if (this.props.artist !== null){
			artist =this.props.artist;
		}

		return(
			<div className="profile">
				<img 
					src={artist.images[0].url}
					alt="Profile"
					className="profile-img"
				/>
				<div>{artist.name}</div>
				<div>{artist.followers.total}</div>
				<div>
					{
						artist.genres.map((genre, k) => {
							genre = genre !== artist.genres[artist.genres.length-1] ? ` ${genre},` : ` & ${genre}`;
							return(
								<span key={k}>{genre}</span>
								)
							
						})
					}
				</div>
			</div>
			)
	}

	// methods
}
export default Profile;