// DeviceContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

const DeviceContext = createContext();

export const DeviceProvider = ({ children }) => {
    const [isMobileDevice, setIsMobileDevice] = useState(false);

    useEffect(() => {
        const checkDeviceType = () => {
            const isMobile = window.innerWidth < 768; // Example breakpoint
            setIsMobileDevice(isMobile);
        };

        checkDeviceType(); // Check on mount
        window.addEventListener('resize', checkDeviceType); // Adjust on window resize

        return () => window.removeEventListener('resize', checkDeviceType);
    }, []);

    return (
        <DeviceContext.Provider value={isMobileDevice}>
            {children}
        </DeviceContext.Provider>
    );
};

export const useDevice = () => useContext(DeviceContext);
