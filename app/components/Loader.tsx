// components/Loader.tsx
import React, { useEffect, useState } from 'react';
import "./loaderstyles.css"

const Loader: React.FC = () => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 2000); // Start fading out after 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`loader-container ${fadeOut ? 'fade-out' : ''} bg-yellow-400 flex flex-col`}>
      <img src="/logo.jpeg" alt="Logo" className="loader-logo rounded-md w-[20vh]" />
      <div className="progress mt-[10px] w-[21vh] h-[2.5vh]">
        <div className="progress-value h-[1.875vh]"></div>
      </div>
    </div>
  );
};

export default Loader;
