// components/JoinButton.tsx

import React from 'react';

interface JoinButtonProps {
  btn_text: string;
}

const JoinButton: React.FC<JoinButtonProps> = ({ btn_text }) => {
  return (
    <button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300">
      {btn_text}
    </button>
  );
}

export default JoinButton;
