import React from "react";
import Image from "next/image";

interface ICalculatorsHeading {
  name: string;
  displayName: string;
}

const CalculatorsHeading: React.FC<ICalculatorsHeading> = ({
  name,
  displayName,
}) => (
  <div className="flex lg:gap-6 gap-3 max-lg:ml-6">
    <div className="bg-[#1B1E2D] lg:w-[80px] lg:h-[80px] max-lg:min-w-[40px] max-lg:min-h-[40px] w-10 h-10 flex justify-center items-center lg:rounded-3xl rounded-xl">
      <Image
        src={`/images/calculators/logos/${name
          .toLocaleLowerCase()
          .replaceAll(" ", "-")}.svg`}
        alt="logo"
        width={56}
        height={56}
        className="lg:w-14 lg:h-14 w-[30px] h-[30px]"
      />
    </div>
    <div className="flex flex-col">
      <h1 className="lg:text-2xl text-lg text-white font-bold">
        {displayName}
      </h1>
    </div>
  </div>
);

export default CalculatorsHeading;
