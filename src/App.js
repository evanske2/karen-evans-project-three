// components
import PageFooter from './PageFooter.js';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

// public key:
// 3caa8115daadc97fca10679f08930906

// private key:
// 981396c0102fd34b43e343b8aeb6fc5ec231572b

function App() {

  const apiKey = '001ac6c73378bbfff488a36141458af2';
  const timestamp = 'thesoer';
  const hash = '72e5ed53d1398abb831c3ceec263f18b';

  const [characters, setCharacters] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [searchCharacter, setSearchCharacter] = useState('');
  

  // make an api call to the characters endpoint
  useEffect(() => {
    axios({
      url: 'https://gateway.marvel.com:443/v1/public/characters',
      method: 'GET',
      dataResponse: 'json',
      params: {
        ts: timestamp,
        hash: hash,
        name: searchCharacter,
        apikey: apiKey,
        limit: 5,
      }
    }).then( (response) => {
      console.log(response.data.data.results);
      setCharacters(response.data.data.results);
    })
    // passing the users input into state
  }, [searchCharacter]);

  // variable for the comics endpoint data
  // const [comics, setComics] = useState('');

  // make an api call to the comics endpoint?



  const handleInput = (event) => {
    // console.log(event.target.value); verify the search field is active
    setUserInput(event.target.value);
  }


  const handleFormSubmit = (event) => {
    event.preventDefault();
    // console.log('is the form working?');
    setSearchCharacter(userInput);
  }


  return (
    <div className="App">
      <h1>Choose a character</h1>

      <form onSubmit={handleFormSubmit}>
        <label htmlFor="search">Search for a character: </label>
        <input type="text" id="search" onChange={handleInput} value={userInput} />
        <button>Search</button>
      </form>

      {characters.map( (hero) => {
        return (
          <div key={hero.id}>
            <div className="hero-image">
              <img src={hero.thumbnail.path + '.' + hero.thumbnail.extension} alt={hero.name} /></div>
            <div className="hero-details">
              <h2>{hero.name}</h2>
              <p>{hero.description}</p>
            </div>
            <div>
              {characters.map((hero) => {
                // want to map through comic appearances
              })}
            </div>
          </div>
        )
      })}
      
      <PageFooter />
      
    </div>
  );
}

export default App;
