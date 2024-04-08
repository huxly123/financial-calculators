import React, { useState } from 'react';

// types import
import type { IPillsTab } from './pills-tab.types';

const PillsTab: React.FC<IPillsTab> = ({
  data,
  isSpacedBetween,
  pillRadius = 'rounded-xl',
  isBgTransparent,
  onChange,
  defaultValue,
  className,
}) => {
  const [activeTab, setActiveTab] = useState({
    activeIndex: defaultValue?.index ?? -1,
    activeLabel: defaultValue?.label ?? '',
  });

  const handleTabChange = (index: number, label: string): void => {
    setActiveTab({
      activeIndex: index,
      activeLabel: label,
    });
    onChange?.(label, index);
  };
  return (
    <div
      className={`flex ${isSpacedBetween ? 'gap-4' : ''} ${
        isBgTransparent ? 'bg-[#323542]' : ''
      } ${pillRadius} max-w-max ${className ?? ''}`}
    >
      {data.map((ele, index) => (
        <div
          key={ele.key}
          className={`w-[90px] h-8 ${pillRadius} ${
            activeTab.activeIndex === index ? 'bg-[#6B91FC]' : 'bg-[#323542]'
          } flex justify-center items-center cursor-pointer`}
          onClick={() => {
            handleTabChange(index, ele.label);
          }}
        >
          <p
            className={`text-xs font-extrabold ${
              activeTab.activeIndex === index ? 'text-white' : 'text-[#A4A5AB]'
            } `}
          >
            {ele.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default PillsTab;
