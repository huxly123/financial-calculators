import React, { useState } from 'react';

// types import
import type { IRadioGroup } from './RadioGroup.types';

// css imports
import styles from './radio-group.module.scss';

const RadioGroup: React.FC<IRadioGroup> = ({
  data,
  defaultValue,
  onChange,
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
    onChange?.(label);
  };

  return (
    <div className="flex items-center lg:gap-4 max-lg:gap-3">
      {data.map((ele, index) => (
        <div
          key={ele.key}
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => {
            handleTabChange(index, ele.label);
          }}
        >
          {/*  Radio Component */}
          <div
            className={`${styles.radioSelector} ${
              activeTab.activeIndex === index
                ? styles.checkedRadio
                : styles.uncheckedRadio
            }`}
          />
          {/* Radio label */}
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

export default RadioGroup;
