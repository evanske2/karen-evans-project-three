// components
import PageHeader from './components/PageHeader.js';
import HeroData from './components/HeroData.js';
import Errors from './components/Errors.js';
import PageFooter from './components/PageFooter.js';

// modules
import { useEffect, useState } from 'react';
import axios from 'axios';

// styling
import './styles/styles.css';


function App() {

  const [characters, setCharacters] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [comics, setComics] = useState([]);
  const [errorHandling, setErrorHandling] = useState('')
  
  // from my developer account
  const publicKey = '3caa8115daadc97fca10679f08930906';
  // const privateKey = '981396c0102fd34b43e343b8aeb6fc5ec231572b';
  const timestamp = 1;
  const hash = '56557615138ce2d8e64c231bb086c14f';

  // make an api call to the characters endpoint
  const getHeroes = (searchCharacter) => {
    
    axios({
      url: 'https://gateway.marvel.com:443/v1/public/characters',
      method: 'GET',
      dataResponse: 'json',
      params: {
        name: searchCharacter,
        ts: timestamp,
        hash: hash,
        apikey: publicKey,
        limit: 5,
      }
    }).then((response) => {
      setCharacters(response.data.data.results);
      getComics(response.data.data.results[0].id);
    }).catch((error) => {
      console.log(error);
      console.log('nothing found');
    })
  }

  // make an api call to the comics endpoint
  const getComics = (characterID) => {

    axios({
      url: `https://gateway.marvel.com:443/v1/public/characters/${characterID}/comics`,
      method: 'GET',
      dataResponse: 'json',
      params: {
        ts: timestamp,
        hash: hash,
        apikey: publicKey,
        // limit: 5,
      }
    }).then((response) => {
      // console.log(response.data.data.results);
      setComics(response.data.data.results);
    })
  }

// get the users input from the search field
  const handleInput = (event) => {
    setUserInput(event.target.value);
  }
  
  const handleFormSubmit = (event) => {
    event.preventDefault();
    getHeroes(userInput);
    setUserInput('');
  }

  const [hero] = characters;

  return (
    <div className="App">
      
      <PageHeader />

      <div className='search-field'>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="search">Search for a character: </label>
          <input type="text" id="search" onChange={handleInput} value={userInput} placeholder="Try 'Rocket Raccoon'"/>
          <button>Search</button>
        </form>
      </div>

    <main>
      {
      hero ?
      (
        <HeroData hero={hero} comics={comics} />
        ) : (
        <Errors />
        )
      }
    </main>
      {console.log(hero)}

    <PageFooter />
      
    </div>      
  );
}

export default App;