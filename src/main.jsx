import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import { Home } from './times'
import { DetalharClubes } from './jogador'

const paginas = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/clubes/:id', element: <DetalharClubes /> }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={paginas} />,
)
