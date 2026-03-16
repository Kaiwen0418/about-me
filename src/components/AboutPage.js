import React from "react";
import RetroWindowWrapper from "./RetroWindowWrapper";
import DottedBox from "./DottedBox";

const AboutPage = () => {
  return (
    <RetroWindowWrapper activeTab="About">
      <div className="p-4 flex h-4/5 items-center">
        <DottedBox title="Statement">
        <p className="text-sm mb-4">
          This site is dedicated to sharing my interests and showcasing my projects, combining my passion for technology and creative design. You'll find a diverse range of topics from embedded systems to modern web applications, reflecting the breadth of my experience and curiosity in the tech world.
        </p>
        <p className="text-sm">
          About the assets and texts used across this site, a significant acknowledgment goes to the AI-generated content and open-source graphics that have been instrumental in enriching the visual and informational quality of my presentations. Thanks to all contributors and data sources that have made these resources available, enhancing the educational and aesthetic value of this platform.
        </p>
        </DottedBox>
      </div>
    </RetroWindowWrapper>
  );
};

export default AboutPage;
