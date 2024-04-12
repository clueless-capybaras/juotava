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
import List from './components/settings/lists/List';

export const AuthenticatedRequestWrapperContext = createContext(AuthenticatedRequestWrapper);

export const getStoredTheme = () => localStorage.getItem('theme')
export const setStoredTheme = theme => localStorage.setItem('theme', theme)

export const getPreferredTheme = () => {
  const storedTheme = getStoredTheme()
  if (storedTheme) {
    return storedTheme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const setTheme = theme => {
  if (theme === 'auto') {
    document.documentElement.setAttribute('data-bs-theme', (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
  } else {
    document.documentElement.setAttribute('data-bs-theme', theme)
  }
}

setTheme(getPreferredTheme()) 

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  const storedTheme = getStoredTheme()
  if (storedTheme !== 'light' && storedTheme !== 'dark') {
    setTheme(getPreferredTheme())
  }
})

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
            <Route path='/settings/list/:uuid' element={<AuthGuard component={List}/>}/>
            <Route path='*' element={<h1>404</h1>} />
          </Routes>
        </BrowserRouter>
      </AuthenticatedRequestWrapperContext.Provider>
    </div>
  );
}

export default App;
