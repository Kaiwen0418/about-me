import React from "react";

const DottedBox = ({
  children,
  className = "",
  title,
  subtitle,
  titleSize = "text-2xl",
  paddingTop = "pt-4",
}) => (
  <div
    className={`relative border-4 border-dotted border-black ${className}`}
    style={{
      borderImageSlice: "16.5% 16.5%",
      borderImageRepeat: "round",
    }}
  >
    {title && (
      <div className="absolute top-0 left-0 w-full -mt-4 text-center">
        <span className="relative inline-block px-4 bg-white">
          <span className={`relative z-10 whitespace-nowrap font-bold ${titleSize}`}>
            {title}
          </span>
          <span className="absolute inset-0 bg-white"></span>
        </span>
        {subtitle && <div className="mt-1 text-xs italic">{subtitle}</div>}
      </div>
    )}
    <div className={`${paddingTop} p-2`}>{children}</div>
  </div>
);

export default DottedBox;
