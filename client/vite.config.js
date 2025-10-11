// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'


// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:5100',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/,''),
//       },
//     },
//   },
// });


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5100', // your backend
        changeOrigin: true,
        // remove rewrite, keep /api in path
      },
    },
  },
})