import React from "react";

// custom components
import MoreCalculators from "../components/Calculators/MoreCalculators";
import MoreCalculatorsMWeb from "../components/Calculators/MoreCalculators/MoreCalculatorsMWeb";

// styles import
import "../styles/globals.scss";

const Calculators: React.FC = () => {
  return (
    <div className="bg-white">
      <MoreCalculators />
      <MoreCalculatorsMWeb />
    </div>
  );
};

export default Calculators;
