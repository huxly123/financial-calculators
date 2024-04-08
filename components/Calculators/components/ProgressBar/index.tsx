import React, { useEffect, useState } from 'react';

// types import
import type { IProgressBar } from './ProgressBar.types';

const ProgressBar: React.FC<IProgressBar> = ({
  leftLabel,
  rightLabel,
  leftValue,
  rightValue,
}) => {
  const [progressValue, setProgressValue] = useState({
    leftPercent: 0,
    rightPercent: 0,
  });

  useEffect(() => {
    const totalValue = leftValue + rightValue;
    const leftPercent = leftValue / totalValue;
    const rightPercent = rightValue / totalValue;
    setProgressValue({
      leftPercent,
      rightPercent,
    });
  }, [leftValue, rightValue]);

  return (
    <div>
      {/* Progress Line */}
      <div className="h-5 rounded">
        <div
          className="h-full bg-[#6B91FC] inline-block rounded-l"
          style={{
            width: `${progressValue.leftPercent * 100}%`,
          }}
        />
        <div
          className="h-full bg-[#B1E50E] inline-block rounded-r"
          style={{
            width: `${progressValue.rightPercent * 100}%`,
          }}
        />
      </div>
      {/* Progress Details */}
      <div className="flex justify-between mt-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#6B91FC] rounded" />
          <p className="text-[#A4A5AB] text-xs font-bold">{leftLabel}</p>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-[#A4A5AB] text-xs font-bold">{rightLabel}</p>
          <div className="w-4 h-4 bg-[#B1E50E] rounded" />
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
