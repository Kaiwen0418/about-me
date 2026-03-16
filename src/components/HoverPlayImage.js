import React, { useState } from 'react';

const HoverPlayImage = ({ staticSrc, gifSrc, alt }) => {
  const [src, setSrc] = useState(staticSrc);

  return (
    <img
      src={src}
      alt={alt}
      onMouseEnter={() => setSrc(gifSrc)}
      onMouseLeave={() => setSrc(staticSrc)}
      className="w-4/5 h-4/5 object-cover m-auto"
    />
  );
};

export default HoverPlayImage;
