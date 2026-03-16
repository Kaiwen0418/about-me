import React from "react";
import RetroWindowWrapper from "./RetroWindowWrapper";

const NotFoundPage = () => {
    return (
      <RetroWindowWrapper>
        <div className="flex w-full h-full items-center justify-center">
            <div className="h-1/2 flex flex-col items-center justify-center">
                <img
                    src="/images/page_status/not_found.png"
                    alt="404 not found"
                    className="w-1/2"
                ></img>
                <h1 className="text-xl font-bold">
                    404 Not Found
                </h1>
                <p className="p-3 text-sm">The page you are looking for doesn't exist or another error occurred.</p>
                <p className="text-sm border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] p-1"><a href="/">Go back to homepage</a></p>
            </div>
        </div>
      </RetroWindowWrapper>
    );
  };
  
export default NotFoundPage