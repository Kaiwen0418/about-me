import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDevice } from '../../utils/DeviceContext'; // Ensure the context hook is correctly imported
import { projData } from "../../data/data";
import { getProjectLocale, uiText } from "../../data/translations";
import { useLanguage } from "../../utils/LanguageContext";

const githubIcon = `${process.env.PUBLIC_URL}/images/github-icon.png`;

const ProjectCard = ({ id, proj, curHovered, handleMouseEnter, handleMouseLeave }) => {
    const isMobileDevice = useDevice(); // Using the context to determine if it's a mobile device
    const { language } = useLanguage();
    const localized = getProjectLocale(Number(id), language);
    const text = uiText[language].legacy;

    const isHovered = (curHovered === id)
    const otherHovered = (curHovered !== id && curHovered !== null)

    const mobileCard = (
        <Link to={`/project/${id}`}>
            <div className='h-[200px] w-full flex flex-cols-2 overflow-hidden'>
                <img
                    className="w-1/2 h-4/5 object-cover m-auto"
                    src={proj.images.gif} // Path to your static image
                    alt={localized.name}
                />
                <div className="w-1/2 m-auto pl-2">  {/* Added pl-5 for padding left 20px */}
                    <h1>{text.project}: </h1>
                    <p className="text-xs mb-5 ">  {/* Added mr-5 for margin right 20px */}
                        {localized.brief}
                    </p>
                    <p 
                    className='text-center text-xl scale-x-400 animate-blink m-auto'
                    style={{transform: 'scaleX(2)'}}
                    >v</p>
                </div>
            </div>
        </Link>
    );

    return (
        isMobileDevice ? (
            mobileCard
        ) : (
        <Link to={`/project/${id}`}>
            <div className='relative h-[200px] w-[200px]'>
            <div 
                onMouseEnter={() => handleMouseEnter(id)}
                onMouseLeave={handleMouseLeave}
                className={`overflow-hidden absolute grayscale-1/4 transition-all duration-300 bg-white border-2 border-black
                    ${otherHovered ? 'opacity-50' : ''} 
                    ${isHovered ? 'h-[210px] w-[210px] z-10 shadow-[4px_4px_0_0_rgba(0,0,0,1)]' : 'h-[200px] w-[200px]'}
                    ${isHovered && (id === '3' || id === '4') ? '-translate-y-4' : ''}
                    `}
            >
                <img
                    className="w-4/5 h-4/5 object-cover m-auto"
                    src={isHovered ? proj.images.gif : proj.images.static} // Path to your static image
                    alt={localized.name}
                />
                <div className="flex items-center w-4/5 m-auto pl-2">  {/* Added pl-5 for padding left 20px */}
                    <p className="text-xs mr-1 mt--1">  {/* Added mr-5 for margin right 20px */}
                        {localized.name}
                    </p>
                    <img
                        src={githubIcon}
                        alt="github"
                        className="w-3 h-3 mb-1 float-right"  
                    />
                </div>
            </div>
            </div>
        </Link>)
    );
};

const RrojectsGrid = () => {
    const isMobileDevice = useDevice(); // Using the context to determine if it's a mobile device
    const projIds = Object.keys(projData);
    const initialHoveredId = projIds[0]; // Setting the initial hovered ID to the first project's ID
  
    // State for tracking which project ID is currently hovered
    const [hoveredId, setHoveredId] = useState(initialHoveredId);

    const handleMouseEnter = (id) => {
        setHoveredId(id);
    };

    const handleMouseLeave = () => {
        setHoveredId(null);
    };

    // This effect runs once on component mount and sets the hoveredId based on some conditions or external data
    useEffect(() => {
        setHoveredId('1');
    }, []); // Empty dependency array ensures this runs only on mount

    return (
        <div className="w-9/10">
            <div className={`grid ${isMobileDevice ? 'grid-cols-1 h-[200px] ' : 'grid-cols-2 overflow-hidden'} gap-3`}>
                {projIds.map((id) => (
                    <ProjectCard
                        key={id}
                        id={id}
                        proj={projData[id]}
                        curHovered={hoveredId}
                        handleMouseEnter={handleMouseEnter}
                        handleMouseLeave={handleMouseLeave}
                    />
                ))}
            </div>
        </div>
    );
};

export default RrojectsGrid;
