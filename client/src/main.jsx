// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx';
// // import 'react-toastify/dist/ReactToastify.css';
// import './index.css'
// // import { ToastContainer } from 'react-toastify';

// import customFetch from './utils/customFetch.js';

// //const data = await customFetch.get('/api/v1/test')
// const data = await customFetch.get('/v1/test')
//   .then(res => console.log(res.data))
//   .catch(err => console.error(err));


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//     {/* <ToastContainer position='top-center'/> */}
//   </StrictMode>,
// )



import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import customFetch from './utils/customFetch.js';

// ✅ Call backend test route
const data = await customFetch.get('/v1/test')
  .then(res => console.log(res.data))
  .catch(err => console.error(err));

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
