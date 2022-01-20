// components
import PageHeader from './components/PageHeader.js';
import HeroData from './components/HeroData.js';
import Errors from './components/Errors.js';
import PageFooter from './components/PageFooter.js';

// modules
import { useState } from 'react';
import axios from 'axios';

// styling
import './styles/styles.css';


function App() {

  const [characters, setCharacters] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [comics, setComics] = useState([]);
  const [ifError, setIfError] = useState(false);
    
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
    }).then( (response) => {
      setCharacters(response.data.data.results);
      getComics(response.data.data.results[0].id);
    }).catch( (error) => {
      // console.log(error);
      if (error) {
        setIfError(true);
      } 
    })
  }

  // make a second call to the comics endpoint passing the character ID
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

      <section className='search-field'>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="search">Search for a character: </label>
          <input type="text" id="search" onChange={handleInput} value={userInput} placeholder="Try 'Rocket Raccoon'"/>
          <button>Search</button>
        </form>
      </section>

    <main>
      {
        hero ?
          (
            <HeroData hero={hero} comics={comics} />
          ) : (
              null
          )
      }
      {
        ifError ?
          (
            <Errors />
          ) : (
            null
          )
      }
    </main>

    <PageFooter />
      
    </div>      
  );
}

export default App;