import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import customFetch from './utils/customFetch.js';

const data = await customFetch.get('/test')
  .then(res => console.log(res.data))
  .catch(err => console.error(err));

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
