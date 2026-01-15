import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { initTestData } from './lib/initData'
import './styles/globals.css'
import "leaflet/dist/leaflet.css";

// Инициализируем тестовые данные (только если localStorage доступен)
if (typeof window !== 'undefined' && window.localStorage) {
  initTestData()
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

