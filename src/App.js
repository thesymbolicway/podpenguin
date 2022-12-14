import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import sha1 from 'sha1';
import PodcastContainer from './components/PodcastContainer';
import MeteorShower from './components/MeteorShower';



const App = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchBarPosition, setSearchBarPosition] = useState('center'); 


  const searchForPodcasts = () => {
    const apiKey = 'G7W9KCRKZ83SCS4YGWLE';
    const apiSecret = 'Ljr7EMHDpq7p37DnpfQCcTNHHNVwWKL7KqYKgL3B';
    const apiHeaderTime = Date.now() / 1000;
    const hash = sha1(apiKey + apiSecret + apiHeaderTime);
  
    const headers = {
      'User-Agent': 'SuperPodcastPlayer/1.3',
      'X-Auth-Key': apiKey,
      'X-Auth-Date': apiHeaderTime,
      Authorization: hash,
    };
  
    fetch(`https://api.podcastindex.org/api/1.0/search/byterm?q=${searchQuery}&limit=1`, { headers })
      .then(response => response.json())
      .then(data => {
        // Set the podcasts state to the array of feeds from the API response
        setPodcasts(data.feeds);
      })
      .catch(err => console.error(err));
      setSearchBarPosition('top');
  }
  // This function searches for podcasts using the searchQuery value and updates the podcasts state with the search results. You would then use the podcasts state to render a list of podcasts in the app.
  
  return (
    <div>
      <MeteorShower />
      <input
        type="text"
        value={searchQuery}
        className="search-input"
        onChange={event => setSearchQuery(event.target.value)}
      />
      <button onClick={searchForPodcasts}>Search</button>
      {podcasts ? (
        podcasts.map(podcast => (
          <PodcastContainer key={podcast.id} podcast={podcast} />
        ))
      ) : (
        <p>Loading podcasts...</p>
      )}
    </div>
  );
};


export default App

