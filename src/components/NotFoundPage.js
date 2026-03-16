import React from "react";
import { Link } from "react-router-dom";
import RetroWindowWrapper from "./RetroWindowWrapper";

const notFoundImage = `${process.env.PUBLIC_URL}/images/page_status/not_found.png`;

const NotFoundPage = () => {
    return (
      <RetroWindowWrapper>
        <div className="flex w-full h-full items-center justify-center">
            <div className="h-1/2 flex flex-col items-center justify-center">
                <img
                    src={notFoundImage}
                    alt="404 not found"
                    className="w-1/2"
                ></img>
                <h1 className="text-xl font-bold">
                    404 Not Found
                </h1>
                <p className="p-3 text-sm">The page you are looking for doesn't exist or another error occurred.</p>
                <p className="text-sm border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] p-1"><Link to="/">Go back to homepage</Link></p>
            </div>
        </div>
      </RetroWindowWrapper>
    );
  };
  
export default NotFoundPage
