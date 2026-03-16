import React from "react";
import { Link } from "react-router-dom";
import { useDevice } from '../utils/DeviceContext';


const RetroWindowWrapper = ({ children, activeTab }) => {
  const menuItems = ["Home", "Project", "More", "About"];
  const isMobileDevice = useDevice();

  const scrollbar = (
    <div className="absolute top-0 right-0 bottom-0 w-4 bg-gray-200 border-l-2 border-black">
      <div className="w-full h-8 bg-gray-400 border-2 border-black"></div>
    </div>
  )

  const contactDetails = (
    <div className="absolute left-0 right-0 bottom-0 h-8 bg-gray-100 flex justify-between items-center px-4 text-xs">
      <div className="flex space-x-4">
        <a href="https://www.linkedin.com/in/kaiwen-liu-5237911b9/" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
        <a href="https://github.com/Kaiwen0418" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
        <a href="mailto:kaiwenliu0418@gmail.com" className="hover:underline">Email</a>
      </div>
      {!isMobileDevice && <div className="mr-4">
        Powered by React and Tailwind
      </div>}
    </div>
  )

  return (
    <div className={`pr-3 pl-3 flex items-center justify-center h-screen`}>
      <div className={`font-mono text-black bg-white border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-lg w-[800px] overflow-hidden relative
        ${isMobileDevice ? ' h-[700px]' : ' h-[600px]'}
        `}>
        {/* Window chrome */}
        <div className="bg-white border-b-2 border-black p-1 flex justify-between items-center">
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-black rounded-full"></div>
            <div className="w-3 h-3 border border-black rounded-full"></div>
            <div className="w-3 h-3 border border-black rounded-full"></div>
          </div>
          <div className="flex space-x-4 text-xs">
            {menuItems.map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className={`px-2 py-1 ${activeTab === item
                    ? "bg-black text-white"
                    : "hover:bg-black hover:text-white"
                  }`}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="relative h-[calc(100%-2rem)]">
          <div className={`absolute inset-0 overflow-y-auto p-[12px] animate-bounceIn ${isMobileDevice ? '' : 'pr-[28px]'}`}>
            {children}
          </div>
          {contactDetails}
          {isMobileDevice ? <></> : scrollbar}
        </div>
      </div>
    </div>
  );
};

export default RetroWindowWrapper;
