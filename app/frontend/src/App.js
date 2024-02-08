import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navibar from './components/Navibar';
import ErrorModal from './components/ErrorModal';
import Home from './components/Home';
import Search from './components/Search';
import Add from './components/Add';
import Composer from './components/composer/Composer';
import Bartinder from './components/Bartinder';
import User from './components/User';
import About from './components/About';
import { AuthGuard } from './components/auth/AuthGuard';
import { createContext } from 'react';
import AuthenticatedRequestWrapper from './components/auth/AuthenticatedRequestWrapper';

export const AuthenticatedRequestWrapperContext = createContext(AuthenticatedRequestWrapper);

function App() {
  return (
    <div className="App">
      <AuthenticatedRequestWrapperContext.Provider value={new AuthenticatedRequestWrapper()}>
        <BrowserRouter>
          <Navibar cyClass="cy-navBarNav"/>
          <ErrorModal />
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/search' element={<Search />}/>
            <Route path='/composer' element={<Composer />}/>
            <Route path='/bartinder' element={<Bartinder />}/>
            <Route path='/user' element={<AuthGuard component={User}/>}/>
            <Route path='/about' element={<About />}/>
            <Route path='*' element={<h1>404</h1>} />
          </Routes>
        </BrowserRouter>
      </AuthenticatedRequestWrapperContext.Provider>
    </div>
  );
}

export default App;
