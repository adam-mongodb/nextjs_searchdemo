const Movies = ({movies}) => {

  return (
    <>
      <div className='courses'>
        {movies.map((movie) => (
          <div key={movie.title} className='card'> 
            <h2>{movie.title}</h2>
            <p>{movie.fullplot}</p>
          </div>
        )
      )}
      </div>
    </>
  )
}

export default Movies