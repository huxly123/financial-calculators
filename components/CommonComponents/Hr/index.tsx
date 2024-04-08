import React from 'react';

interface IHr {
  className?: string;
}

const Hr: React.FC<IHr> = ({ className }) => (
  <div className={`w-full h-[1px] bg-[#323542] ${className ?? ''}`} />
);

export default Hr;
