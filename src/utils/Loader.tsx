// ThreeDotsLoader.js

import React from 'react';

const ThreeDotsLoader = () => {
  return (
    <div className="flex items-center justify-center h-10">
      <div className="flex space-x-2">
        <div className="w-6 h-6 bg-[#03D5B2] rounded-full animate-bounce"></div>
        <div className="w-6 h-6 bg-[#03D5B2] rounded-full animate-bounce"></div>
        <div className="w-6 h-6 bg-[#03D5B2] rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default ThreeDotsLoader;
