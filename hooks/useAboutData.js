"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleGetAllAboutData } from "@/libs/features/aboutSlice";

export const useAboutData = () => {
  const dispatch = useDispatch();
  const aboutState = useSelector((state) => state.about);

  useEffect(() => {
    dispatch(handleGetAllAboutData());
  }, [dispatch]);

  const isInitialLoading =
    aboutState.hero_loading &&
    !aboutState.hero_data &&
    !aboutState.overview_data;

  return {
    ...aboutState,
    isInitialLoading,
  };
};