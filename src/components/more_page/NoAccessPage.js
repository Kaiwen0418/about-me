import React from "react";
import { Link } from "react-router-dom";
import RetroWindowWrapper from "../RetroWindowWrapper";

const noAccessImage = `${process.env.PUBLIC_URL}/images/page_status/no_access.png`;

const NoAccessPage = () => {
    return (
      <RetroWindowWrapper>
        <div className="flex w-full h-full items-center justify-center">
            <div className="h-1/2 flex flex-col items-center justify-center">
                <img
                    src={noAccessImage}
                    alt="404 not found"
                    className="w-1/2"
                ></img>
                <h1 className="text-xl font-bold">
                    Page Access Denied
                </h1>
                <p className="p-3 text-sm">You don't have access to the page you are looking for.</p>
                <p className="text-sm border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] p-1"><Link to="/more">Go back</Link></p>
            </div>
        </div>
      </RetroWindowWrapper>
    );
  };
  
export default NoAccessPage
