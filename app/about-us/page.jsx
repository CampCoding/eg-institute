import React from "react";
import PagesBanner from "./../../components/layout/PagesBanner";
import AboutSection from "../../components/Home/AboutSection";
import Ours from "../../components/About/Ours";
import DontwaitAbout from "../../components/About/DontWaitAbout";
import PopularClassesAbout from "../../components/About/PopularClassesAbout";
import FAQ from "./../../components/About/FAQ";

const AboutUsPage = () => {
  return (
    <div>
      <PagesBanner title={"About Us"} backgroundImage={"/images/11.png"} />
      <AboutSection />
      <Ours />
      {/* <DontwaitAbout /> */}
      {/* <PopularClassesAbout /> */}
      <FAQ />
    </div>
  );
};

export default AboutUsPage;
