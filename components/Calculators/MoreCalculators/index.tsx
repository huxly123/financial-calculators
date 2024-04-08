import React from "react";
import Image from "next/image";
import Link from "next/link";

// data import
import moreCalculatorsData from "./data";

const MoreCalculators: React.FC = () => (
  <div className="border border-[#DCDCDD] rounded-2xl p-6 w-full max-lg:hidden bg-white">
    <h2 className="text-2xl text-[#000000] font-extrabold">More Calculators</h2>
    <div className="flex flex-wrap gap-8">
      {Object.keys(moreCalculatorsData).map((key) => (
        <div key={key}>
          <p className="text-[#A4A5AB] font-bold text-sm mt-10">{key}</p>
          <div>
            {moreCalculatorsData[key].map((ele) => (
              <div className="flex items-center gap-4 mt-4" key={ele.name}>
                <Image src={ele.icon} alt={ele.name} width={40} height={40} />
                <Link href={ele.link} target="_blank">
                  <h3 className="text-[#000000] font-bold text-base">
                    {ele.name}
                  </h3>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default MoreCalculators;
