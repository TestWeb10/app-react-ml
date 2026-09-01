import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ProtectedRoute from './ProtectedRoute'
import Navbar from './components/Navbar'
import { AuthProvider } from './context/AuthContext'
import { DbProvider } from './context/DbContext'
import { MlProvider } from './context/MlContext'
import { SicofiProvider } from './context/SicofiContext'

function App() {
  return (
    <AuthProvider>
      <DbProvider>
        <SicofiProvider>
          <MlProvider>
            <BrowserRouter>
              <main className='container mx-auto px-5'>
                <Navbar />
                <Routes>
                  <Route element={<ProtectedRoute />}>
                    <Route path='/' element={<HomePage />}></Route>
                    <Route path='/home' element={<HomePage />}></Route>
                  </Route>
                  <Route path='/login' element={<LoginPage />}></Route>
                </Routes>
              </main>
            </BrowserRouter>
          </MlProvider>
        </SicofiProvider>
      </DbProvider>
    </AuthProvider >
  )
}

export default App
