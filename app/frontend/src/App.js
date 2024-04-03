import './App.css';

import { createContext, useState } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthGuard } from './components/auth/AuthGuard';
import AuthenticatedRequestWrapper from './components/auth/AuthenticatedRequestWrapper';

import Navibar from './components/general/Navibar';
import ErrorModal from './components/general/ErrorModal';
import Home from './components/home/Home';
import Browser from './components/browser/Browser';
import Recipe from './components/general/Recipe';
import Composer from './components/composer/Composer';
import Bartinder from './components/bartinder/Bartinder';
import Settings from './components/settings/Settings';
import List from './components/settings/lists/List'
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
            <Route path='/' element={<AuthGuard component={Home}/>}/>
            <Route path='/browser' element={<AuthGuard component={Browser}/>}/>
            <Route path='/browser/recipe/:uuid' element={<AuthGuard component={Recipe}/>} />
            <Route path='/composer/:editUuid?' element={<AuthGuard component={Composer}/>}/>
            <Route path='/bartinder' element={<AuthGuard component={Bartinder} />}/>
            <Route path='/settings' element={<AuthGuard component={Settings}/>}/>
            <Route path='/settings/lists/:uuid' element={<AuthGuard component={List}/>}/>
            <Route path='*' element={<h1>404</h1>} />
          </Routes>
        </BrowserRouter>
      </AuthenticatedRequestWrapperContext.Provider>
    </div>
  );
}

export default App;
