import React from "react";
import { useParams } from "react-router-dom";
import { projData } from "../../data/data";
import { getProjectLocale, uiText } from "../../data/translations";
import { useLanguage } from "../../utils/LanguageContext";
import DottedBox from "../DottedBox";

const MobileProjDetailsPage = () => {
  const { id } = useParams();
  const proj = projData[id];
  const { language } = useLanguage();
  const localized = getProjectLocale(Number(id), language);
  const text = uiText[language].legacy;

  return (
      <div className="p-4 flex flex-col overflow-y-auto space-y-4">
        <DottedBox
          className=""
          title={localized.name}
          subtitle={localized.brief}
          paddingTop="pt-14"
          titleSize="text-sm"
        >
          <div className="mb-4 flex justify-center space-x-4">
            <div className="w-36 h-36 overflow-hidden border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
              <img
                src={proj.images.gif}
                alt={localized.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-36 h-36 overflow-hidden border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
              <img
                src={proj.images.overview}
                alt={localized.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <table className="text-sm">
              <tbody>
                {localized.details.map(([label, value]) => (
                  <tr key={label}>
                    <td className="text-right pr-4">{label}</td>
                    <td className="text-left text-xs">{value}</td>
                  </tr>
                ))}
                <tr key={'tech'} className="mt-2">
                  <td className="text-right pr-2">{text.techStack}</td>
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
          <DottedBox title={text.introduction}>
            <p className="text-sm text-left p-2">{localized.description}</p>
          </DottedBox>

          <DottedBox title={text.notes}>
            <p className="text-xs text-left p-2">{localized.projectHighlights}</p>
          </DottedBox>

          <div className="flex space-x-4 p-2">
            {proj.url.github && (
              <a href={proj.url.github} target="_blank" rel="noopener noreferrer" className="border-2 border-black px-2 py-1 text-sm shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-colors">
                {text.viewGithub}
              </a>
            )}
            {proj.url.site && (
              <a href={proj.url.site} target="_blank" rel="noopener noreferrer" className="border-2 border-black px-2 py-1 text-sm shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-colors">
                {text.viewWebsite}
              </a>
            )}
            <button 
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: localized.name,
                    text: localized.brief,
                    url: window.location.href,
                  }).catch(() => {});
                } else {
                  void 0;
                }
              }}
              className="border-2 border-black px-2 py-1 text-sm shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-colors"
            >
              {text.share}
            </button>
          </div>
        </div>
      </div>
  );
};

export default MobileProjDetailsPage;
