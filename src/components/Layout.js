import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="bg-[#f0e7d5] min-h-screen p-8 flex justify-center items-center font-mono">
      {children}
    </div>
  );
};

export default Layout;
