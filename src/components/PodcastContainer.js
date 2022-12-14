
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import xml2js from 'xml2js';
import AudioPlayer from './AudioPlayer';


const PodcastContainer = ({ podcast }) => {
  const { image, title, author, link, audioUrl, description, originalUrl  } = podcast;
  const [episodes, setEpisodes] = useState([]);
  const [doubleClicked, setDoubleClicked] = useState(false)
  const [podcastCount, setPodcastCount] = useState(0);

  useEffect(() => {
    if (podcastCount < 3) {
      fetch(originalUrl)
        .then(response => {
          if (response.ok) {
            return response.text();
          } else {
            throw new Error('Error fetching podcast XML data');
          }
        })
        .then(responseText => {
          xml2js.parseString(responseText, (err, result) => {
            if (err) {
              console.error(err);
            } else if (result.rss && result.rss.channel && result.rss.channel[0] && result.rss.channel[0].item) {
              setEpisodes(result.rss.channel[0].item);
            }
          });
        })
        .catch(error => {
          console.error(error);
        });
  
      setPodcastCount(podcastCount + 1);
    }
  }, [originalUrl]);
  
  
  
  const handleDoubleClick = () => {
    setDoubleClicked(!doubleClicked);
    document.cookie = "doubleClicked=true; SameSite=Lax";
  };
  
  


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
      {console.log(episode.link)}
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

        {doubleClicked && (
  <ul>
    {episodeList}
 
  </ul>
  
)}

      </div>
    );
  };
  
  export default PodcastContainer;







