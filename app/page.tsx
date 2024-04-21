'use client'
import { useState, useEffect } from 'react'
import * as Realm from 'realm-web';
import LoadingPage from './loading'
import TextSearch from './components/TextSearch';
import VectorSearch from './components/VectorSearch';
import Movies from './components/Movies';

const HomePage = () => {

  //state
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const REALM_APP_ID = 'triggers-ndrra'; //should be environment variable
  const app = new Realm.App({ id: REALM_APP_ID });
  const credentials = Realm.Credentials.anonymous();

  const fetchAllMovies = async () => {
    try {
      const user = await app.logIn(credentials);
      console.log('Successfully logged in!', user.id);

      const allMovies = await user.functions.getAllMovies();
      setMovies(allMovies);
      setLoading(false)
    } catch (err) {     
      console.error('Failed to log in', err);
    } 
  }

  const fetchSearchMovies = async (query) => {
    try {
      const user = await app.logIn(credentials);
      console.log('Successfully logged in!', user.id);

      const searchMovies = await user.functions.searchMovies(query);
      setMovies(searchMovies);
      setLoading(false)
    } catch (err) {     
      console.error('Failed to log in', err);
    } 
  }

  const fetchVectorSearchMovies = async (query) => {
    try {
      const user = await app.logIn(credentials);
      console.log('Successfully logged in!', user.id);

      const searchMovies = await user.functions.vectorSearchMovies(query);
      setMovies(searchMovies);
      setLoading(false)
      console.log(searchMovies)
    } catch (err) {     
      console.error('Failed to log in', err);
    } 
  }

  //effect
  useEffect(() => {
    fetchAllMovies();
  }, [])

  if (loading) {
    return <LoadingPage />
  }

  return (
    <>
      <h1>Welcome to Movie Search</h1>
      <div className='card'>
        <TextSearch fetchSearchMovies={fetchSearchMovies}/>
      </div>
      <div className='card'>
        <VectorSearch fetchVectorSearchMovies={fetchVectorSearchMovies}/>
      </div>
      <Movies movies={movies} />
    </>
  )
}

export default HomePage