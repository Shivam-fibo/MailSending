import React, { useContext } from "react";
import { Context } from "../main";

const SidePanel = ({ onSelect }) => {
  const { user } = useContext(Context);

  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-6 sticky top-0">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      
      {/* User Status */}
      <div className="mb-6 p-3 bg-gray-700 rounded-lg">
        <div className="text-sm text-gray-300 mb-1">Account Status</div>
        {user?.isUpgrade ? (
          <div className="flex items-center space-x-2 text-green-400">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            <span className="text-sm font-medium">Premium</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2 text-yellow-400">
            <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
            <span className="text-sm font-medium">Free Plan</span>
          </div>
        )}
      </div>

      <ul className="space-y-4">
        <li>
          <button onClick={() => onSelect("mail")} className="hover:underline">
            Mail Form
          </button>
        </li>
        <li>
          <button onClick={() => onSelect("history")} className="hover:underline">
            History
          </button>
        </li>
        <li>
          <button 
            onClick={() => onSelect("upgrade")} 
            className={`hover:underline ${user?.isUpgrade ? 'text-green-400' : 'text-yellow-400'}`}
          >
            {user?.isUpgrade ? '✓ Upgrade' : 'Upgrade'}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SidePanel;
