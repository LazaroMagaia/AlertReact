import './App.css';
import './styles/front.css';
import React from 'react';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Navbar from './components/Navbar';
function App() {
  return (
    <div className="App">
        <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>} exatc>Home</Route>
            <Route path="/about" element={<About/>} exact>About</Route>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
