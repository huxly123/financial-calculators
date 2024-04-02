import React from "react";
import { useRouter } from "next/router";

const Calculators = () => {
  const router = useRouter();
  const { slug } = router.query;
  return <div>Calculators</div>;
};

export default Calculators;
