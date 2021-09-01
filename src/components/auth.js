import React from 'react'; 

function auth(){
    return(
        <div>
            <label htmlFor="username">Title</label><br/>
            <input id="title" type="text" placeholder="title" value={title}
            onChange = {evt => setusername(evt.target.value)}/>
            <br/>
            <label htmlFor="password">Description</label><br/>
            <textarea id="description" type="text" placeholder="Description" value={description}
            onChange = { evt=> setDescription(evt.target.value)}
            ></textarea><br/>
            <button onClick={loginClicked}>Login</button> :
          
        
            {/* <h1>{props.movie && props.movie.title} edit</h1> */}
        </div>
    )
}

export default auth; 