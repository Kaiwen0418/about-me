import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { artData } from "../../data/data";
import ArtDisplay from './HopperPage';  // Import the new component
import NoAccessPage from "./NoAccessPage";

const MoreDetailsPage = () => {
  const { id } = useParams();
  // const isMobileDevice = useDevice();
  const navigate = useNavigate();
  const [showText, setShowText] = useState(false);
  const curArtData = artData['hopper'];

  if (id === '1') {
    return <NoAccessPage/>
  } else {
    return (
      <div 
        className="relative w-full h-screen overflow-hidden bg-hopper bg-cover"
        onMouseEnter={() => setShowText(true)} onMouseLeave={() => setShowText(false)}
      >
        <div className="absolute inset-0 bg-hopper bg-cover filter blur-xl"></div>
        <ArtDisplay showText={showText} artData={curArtData} />

        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 z-30 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {showText && <span className="ml-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">Back</span>}
        </button>
      </div>
    );
  }
};

export default MoreDetailsPage;
