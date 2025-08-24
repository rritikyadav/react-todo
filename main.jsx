import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TodoApp from './src/App.jsx'
import Login from './src/login.jsx'
import { createHashRouter, RouterProvider } from 'react-router-dom'

const routes = createHashRouter([
  {path : '/' , element : <Login/>} ,
  {path : '/todo' , element : <TodoApp/>}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>,
)
