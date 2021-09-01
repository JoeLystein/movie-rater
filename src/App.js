import React, {useState, useEffect} from 'react'; 
import './App.css';
import MovieList from './components/movie-list'; 
import MovieDetails from './components/movie-details'; 
import MovieForm from './components/movie-form'; 

function App() {
  const [movies, setMovie] = useState([]); 
  const [selectedMovie, setSelectedMovie] = useState(null); 
  const [editedMovie, setEditedMovie] = useState(null); 
  useEffect(()=>{
    fetch("http://127.0.0.1:8000/api/movies/",{
      method:'GET', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token 92b0d74608d08c2269f9a1a29d34e39f0fc2f90a'
      }
    }).then(resp => resp.json())
    .then( resp => setMovie(resp))
    .catch( error => console.log(error))
  },[])

  // const movieClicked = movie =>{
  //   // console.log(movie.title)
  //   setSelectedMovie(movie); 
  // }

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

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Rater </h1>
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
