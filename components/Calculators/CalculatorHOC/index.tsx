import React, { type ReactNode } from 'react';

interface ICalculatorHOC {
  children: ReactNode[];
}

const CalculatorHOC: React.FC<ICalculatorHOC> = ({ children }) => {
  const firstElement = React.Children.toArray(children)[0];
  const secondElement = React.Children.toArray(children)[1];
  return (
    <div className="py-8 px-6 max-lg:p-6 bg-[#1B1E2D] rounded-3xl lg:grid lg:grid-cols-11 lg:gap-x-4 mt-10 max-lg:flex max-lg:flex-col">
      <div className="lg:col-span-6">{firstElement}</div>
      <div className="lg:col-span-1 lg:w-[1px] max-lg:h-[1px] bg-[#323542] lg:mx-auto max-lg:mt-10 max-lg:mb-2" />
      <div className="lg:col-span-4">{secondElement}</div>
    </div>
  );
};

export default CalculatorHOC;
