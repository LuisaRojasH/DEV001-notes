import React from 'react'
import Home from './pages/Home'
import Login from './pages/LogIn'
import Error404 from './pages/Error404'
import Register from './pages/Register'
import { ProtectedRoute } from './pages/ProtectedRoute'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvaider } from './firebase/authContext'



function App() {
  return (
    <AuthProvaider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </AuthProvaider>

  )
}

export default App
