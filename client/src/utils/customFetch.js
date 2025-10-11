// import axios from 'axios';

// const customFetch = axios.create({
//     baseURL:'/api/v1',
// })

// export default customFetch;


import axios from 'axios';

// Use relative path so Vite proxy works
const customFetch = axios.create({
  baseURL: '/api', // ✅ proxy will handle this
});

export default customFetch;