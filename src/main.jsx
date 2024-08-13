import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ContextProvider } from './Context/DataContext'
import { UserContextProvider } from './Context/UserContext'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   
    <ContextProvider>
    <UserContextProvider>
    <App />
    </UserContextProvider>
    </ContextProvider>
   
  </React.StrictMode>
)
