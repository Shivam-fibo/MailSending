import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Testing from './components/Testing'
import Dashboard from './components/Dashboard'
import History from './components/History'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BulkEmailLanding from './components/LandingPage'
import { useContext } from 'react'
import {Context} from './main'
import { useEffect } from 'react'
import Upgrade from './components/upgrade/Upgrade'


function App() {

  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/auth/me", {
        method: 'GET',
        credentials: 'include', 
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const data = await response.json();
      setUser(data.user);
      setIsAuthorized(true);
    } catch (error) {
      setIsAuthorized(false);
    }
  };
  
  fetchUser();
}, [setIsAuthorized, setUser]);
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Routes>
        <Route path='/' element={< BulkEmailLanding />} />
        <Route path='/test' element={<Testing />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={isAuthorized ? <Dashboard /> : <Login />} />
        <Route path='/mailSend' element={isAuthorized ? <History /> : <Login />} />
        <Route path='/upgrade' element={isAuthorized ? <Upgrade/> : <Login />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
