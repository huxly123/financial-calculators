import React from "react";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";

// custom components
import CalculatorsHero from "../../components/Calculators/Hero";
import MoreCalculators from "../../components/Calculators/MoreCalculators";
import MoreCalculatorsMWeb from "../../components/Calculators/MoreCalculators/MoreCalculatorsMWeb";

// utils import
import {
  AllCalculators,
  AllCalculators2,
  TAllCalculators2,
} from "../../utils/constants";

// styles import
import "../../styles/globals.scss";

const Calculators = () => {
  const router = useRouter();
  const { slug } = router.query;
  const name = AllCalculators2[slug as TAllCalculators2];
  return (
    <div className="bg-black">
      <CalculatorsHero name={name} displayName={name} />
      <MoreCalculators />
      <MoreCalculatorsMWeb />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context?.params?.slug as string;
  const name = context?.params?.name as string;
  return {
    props: {
      slug: slug,
    }, // will be passed to the page component as props
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = AllCalculators.map((calculator) => {
    return {
      params: {
        slug: calculator.toLocaleLowerCase().replaceAll(" ", "-"),
      },
    };
  });

  return { paths: paths, fallback: "blocking" };
};

export default Calculators;
