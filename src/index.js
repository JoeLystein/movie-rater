import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import * as serviceWorker from './reportWebVitals'
import {Route, BrowserRouter} from 'react-router-dom';
import Auth from './components/auth'; 

export const TokenContext= createContext(null); 
function Router(){
  const TOKEN = "92b0d74608d08c2269f9a1a29d34e39f0fc2f90a"; 
  return (
  
  <React.StrictMode>
    <TokenContext.Provider value={TOKEN}>
      <BrowserRouter>
        <Route exact path="/" component={Auth}/>
        <Route exact path="/movies" component={App}/>
      </BrowserRouter>
    </TokenContext.Provider>
  </React.StrictMode>
  )
}

ReactDOM.render(<Router/>,document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// ServiceWorker.unregister(); 