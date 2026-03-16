import React from "react";
import RetroWindowWrapper from "../RetroWindowWrapper";
import PersonalProfile from "./PersonalProfile";
import ProjectsGrid from "./HomeProjectGrid";
import { useDevice } from '../../utils/DeviceContext';

const HomePage = () => {
  const isMobileDevice = useDevice();

  const profileSection = (
    <div className={`${isMobileDevice ? "w-full h-3/5" : "w-2/5 h-full"} p-4 overflow-y-auto`}>
        <PersonalProfile id={1} />
    </div>
    );

    const gridSection = (
        <div className={`${isMobileDevice ? "w-full h-2/5" : "w-3/5 h-full m-4"}  overflow-y-auto`}>
            <ProjectsGrid />
        </div>
    );

    return (
        <RetroWindowWrapper activeTab="Home">
            <div className={`flex ${isMobileDevice ? "flex-col" : "flex-row  mt-5"} overflow-hidden`}>
                {profileSection}
                {gridSection}
            </div>
        </RetroWindowWrapper>
    );
};

export default HomePage;
