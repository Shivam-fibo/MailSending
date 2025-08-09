import React, { useState } from "react";
import { Menu, X, Mail } from "lucide-react";
import {useNavigate} from 'react-router-dom'
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <header className="bg-gradient-to-br from-blue-200 via-blue-100 to-blue-50  ">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        
       
        <div className="flex items-center gap-2">
          <Mail className="w-6 h-6 text-blue-600" />
          <span className="text-xl font-bold text-gray-800">MaileSender</span>
        </div>

        <nav className="hidden md:flex gap-6 text-gray-700">
          <a href="#" className="hover:text-blue-600 transition">Home</a>
          <a href="#" className="hover:text-blue-600 transition">Product Overview</a>
          <a href="#" className="hover:text-blue-600 transition">Pricing</a>
          <a href="#" className="hover:text-blue-600 transition">Contact Us</a>
        </nav>

        <div className="hidden md:block">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={() => navigate('/login')}
          >
            Login
          </button>
        </div>

        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col p-4 space-y-3 text-gray-700">
            <a href="#" className="hover:text-blue-600 transition">Home</a>
            <a href="#" className="hover:text-blue-600 transition">Product Overview</a>
            <a href="#" className="hover:text-blue-600 transition">Pricing</a>
            <a href="#" className="hover:text-blue-600 transition">Contact Us</a>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Login
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
