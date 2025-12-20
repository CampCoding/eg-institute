"use client";
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
import { useDispatch, useSelector } from "react-redux";
import { configs } from "../libs/configs";
import { handleRefreshToken } from "../libs/features/authSlice";
import Cookies from "js-cookie";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const dispatch = useDispatch();
  const { refresh_token_loading, refresh_token_data } = useSelector(
    (state) => state?.auth
  );
  const tokenInterval = useRef();

  useEffect(() => {
    const refreshToken = Cookies.get(
      configs.localstorageEgyIntstituteRefreshTokenName
    );
    const rawUser =
      localStorage.getItem("eg_user_data") ||
      sessionStorage.getItem("eg_user_data");
    const userData = rawUser ? JSON.parse(rawUser) : null;

    const token =
      localStorage.getItem(configs.localstorageEgyIntstituteTokenName) ||
      sessionStorage.getItem(configs.localstorageEgyIntstituteTokenName);

    if (!refreshToken || !userData?.student_id) {
      localStorage.removeItem(configs.localstorageEgyIntstituteTokenName);
      Cookies.remove(configs.localstorageEgyIntstituteRefreshTokenName);
      return;
    }

    const handleRefresh = () => {
      dispatch(
        handleRefreshToken({
          data: {
            refresh_token: refreshToken,
            student_id: userData.student_id,
          },
        })
      )
        .unwrap()
        .then((res) => {
          if (res?.data?.status === "out") {
            toast.success(res?.data?.message);
            localStorage.removeItem(configs.localstorageEgyIntstituteTokenName);
            Cookies.remove(configs.localstorageEgyIntstituteRefreshTokenName);
          } else if (res?.data?.status === "success") {
            localStorage.setItem(
              configs.localstorageEgyIntstituteTokenName,
              res?.data?.access_token
            );
          }
        })
        .catch(() => {});
    };

    // run once immediately
    handleRefresh();

    // then every 15 minutes
    tokenInterval.current = setInterval(handleRefresh, 15 * 60 * 1000);

    return () => {
      if (tokenInterval.current) clearInterval(tokenInterval.current);
    };
  }, [dispatch]);

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
