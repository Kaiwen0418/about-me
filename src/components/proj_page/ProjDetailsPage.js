import React from "react";
import { useParams } from "react-router-dom";
import { useDevice } from '../../utils/DeviceContext';
import { projData } from "../../data/data";
import DesktopProjDetailsPage from "./DesktopProjDetailsPage";
import MobileProjDetailsPage from "./MobileProjDetailsPage";
import ProjectTabs from "./ProjectTabs";
import RetroWindowWrapper from "../RetroWindowWrapper";

const ProjDetailsPage = () => {
  const { id } = useParams();
  const isMobileDevice = useDevice();

  const proj = projData[id];

  const content = !proj ?
    (
      // if no proj specified
      <div className={`m-5 flex items-center justify-center ${isMobileDevice ? "flex-col justify-between h-4/5" : "flex-row h-full"}`}>
        <div className="mr-5">
          <h2 className='text-xl'> Projects </h2>
          <p className={`${isMobileDevice ? 'text-xs mt-5 w-full' : ''}`}>Explore my project portfolio showcasing technical skills and innovative solutions. These projects highlight my expertise across various technologies. Questions? Feel free to reach out!</p>
        </div>
        <ProjectTabs />
      </div>
    ) : (
      isMobileDevice ? (
        <MobileProjDetailsPage id={id} />
      ) : (
        <DesktopProjDetailsPage id={id} />
      )
    )

  return (
    <RetroWindowWrapper activeTab="Project">
      {content}
    </RetroWindowWrapper>
  )
};

export default ProjDetailsPage;
