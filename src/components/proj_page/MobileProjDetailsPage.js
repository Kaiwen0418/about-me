import React from "react";
import { useParams } from "react-router-dom";
import { projData } from "../../data/data";
import DottedBox from "../DottedBox";

const MobileProjDetailsPage = () => {
  const { id } = useParams();
  const proj = projData[id];

  return (
      <div className="p-4 flex flex-col overflow-y-auto space-y-4">
        <DottedBox
          className=""
          title={proj.name}
          subtitle={proj.brief}
          paddingTop="pt-14"
          titleSize="text-sm"
        >
          <div className="mb-4 flex justify-center space-x-4">
            <div className="w-36 h-36 overflow-hidden border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
              <img
                src={proj.images.gif}
                alt={`${proj.name}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-36 h-36 overflow-hidden border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
              <img
                src={proj.images.overview}
                alt={`${proj.name}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <table className="text-sm">
              <tbody>
                {proj.details.map(([label, value]) => (
                  <tr key={label}>
                    <td className="text-right pr-4">{label}</td>
                    <td className="text-left text-xs">{value}</td>
                  </tr>
                ))}
                <tr key={'tech'} className="mt-2">
                  <td className="text-right pr-2">{'Tech-stack:'}</td>
                  <td className="text-left ">                
                      <div className="grid grid-cols-4 gap-2 mt-2">
                          {proj.stackIcons.map((icon, index) => (
                              <img key={index} src={icon} alt="Icon" className="w-5 h-5 " />
                          ))}
                      </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </DottedBox>

        <div className="w-full flex-col flex justify-between">
          <DottedBox title="Introduction">
            <p className="text-sm text-left p-2">{proj.description}</p>
          </DottedBox>

          <DottedBox title="Notes">
            <p className="text-xs text-left p-2">{proj.projectHighlights}</p>
          </DottedBox>

          <div className="flex space-x-4 p-2">
            {proj.url.github && (
              <a href={proj.url.github} target="_blank" rel="noopener noreferrer" className="border-2 border-black px-2 py-1 text-sm shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-colors">
                View on Github
              </a>
            )}
            {proj.url.site && (
              <a href={proj.url.site} target="_blank" rel="noopener noreferrer" className="border-2 border-black px-2 py-1 text-sm shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-colors">
                View Website
              </a>
            )}
            <button 
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: proj.name,
                    text: proj.brief,
                    url: window.location.href,
                  }).then(() => {
                    console.log('Successfully shared');
                  }).catch((error) => {
                    console.error('Error sharing:', error);
                  });
                } else {
                  console.log('Web Share API not supported');
                  // Fallback behavior here
                }
              }}
              className="border-2 border-black px-2 py-1 text-sm shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-colors"
            >
              Share 
            </button>
          </div>
        </div>
      </div>
  );
};

export default MobileProjDetailsPage;
