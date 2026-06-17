"use client";
import React from "react";
import OurStory from "./OurStory";
import OurMission from "./OurMission";
import OurVision from "./OurVision";

export default function Ours({
  story,
  mission,
  missionFeatures,
  vision,
  visionFeatures,
}) {
  return (
    <>
      <OurStory story={story} />
      <OurMission mission={mission} missionFeatures={missionFeatures} />
      <OurVision vision={vision} visionFeatures={visionFeatures} />
    </>
  );
}