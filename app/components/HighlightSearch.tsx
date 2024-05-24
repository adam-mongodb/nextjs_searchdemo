'use client'
import { useState } from 'react'

const HighlightSearch = ({fetchSearchMoviesHighlight}) => {

    const [query, setQuery] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(query);
        const response = await fetchSearchMoviesHighlight(query)
        console.log(response)
    }


  return (
    <form onSubmit={handleSubmit} className='search-form'>
        <input type="text" className="search-input" 
        placeholder='Search with Highlight Search...' value={query} onChange={
            (e) => setQuery(e.target.value)
        }/>

        <button type="submit" className="search-button">
            Search
        </button>
    </form>
  )
}

export default HighlightSearch