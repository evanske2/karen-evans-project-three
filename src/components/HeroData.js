// HeroData.js

const HeroData = (props) => {
  
  const {hero, comics} = props;

  return (
    <div key={hero.id}>

      <div className="hero-image">
        <img src={hero.thumbnail.path + '.' + hero.thumbnail.extension} alt={hero.name} />
      </div>

      <div className="hero-details">
        <h2>{hero.name}</h2>
        <p>{hero.description}</p>
      </div>

      <div >
        {comics.map((comic) => {
          return (
            <div className="hero-image" key={comic.id}>
              <img src={comic.thumbnail.path + '.' + comic.thumbnail.extension} alt={comic.name} />
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default HeroData;