// HeroData.js

const HeroData = (props) => {
  
  const {hero, comics} = props;

  return (
    <div key={hero.id}>

      <div className="hero-result wrapper">
        <div className="hero-image">
          <img src={hero.thumbnail.path + '.' + hero.thumbnail.extension} alt={hero.name} />
        </div>
        <div className="hero-details">
          <h2>{hero.name}</h2>
          <p>{hero.description}</p>
        </div>
      </div>

      <div className="comics-list wrapper">
          {comics.map( (comic) => {
            return (
              <div className="flip-card-container" key={comic.id}>
                <div className="flip-card">
          
                  <div className="comic-image flip-card-front">
                    <img src={comic.thumbnail.path + '.' + comic.thumbnail.extension} alt={comic.name} />
                  </div>
          
                  <div className="comic-details flip-card-back">
                    <h3>{comic.series.name}</h3>
                    <p>{'Issue # ' + comic.issueNumber}</p>
                    <p>{comic.pageCount + ' pages'}</p>
                    <p>{'Released ' + comic.dates[0].date}</p>
                    <p>{'Price' + ' $' + comic.prices[0].price}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

    </div>
  )
}

export default HeroData;