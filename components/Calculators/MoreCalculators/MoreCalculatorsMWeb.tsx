import React from "react";
import Image from "next/image";
import Link from "next/link";
import moreCalculatorsData from "./data";

const MoreCalculatorsMWeb: React.FC = () => (
  <div className="lg:hidden px-6 bg-white py-6 rounded-t-2xl">
    <h2 className="font-extrabold text-2xl text-black mb-6">Calculators</h2>
    <div className="flex flex-col gap-6">
      {Object.entries(moreCalculatorsData).map(([category, calculators]) => (
        <div key={category} className="flex flex-col gap-6">
          {calculators.map((ele) => (
            <Link
              href={ele.link}
              target="_blank"
              key={ele.name}
              className="flex items-center justify-between"
            >
              <div className="flex items-center">
                <Image src={ele.icon} alt={ele.name} width={40} height={40} />
                <h3 className="ml-4 font-bold text-black text-base">
                  {ele.name}
                </h3>
              </div>
              <Image
                src="/icons/chevron_right_grey.svg"
                alt={ele.name}
                width={24}
                height={24}
              />
            </Link>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default MoreCalculatorsMWeb;
