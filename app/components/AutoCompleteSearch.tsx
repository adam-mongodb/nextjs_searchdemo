'use client'
import { useState } from 'react'
import { useEffect } from 'react';

const AutoCompleteSearch = ({autoComplete, setAutoComplete, fetchAutoCompleteSearchMovies, fetchSearchMovies}) => {

    const [query, setQuery] = useState('');

    useEffect(() => {
        if (query.length) {
            fetchAutoCompleteSearchMovies(query)
        } else {
            setAutoComplete([]);
        }
    }, [query])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(query);
        const response = await fetchSearchMovies(query)
        console.log(response)
    }

    const handleSeect = (title) => {
        setQuery(title);
    }

  return (
    <>
        <form onSubmit={handleSubmit} className='search-form'>
            <input type="text" className="search-input" 
            placeholder='Search with Autocomplete...' value={query} onChange={
                (e) => setQuery(e.target.value)
            }/>

            <button type="submit" className="search-button">
                Search
            </button>
        </form>
        {autoComplete.length > 0 && (
           <ul>
                {autoComplete.map((item) => {
                    return (
                        <li key={item._id} onClick={() => handleSeect(item.title)}>
                            {item.title}
                        </li>
                    )
                })}
           </ul> 
            )}
    </>
  )
}

export default AutoCompleteSearch