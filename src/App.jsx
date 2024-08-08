import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Create from './Pages/Create';
import Navbar from './Components/Navbar';

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <>
      <Route path="/" element={<Navbar/>}>
        <Route index element={<Home />} />
        <Route path="/create" element={<Create />} />
      </Route>
      </>
    </Routes>
 
  </BrowserRouter>
  )
}

export default App
