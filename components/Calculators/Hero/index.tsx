import React from "react";

// custom components

import CalculatorsHeading from "../Heading";
import CurrentCalculator, { type CalculatorType } from "../AllCalculators";

interface ICalculatorsHero {
  name: string;
  displayName: string;
}

const CalculatorsHero: React.FC<ICalculatorsHero> = ({ name, displayName }) => {
  const CalculatorComponent = CurrentCalculator(name as CalculatorType);

  return (
    <div className="w-[100vw] bg-[#121319] flex justify-center items-center lg:pt-[80px] pt-8 pb-[40px]">
      <div className="lg:w-[80%] w-full">
        <CalculatorsHeading name={name} displayName={displayName} />
        {CalculatorComponent && <CalculatorComponent />}
      </div>
    </div>
  );
};

export default CalculatorsHero;
