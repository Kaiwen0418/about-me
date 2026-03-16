import React from 'react';

const ArtDisplay = ({ showText, artData }) => (
  <>
    <img src="/images/art_pop/HOPPER_front.png" alt="Hopper Overlay" className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-auto h-auto max-w-full max-h-full z-30" />
    
    <h1 className="absolute w-full px-4 text-center text-6xl font-bold z-20 top-1/2 transform -translate-y-1/2 animate-slide-in-right" style={{ color: '#FFD700', fontFamily: 'Arial', transform: 'translateY(-50%) scaleY(3)' }}>
      EDWARD HOPPER
    </h1>

    <img 
      src="/images/art_pop/HOPPER.jpg" 
      alt="Art by Hopper" 
      className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-auto h-auto max-w-full max-h-full z-0"
    />

    <p className="text-white absolute left-1/4 top-3/4">
      {showText && artData.Intro}
    </p>
  </>
);

export default ArtDisplay;
