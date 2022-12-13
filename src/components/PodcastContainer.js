
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import xml2js from 'xml2js';
import AudioPlayer from './AudioPlayer';

const PodcastContainer = ({ podcast }) => {
  const { image, title, author, link, audioUrl, description, originalUrl  } = podcast;
  const [episodes, setEpisodes] = useState([]);
  const [doubleClicked, setDoubleClicked] = useState(false)
  useEffect(() => {
    // Make an HTTP GET request to the originalUrl
    axios.get(originalUrl).then((response) => {
      // Parse the XML data
      xml2js.parseString(response.data, (err, result) => {
        if (err) {
          console.error(err);
        } else {
          // Update state with the parsed podcast data
          setEpisodes(result.rss.channel[0].item);
        }
      });
    });
  }, [originalUrl]);
//  Add an event handler for the onClick event for the container element
  const handleDoubleClick = () => {
    setDoubleClicked(true);
  };
  // Use the map() method to iterate over the episodes
  // and display the information for each episode

  const episodeList = episodes.map(episode => (
    <li key={episode.guid[0]._}>
      <h2> {episode.title[0]}</h2>
      <br />
      {episode.description[0]}
      <br />
      <p>{episode.pubDate[0]}</p>
  
      {episode['itunes:image'] && (
        <img src={episode['itunes:image'][0].href} alt={episode.title[0]} />
      )}
  
      {/* Add the AudioPlayer component here */}
      {episode.link && <AudioPlayer audioUrl={episode.link} />}
  
      {console.log(episode)}
    </li>
  ));
  
     console.log(episodes)
    
  
console.log(originalUrl);

return (
      <div className="podcast-container" onClick={handleDoubleClick}>
        {image ? (
          <img
            src={image}
            alt={title}
            // onRightClick={() => window.open(link, '_blank')}
          />
        ) : (
          <img src="https://www.rbr.com/wp-content/uploads/unnamed-1-45.jpg" alt={title} />
        )}
        <h1>{title}</h1>
        <h3>{author}</h3>
        <p>{description}</p>
  
        {/* Conditionally render the episode list only if doubleClicked is true */}
        {doubleClicked && (
          <ul>
            {episodeList}
          </ul>
        )}
      </div>
    );
  };
  
  export default PodcastContainer;







