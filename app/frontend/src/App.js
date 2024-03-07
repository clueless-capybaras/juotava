import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navibar from './components/general/Navibar';
import ErrorModal from './components/general/ErrorModal';
import Home from './components/home/Home';
import Browser from './components/browser/Browser';
import Recipe from './components/general/Recipe';
import Composer from './components/composer/Composer';
import Bartinder from './components/bartinder/Bartinder';
import Settings from './components/settings/Settings';
import { AuthGuard } from './components/auth/AuthGuard';
import { createContext, useState } from 'react';
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
            <Route path='/browser' element={<Browser />}/>
            <Route path='/browser/recipe/:uuid' element={ <Recipe /> } />
            <Route path='/composer' element={<AuthGuard component={Composer}/>}/>
            <Route path='/bartinder' element={<Bartinder />}/>
            <Route path='/settings' element={<AuthGuard component={Settings}/>}/>
            <Route path='*' element={<h1>404</h1>} />
          </Routes>
        </BrowserRouter>
      </AuthenticatedRequestWrapperContext.Provider>
    </div>
  );
}

export default App;
