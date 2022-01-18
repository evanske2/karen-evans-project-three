// components
import PageHeader from './PageHeader.js';
// import SearchHero from './SearchHero.js';
import HeroData from './components/HeroData.js';
import PageFooter from './PageFooter.js';

import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

// public key:
// 3caa8115daadc97fca10679f08930906

// private key:
// 981396c0102fd34b43e343b8aeb6fc5ec231572b

const myArray = ['hero1', 'hero2', 'hero3'];

const thor1 = myArray[0];
const [thor2, thor3, thor4] = myArray;
console.log(myArray, thor1, thor2, thor3, thor4);

function App() {


  const [characters, setCharacters] = useState([]);
  const [userInput, setUserInput] = useState('');
  // const [searchCharacter, setSearchCharacter] = useState('');
  // const [hero, setHero] = useState({});
  const [comics, setComics] = useState([]);
  

  // make an api call to the characters endpoint
  const getHeroes = (searchCharacter) => {
    
    // from my developer account
    const publicKey = '3caa8115daadc97fca10679f08930906';
    // const privateKey = '981396c0102fd34b43e343b8aeb6fc5ec231572b';
    const timestamp = 1;
    const hash = '56557615138ce2d8e64c231bb086c14f';


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
      console.log(response.data.data.results[0].id);
      setCharacters(response.data.data.results);
      getComics(response.data.data.results[0].id);
      // setComicsByCharacter(response.data.data.results[0].id);
    })
  }


  // make an api call to the comics endpoint
  const getComics = (characterID) => {

    // from my developer account
    const publicKey = '3caa8115daadc97fca10679f08930906';
    const timestamp = 1;
    const hash = '56557615138ce2d8e64c231bb086c14f';


    axios({
      url: `https://gateway.marvel.com:443/v1/public/characters/${characterID}/comics`,
      method: 'GET',
      dataResponse: 'json',
      params: {
        // name: searchCharacter,
        ts: timestamp,
        hash: hash,
        apikey: publicKey,
        limit: 5,
      }
    }).then((response) => {
      console.log(response.data.data.results);
      setComics(response.data.data.results);
    })
  }

  
  // useEffect(() => {
  // // passing the users input into state
  //   getHeroes();        
  // }, [searchCharacter]);


// get the users input from the search field
  const handleInput = (event) => {
    setUserInput(event.target.value);
  }
  
  const handleFormSubmit = (event) => {
    event.preventDefault();
    getHeroes(userInput);
    // setSearchCharacter(userInput);
    setUserInput('');
  }

  const [hero] = characters;
  console.log(characters, hero);


  return (
    <div className="App">
      
      <PageHeader />

      <form onSubmit={handleFormSubmit}>
        <label htmlFor="search">Search for a character: </label>
        <input type="text" id="search" onChange={handleInput} value={userInput} />
        <button>Search</button>
      </form>

    { hero &&   
      <HeroData hero={hero} comics={comics} />
    }
      
    </div>

      
  );
}

export default App;
