import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react'; 

function MovieDetails(props){
    const [highlighted, setHighlighted]=useState(-1);
    // const [mov, setMovie]=useState(props.movie);

    let mov = props.movie
    const highlightRate = high => evt => {
        setHighlighted(high);
    }
    const rateClicked = rate => evt => {
    fetch(`http://127.0.0.1:8000/api/movies/${mov.id}/rate_movie/`,{
        method:'POST', 
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token 92b0d74608d08c2269f9a1a29d34e39f0fc2f90a'
      },
      body: JSON.stringify({stars: rate + 1})
    })
    .then( () => getDetails())
    .catch( error => console.log(error))
    }

    const getDetails = () => {
        fetch(`http://127.0.0.1:8000/api/movies/${mov.id}/`,{
        method:'GET', 
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token 92b0d74608d08c2269f9a1a29d34e39f0fc2f90a'
        }
        })
        .then(resp => resp.json())
        .then( resp => props.updateMovie(resp))
        .catch( error => console.log(error))
    }
    

    // props.movieClicked(movie)
  return (
      <React.Fragment>
          {mov ?(
            <div>
              <h1>{mov && mov.title}</h1>
              <p>{mov && mov.description}</p>
              <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 0 ? 'orange':''}/>
              <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 1 ? 'orange':''}/>
              <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 2 ? 'orange':''}/>
              <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 3 ? 'orange':''}/>
              <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 4 ? 'orange':''}/>
              ({mov.no_of_ratings})
              <div className="rate-container">
                <h1>Rate it</h1>
                {
                    [...Array(5)].map((e,i)=>{
                        return <FontAwesomeIcon key={i} icon={faStar} className={highlighted > i-1 ? 'purple':'' }
                        onMouseEnter={highlightRate(i)} 
                        onMouseLeave={highlightRate(-1)} 
                        onClick={rateClicked(i)}
                    />
                        
                    })}
              </div>
            </div>
            
          ): null}
      </React.Fragment>
  )
}

export default MovieDetails;