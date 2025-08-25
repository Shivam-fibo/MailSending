import React from 'react'
import { Link } from 'react-router-dom'
import {Context} from '../../main'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
  const navigate = useNavigate()
  const { user, setUser, setIsAuthorized} = useContext(Context)
  
  const handleLogout = () => {
    setIsAuthorized("")
    setUser({})
    navigate("/login")
  }

  const handleUpgradeClick = () => {
    navigate('/upgrade')
  }

  
  return (
    <div className='flex justify-between items-center p-2 mx-2'>
      {/* Left side - User info */}
      <div className='flex items-center space-x-4'>
        <span className='text-sm text-gray-600'>
          Welcome, {user?.name || user?.email}
        </span>
      </div>

      {/* Right side - Upgrade status and logout */}
      <div className='flex items-center space-x-3'>
        {user?.isUpgrade ? (
          <div className='flex items-center space-x-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm'>
            <span className='w-2 h-2 bg-green-500 rounded-full'></span>
            <span>Premium User</span>
          </div>
        ) : (
          <button 
            onClick={handleUpgradeClick}
            className='px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm hover:bg-indigo-200 transition-colors'
          >
            Upgrade Now
          </button>
        )}
        
        <button 
          className='border px-3 py-1 cursor-pointer hover:bg-black hover:text-white rounded-sm border-gray-400 text-sm' 
          onClick={() => handleLogout()}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar