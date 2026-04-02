import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useDevice } from '../../utils/DeviceContext'; // Ensure the context hook is correctly imported
import { projData, iconList } from "../../data/data";
import { getProjectLocale } from "../../data/translations";
import { useLanguage } from "../../utils/LanguageContext";

const ProjectCard = ({ id, proj }) => {
    const isMobileDevice = useDevice(); // Using the context to determine if it's a mobile device
    const { language } = useLanguage();
    const localized = getProjectLocale(Number(id), language);

    const CardBrief = (                
        <div className="w-1/2 m-auto pl-2">  {/* Added pl-5 for padding left 20px */}
            <h1>{localized.name}</h1>
            <p className="text-xs mb-5 ">  {/* Added mr-5 for margin right 20px */}
                {localized.brief}
            </p>
            <div className="grid grid-cols-4 gap-2 mt-2">
                            {iconList.slice(0,3).map((icon, index) => (
                                <img key={index} src={icon} alt="Icon" className="w-5 h-5 " />
                            ))}
            </div>
        </div>
    )


    const Card = (
        <Link to={`/project/${id}`}>
            <div className='h-[200px] w-full flex flex-cols-2 overflow-hidden p-3'>
                <img
                    className="w-1/2 h-4/5 object-cover m-auto"
                    src={proj.images.gif} // Path to your static image
                    alt={localized.name}
                />
                { CardBrief }
            </div>
        </Link>
    );

    return (
        isMobileDevice ? (
            Card
        ) : (
        <Link to={`/project/${id}`}>
            <div className='relative h-[200px] w-[300px]'>
                <div 
                    className={` h-[200px] w-[300px]overflow-hidden grayscale-1/4 transition-opacity duration-300 bg-white border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]`}
                        style={{
                            position: 'absolute'
                        }}
                >
                    {Card}
                </div>
            </div>
        </Link>)
    );
};

const ProjectTabs = () => {
    const isMobileDevice = useDevice();
    const projIds = Object.keys(projData);
    const [activeTab, setActiveTab] = useState(projIds[0]);

    const handleTabClick = (id) => {
        setActiveTab(id);
    };

    return (
        <div className={`${isMobileDevice ? 'w-full' : 'w-4/5'}`}>
            <div className="flex mb-4">
                {projIds.map((id) => (
                    <button
                        key={id}
                        className={`px-4 py-2 mr-2 flex-1 ${
                            activeTab === id
                                ? 'bg-black text-white'
                                : 'bg-white text-black'
                        } border-2 border-black`}
                        onClick={() => handleTabClick(id)}
                    >
                        { 
                            (activeTab === id) ? (
                                <p className='text-xs'>
                                    {id + ' ' + projData[id].emoji}
                                </p>
                            ): id}
                    </button>
                ))}
            </div>
            <div key={activeTab} className={`animate-fadeIn ${isMobileDevice ? 'h-[200px] w-full' : ''}`}>
                <ProjectCard
                    id={activeTab}
                    proj={projData[activeTab]}
                />
            </div>
        </div>
    );
};

export default ProjectTabs;
