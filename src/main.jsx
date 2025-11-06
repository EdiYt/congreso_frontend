import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './pages/index.jsx'
import ReloadPrompt from './ReloadPrompt'
import 'bootstrap/dist/css/bootstrap.min.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReloadPrompt />
    <RouterProvider router={router} />
  </StrictMode>
)
