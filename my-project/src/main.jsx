import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Navbar from './components/Navbar.jsx'
import SearchCity from './components/SearchCity.jsx'
import Timeline from './components/Timeline.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar/>
    <SearchCity/>
    <Timeline/>
    <App />
  </StrictMode>,
)
