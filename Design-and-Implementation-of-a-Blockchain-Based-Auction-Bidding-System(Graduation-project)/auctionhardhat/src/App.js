import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from "./components/Main";
import Write from "./components/Write";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home";
import Auctionpost from "./components/Auctionpost";
import Biditeams from "./components/biditeams"; 
import Items from "./components/items";
import Admin from './components/Admin';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    
    <Router>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/Home" element={<Home />} />
            <Route path="/" element={<Home />} />
          </>
        ) : (
          <>
            <Route path="/Signup" element={<SignUp />} />
            <Route path="/Login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            {}
            <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          </>
        )}
        <Route path="/auctionpost" element={<Auctionpost />} />
        <Route path="/biditeams" element={<Biditeams />} /> {}
        <Route path="/items" element={<Items />} /> {}
        <Route path="/admin" element={<Admin />} /> {}

      </Routes>
    </Router>
  );
}

export default App;  

/* 
import { getMetaMaskProvider } from './MetaMaskService';

function App() {
    return (
        <div>
            Olá Mundo
            <br />
            <button onClick={() => getMetaMaskProvider()}>Click Me</button>
        </div>
    );
}

export default App; 


/* import Main from "./components/Main";

function App() {
  return (
    <div className="App">
      < Main />
    </div>
  );
}

export default App; */

