import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './components/Register'
import Login from './components/Login'
import Testing from './components/Testing'
import Dashboard from './components/Dashboard'
import MailSend from './components/MailSend'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BulkEmailLanding from './components/LandingPage'
function App() {

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
                <Route path='/' element={< BulkEmailLanding/>} />
<Route path='/test' element={<Testing/>}/>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/mailSend' element={<MailSend />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
