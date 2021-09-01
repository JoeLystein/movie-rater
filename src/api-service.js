const TOKEN = "92b0d74608d08c2269f9a1a29d34e39f0fc2f90a"; 

export class API {
    static updateMovie(mov_id, body){
        return fetch(`http://127.0.0.1:8000/api/movies/${mov_id}/`,{
            method:'PUT', 
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${TOKEN}`
            },
            body: JSON.stringify( body)
        }).then(resp => resp.json())
    }

    static createMovie(body){
        return fetch(`http://127.0.0.1:8000/api/movies/`,{
            method:'POST', 
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${TOKEN}`
            },
            body: JSON.stringify( body)
        }).then(resp => resp.json())
    }
    static deleteMovie(mov_id){
        return fetch(`http://127.0.0.1:8000/api/movies/${mov_id}`,{
            method:'DELETE', 
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${TOKEN}`
            },
        })
    }
}