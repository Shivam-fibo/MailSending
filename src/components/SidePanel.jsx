import React from "react";



const SidePanel = ({ onSelect }) => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-6 sticky top-0">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
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
          <button onClick={() => onSelect("upgrade")} className="hover:underline">
            Upgrade
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SidePanel;
