import React, {useState, useEffect} from 'react'; 
import './App.css';
import MovieList from './components/movie-list'; 
import MovieDetails from './components/movie-details'; 
import MovieForm from './components/movie-form'; 
import { useCookies} from 'react-cookie'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFilm} from '@fortawesome/free-solid-svg-icons';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons';

function App() {
  const [movies, setMovie] = useState([]); 
  const [selectedMovie, setSelectedMovie] = useState(null); 
  const [editedMovie, setEditedMovie] = useState(null); 
  const [token,deleteToken] = useCookies(['mr-token']); 

  useEffect(()=>{
    fetch("http://127.0.0.1:8000/api/movies/",{
      method:'GET', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token['mr-token']}`
      }
    }).then(resp => resp.json())
    .then( resp => setMovie(resp))
    .catch( error => console.log(error))
  },[])

  useEffect( () =>{
    if(!token['mr-token']) window.location.href = '/'; 
  }, [token])

  const loadMovie = movie =>{
    setSelectedMovie(movie); 
    setEditedMovie(null)
  }
  const editClicked = movie =>{
    setEditedMovie(movie);
    setSelectedMovie(null);
  }

  const updatedMovie = movie =>{
    const newMovies = movies.map( mov => {
      if (mov.id  === movie.id){
        return movie;
      }
      return mov; 
    })
    setMovie(newMovies)
  }

   const newMovie = () => {
     setEditedMovie({title: '', decription:''});
     setSelectedMovie(null); 
   }

   const movieCreated = movie => {
      const newMovies = [...movies,movie]; 
      setMovie(newMovies); 
  }

  const removeClicked= movie =>{
    const newMovies = movies.filter( mov => mov.id !== movie.id);
    setMovie(newMovies); 
  }

  const logoutUser = () =>{
    deleteToken(); 
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <FontAwesomeIcon icon={faFilm}/>
          <span>JR Movie Rater APP</span>
        </h1>
        <FontAwesomeIcon icon={faSignOutAlt} onClick={logoutUser}/>
      </header>
      <div className="layout">
        <div>
          <MovieList 
            movies={movies} 
            movieClicked={loadMovie} 
            editClicked={editClicked}
            removeClicked={removeClicked}
            />
          <button onClick={newMovie}>New movie</button>
        </div>
      
        <MovieDetails movie={selectedMovie} updateMovie={loadMovie}/>
        { editedMovie? 
        <MovieForm movie={editedMovie} updatedMovie={updatedMovie} movieCreated={newMovie}/> 
        : null}
        {/* <MovieForm movie={editedMovie}/> */}
      </div>
    </div>
  );
}

export default App;
