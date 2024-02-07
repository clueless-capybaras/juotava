import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navibar from './components/Navibar';
import ErrorModal from './components/ErrorModal';
import Home from './components/Home';
import Search from './components/Search';
import Add from './components/Add';
import Bartinder from './components/Bartinder';
import User from './components/User';
import About from './components/About';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navibar cyClass="cy-navBarNav"/>
        <ErrorModal />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/search' element={<Search />}/>
          <Route path='/add' element={<Add />}/>
          <Route path='/bartinder' element={<Bartinder />}/>
          <Route path='/user' element={<User />}/>
          <Route path='/about' element={<About />}/>
          <Route path='*' element={<h1>404</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
