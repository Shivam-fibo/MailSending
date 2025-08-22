import React from 'react'
import { Link } from 'react-router-dom'
import {Context} from '../../main'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
  const navigate = useNavigate()
  const { setUser, setIsAuthorized} = useContext(Context)
  const handleLogout = () => {
    setIsAuthorized("")
    setUser({})
    navigate("/login")
  }

  
  return (
    <div className='flex justify-end p-2 mx-2'>
      <button className='border px-2 cursor-pointer hover:bg-black hover:text-white rounded-sm border-gray-400' onClick={() => handleLogout()}>
        Logout
      </button>
    </div>
  )
}

export default Navbar