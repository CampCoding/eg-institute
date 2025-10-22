import AboutSection from "../components/Home/AboutSection";
import ArabicLearningLanding from "../components/Home/ArabicSkills";
import Banner from "../components/Home/Banner";
import ArabicBenefitsSection from "../components/Home/BenefitsofLearning";
import CoursesSection from "../components/Home/CoursesSection";
import Dontwait from "../components/Home/DontWait";
import FeaturesSection from "../components/Home/FeaturesSection";
import JoinOurCommunity from "../components/Home/JoinOurCommunity";
import LearningJourney from "../components/Home/LearningJourney";
import PopularClasses from "../components/Home/PopularClasses";
import TestimonialSection from "../components/Home/TestimonialSection";
import TeamsSection from "../components/Home/TeamsSection";
import RealsSection from "../components/Home/RealsSection";

export default function Home() {
  return (
    <div className="!text-red-500 ">
      <Banner />
      <CoursesSection />
      <TeamsSection />
      <RealsSection />
      <TestimonialSection />

      {/* <FeaturesSection /> */}
      <AboutSection />
      {/* <Dontwait /> */}
      {/* <PopularClasses /> */}
      {/* <ArabicLearningLanding /> */}
      <ArabicBenefitsSection />

      <LearningJourney />
      {/* <JoinOurCommunity /> */}
    </div>
  );
}
