'use client'
import { useState, useEffect } from 'react'
import * as Realm from 'realm-web';
import LoadingPage from './loading'
import TextSearch from './components/TextSearch';
import AutoCompleteSearch from './components/AutoCompleteSearch';
import HighlightSearch from './components/HighlightSearch';
import VectorSearch from './components/VectorSearch';
import FuzzySearch from './components/FuzzySearch';
import Movies from './components/Movies';
import MoviesHighlight from './components/MoviesHighlight';
import Switch from "react-switch";

const HomePage = () => {

  //state
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [autoComplete, setAutoComplete] = useState([])
  const REALM_APP_ID = 'triggers-ndrra'; //should be environment variable
  const app = new Realm.App({ id: REALM_APP_ID });
  const credentials = Realm.Credentials.anonymous();

  //switch States
  const [searchSwitch, setSearchSwitch] = useState(true)
  const [autoCompleteSwitch, setAutoCompleteSwitch] = useState(false)
  const [highlightSwitch, setHighlightSwitch] = useState(false)
  const [fuzzySwitch, setFuzzySwitch] = useState(false)
  const [vectorSwitch, setVectorSwitch] = useState(false)

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

  const fetchAutoCompleteSearchMovies = async (query) => {
    try {
      const user = await app.logIn(credentials);
      console.log('Successfully logged in!', user.id);
      const searchAutoComplete = await user.functions.searchAutoCompleteMovies(query);
      setAutoComplete(() => searchAutoComplete);
      //setLoading(false)
    } catch (err) {     
      console.error('Failed to log in', err);
    } 
  }

  const fetchSearchMoviesHighlight = async (query) => {
    try {
      const user = await app.logIn(credentials);
      console.log('Successfully logged in!', user.id);
      const searchMovies = await user.functions.searchMoviesHighlight(query);
      setMovies(searchMovies);
      setLoading(false)
    } catch (err) {     
      console.error('Failed to log in', err);
    } 
  }

  const fetchFuzzySearchMovies = async (query) => { 
    try {
      const user = await app.logIn(credentials);
      console.log('Successfully logged in!', user.id);
      const searchMovies = await user.functions.fuzzySearchMovies(query);
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
      // console.log(searchMovies)
    } catch (err) {     
      console.error('Failed to log in', err);
    } 
  }

  //effect
  useEffect(() => {
    fetchAllMovies();
  }, [])

  //loading
  if (loading) {
    return <LoadingPage />
  }

  //switch onChanges
  const handleSearchChange = () => {
    setSearchSwitch(!searchSwitch)
  }

  const handleAutoCompleteChange = () => {
    setAutoCompleteSwitch(!autoCompleteSwitch)
  }

  const handleHighlightChange = () => {
    setHighlightSwitch(!highlightSwitch)
  }

  const handleFuzzyChange = () => {
    setFuzzySwitch(!fuzzySwitch)
  }

  const handleVectorChange = () => {
    setVectorSwitch(!vectorSwitch)
  }

  return (
    <>
      <h2 className="logo">Welcome to Movie Search</h2>
      {/* <h3>Search Movies</h3> */}
      <div className='switch-card'>
        <label className='switch'>
          <span>Atlas Search</span>
          <Switch checked={searchSwitch} onChange={handleSearchChange}/>
        </label>
        <label className='switch'>
          <span>Auto Complete</span>
          <Switch checked={autoCompleteSwitch} onChange={handleAutoCompleteChange}/>
        </label>
        <label className='switch'>
          <span>Highlight Search</span>
          <Switch checked={highlightSwitch} onChange={handleHighlightChange}/>
        </label>
        <label className='switch'>
          <span>Fuzzy Search</span>
          <Switch checked={fuzzySwitch} onChange={handleFuzzyChange}/>
        </label>
        <label className='switch'>
          <span>Vector Search</span>
          <Switch checked={vectorSwitch} onChange={handleVectorChange}/>
        </label>
      </div>
      <div className='card' style={searchSwitch ? {} : {display: 'none'}}>
        <TextSearch fetchSearchMovies={fetchSearchMovies}/>
      </div>
      <div className='card' style={autoCompleteSwitch ? {} : {display: 'none'}}>
        <AutoCompleteSearch autoComplete={autoComplete} setAutoComplete={setAutoComplete} fetchAutoCompleteSearchMovies={fetchAutoCompleteSearchMovies} fetchSearchMovies={fetchSearchMovies}/>
      </div>
      <div className='card' style={highlightSwitch ? {} : {display: 'none'}}>
        <HighlightSearch fetchSearchMoviesHighlight={fetchSearchMoviesHighlight}/>
      </div>
      <div className='card' style={fuzzySwitch ? {} : {display: 'none'}}>
        <FuzzySearch fetchFuzzySearchMovies={fetchFuzzySearchMovies}/>
      </div>
      <div className='card' style={vectorSwitch ? {} : {display: 'none'}}>
        <VectorSearch fetchVectorSearchMovies={fetchVectorSearchMovies}/>
      </div>
      <h3 className="logo">Results</h3>
      {/* <Movies movies={movies} /> */}
      <MoviesHighlight movies={movies} />
    </>
  )
}

export default HomePage