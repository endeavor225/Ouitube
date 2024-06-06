import { useState } from 'react'

import './App.css'
import Header from './components/Header/Header'
import Container from './components/Container/Container'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Account from './pages/Account/Account'
import ErrorPage from './pages/ErrorPage/ErrorPage'
import MediaReader from './pages/MediaReader/MediaReader'
import NotificationComponents from './components/NotificationComponents/NotificationComponents'

function App() {

/* <div className="App">
      <Header />
      <Container />
    </div>
 */

  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/account' element={<Account/>}/>
        <Route path='/reader/:slug' element={<MediaReader/>}/>
        <Route path="*"  element={<ErrorPage />}/>
      </Routes>
      <NotificationComponents />
    </BrowserRouter>
  )
}

export default App
