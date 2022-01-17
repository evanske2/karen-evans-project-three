// components
import PageHeader from './PageHeader.js';
// import SearchHero from './SearchHero.js';
import PageFooter from './PageFooter.js';

import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

// public key:
// 3caa8115daadc97fca10679f08930906

// private key:
// 981396c0102fd34b43e343b8aeb6fc5ec231572b

function App() {


  const [characters, setCharacters] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [searchCharacter, setSearchCharacter] = useState('');
  

  // make an api call to the characters endpoint
  const getHeroes = () => {
    
    const publicKey = '001ac6c73378bbfff488a36141458af2';
    // const publicKey = '3caa8115daadc97fca10679f08930906';
    // const privateKey = '981396c0102fd34b43e343b8aeb6fc5ec231572b';
    const timestamp = 'thesoer';
    const hash = '72e5ed53d1398abb831c3ceec263f18b';


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
      console.log(response.data.data.results);
      setCharacters(response.data.data.results);
    })
  }

  
  useEffect(() => {
  // passing the users input into state
    getHeroes();        
  }, [searchCharacter]);


// get the users input from the search field
  const handleInput = (event) => {
    setUserInput(event.target.value);
  }
  
  const handleFormSubmit = (event) => {
    event.preventDefault();
    setSearchCharacter(userInput);
    setUserInput('');
  }


  return (
    <div className="App">
      
      <PageHeader />

      <form onSubmit={handleFormSubmit}>
        <label htmlFor="search">Search for a character: </label>
        <input type="text" id="search" onChange={handleInput} value={userInput} />
        <button>Search</button>
      </form>


      {characters.map( (hero) => {

        const characterID = hero.id
        
        return (
          
          <div key={hero.id}>
            
            <div className="hero-image">
              <img src={hero.thumbnail.path + '.' + hero.thumbnail.extension} alt={hero.name} /></div>
            
            <div className="hero-details">
              <h2>{hero.name}</h2>
              <p>{hero.description}</p>
            </div>
            
            <div>
              {console.log(characterID)}
              {/* want to display comic appearances here */}             
            </div>

          </div>
        )
      })}
      
      {/* <PageFooter /> */}

    </div>
  );
}

export default App;
