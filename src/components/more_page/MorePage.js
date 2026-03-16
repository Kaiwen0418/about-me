import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { useDevice } from '../../utils/DeviceContext'; // Ensure the context hook is correctly imported
import { morePageData } from "../../data/data";
import RetroWindowWrapper from "../RetroWindowWrapper";

const ProjectCard = ({ id, section, curHovered, handleMouseEnter, handleMouseLeave }) => {
  const isMobileDevice = useDevice();

  const isHovered = (curHovered === id)
  const otherHovered = (curHovered !== id && curHovered !== null)

  return (
      <Link to={`/more/${id}`}>
          <div 
              onMouseEnter={() => handleMouseEnter(id)}
              onMouseLeave={handleMouseLeave}
              className={`relative overflow-hidden grayscale-1/4
                    ${isMobileDevice ? 'aspect-square mb-2' : 'h-5/6 border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] mr-2'}
                    ${otherHovered ? 'opacity-50' : ''} transition-opacity duration-300
                    `}
            >
              <img
                className='object-cover w-full h-full'
                alt={section.name}
                src={section.images}
              />
                <div className={`absolute inset-x-0 bottom-0 p-4 transition-all duration-300 ease-in-out 
                  ${isHovered ? 'top-0' : 'top-1/2'} transform ${isHovered ? '-translate-y-0' : '-translate-y-1/4'}`}>
                <h2 className="text-center text-xl font-bold text-white">
                  {section.name}
                </h2>
                {isHovered && (
                  <p className="mt-20 text-center text-white">
                    {section.intro}
                  </p>
                )}
              </div>
            </div>
        </Link>
    );
};

const MobileProjectCard = ({ id, section}) => {
  const isMobileDevice = useDevice();
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(true);

  useEffect(() => {
    if (isMobileDevice) {
        const currentCard = cardRef.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                  setIsHovered(true);
                } else {
                  setIsHovered(false);
                }
            },
            {
                root: null, // default is the viewport
                threshold: 1 // Trigger when half of the item is visible
            }
        );

        if (currentCard) {
            observer.observe(currentCard);
        }

        return () => {
            if (currentCard) {
                observer.unobserve(currentCard);
            }
        };
    }
      // If not mobile, you might want to handle differently or not at all
  }, [id, isMobileDevice]);

  return (
      <Link to={`/more/${id}`}>
          <div 
              ref={cardRef}
              className={`relative overflow-hidden grayscale-1/4 aspect-square mb-2
                    ${isHovered ? '' : 'opacity-50'} transition-opacity duration-300
                    `}
            >
              <img
                className='object-cover w-full h-full'
                alt={section.name}
                src={section.images}
              />
                <div className={`absolute inset-x-0 bottom-0 p-4 transition-all duration-300 ease-in-out 
                  ${isHovered ? 'top-0' : 'top-1/2'} transform ${isHovered ? '-translate-y-0' : '-translate-y-1/4'}`}>
                <h2 className="text-center text-xl font-bold text-white">
                  {section.name}
                </h2>
                {isHovered && (
                  <p className="mt-20 text-center text-white">
                    {section.intro}
                  </p>
                )}
              </div>
            </div>
        </Link>
    );
};

const MorePage = () => {
    const isMobileDevice = useDevice(); // Using the context to determine if it's a mobile device
    const projIds = Object.keys(morePageData); // Assuming projIds is a list of keys from your data
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
        // For example, set the hoveredId to '1' if it exists in the projIds array
        setHoveredId('1');
    }, []); // Empty dependency array ensures this runs only on mount

    return (
      <RetroWindowWrapper activeTab="More">
        <div className='m-5 flex flex-col'>
          <div className='mb-5'>
            <h2 className='text-xl'> Explore More about Me </h2>
            <p> Following sections are mostly about my experience, hobbies and showcasing some of web design and dev, feel free to reach out if you have any question!</p>
          </div>
          <div className="w-full flex items-center justify-center ">
            <div className={`grid ${isMobileDevice ? 'grid-cols-1 h-[473px] overflow-auto' : 'grid-cols-3'}`}>
                {(projIds.map((id) => (
                    isMobileDevice ? (
                      <MobileProjectCard
                        key={id}
                        id={id}
                        section={morePageData[id]}
                    />
                    ) : (
                      <ProjectCard
                        key={id}
                        id={id}
                        section={morePageData[id]}
                        curHovered={hoveredId}
                        handleMouseEnter={handleMouseEnter}
                        handleMouseLeave={handleMouseLeave}
                    />
                  )
                )))}
            </div>
          </div>
        </div>
      </RetroWindowWrapper>
    );
};

export default MorePage;
