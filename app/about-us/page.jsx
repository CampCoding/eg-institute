"use client";
import React from "react";
import PagesBanner from "@/components/layout/PagesBanner";
import AboutSection from "@/components/Home/AboutSection";
import Ours from "@/components/About/Ours";
import FAQ from "@/components/About/FAQ";
import { useAboutData } from "@/hooks/useAboutData";

const AboutUsPage = () => {
  const {
    hero_data,
    overview_data,
    mission_data,
    story_data,
    vision_data,
    features_data,
    mission_features_data,
    vision_features_data,
    faqs_data,
    faq_categories_data,
    isInitialLoading,
  } = useAboutData();

  if (isInitialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-teal-200 border-t-teal-600"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PagesBanner
        subTitle={hero_data?.subtitle}
        title={hero_data?.title}
        backgroundImage={hero_data?.banner}
      />
      <AboutSection overview={overview_data} features={features_data} />
      <Ours
        story={story_data}
        mission={mission_data}
        missionFeatures={mission_features_data}
        vision={vision_data}
        visionFeatures={vision_features_data}
      />
      <FAQ faqs={faqs_data} categories={faq_categories_data} />
    </div>
  );
};

export default AboutUsPage;