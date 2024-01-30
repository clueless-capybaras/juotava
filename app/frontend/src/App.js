import logo from './logo.svg';
import './App.css';
import { createContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navibar from './components/Navibar';
import ErrorModal from './components/ErrorModal';
import Home from './components/Home';
import About from './components/About';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navibar cyClass="cy-navBarNav"/>
        <ErrorModal />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/about' element={<About />}/>
          <Route path='*' element={<h1>404</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
