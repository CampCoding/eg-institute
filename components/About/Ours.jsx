"use client";

import React, { useState, useEffect } from "react";
import {
  BookOpen,
  GraduationCap,
  Users,
  Headphones,
  Star,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Eye,
  Target,
  Scale,
} from "lucide-react";
import OurStory from "./OurStory";
import OurMission from "./OurMission";
import OurVision from "./OurVision";

export default function Ours() {
  return (
    <>
      <OurStory />
      <OurMission />
      <OurVision />
    </>
  );
}
