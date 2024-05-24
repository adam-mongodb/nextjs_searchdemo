const MoviesHighlight = ({movies}) => {

  movies.forEach((movie) => {

    let highlights = movie.highlights

    highlights.forEach((highlight) => {
      let texts = highlight.texts;
      let replacements = texts.map((text) => {
        if (text.type === 'hit') {
          return `<mark>${text.value}</mark>`
        } else {
          return text.value
        } 
      }).join('')

      let originals = texts.map((text) => {
        return text.value
      }).join('')

      movie.title = movie.title.replace(originals, replacements)  
    })
  })

  console.log(movies)


    return (
      <>
        <div className='courses'>
          {movies.map((movie) => (
            <div key={movie.title} className='card'> 
              <h2 dangerouslySetInnerHTML={{ __html: movie.title }} />
              <p>{movie.fullplot}</p>
            </div>
            
          )
        )}
        </div>
      </>
    )
  }
  
  export default MoviesHighlight