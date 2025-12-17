// "use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Clock,
  Users,
  Star,
  BookOpen,
  Lock,
  CheckCircle,
  ArrowRight,
  Calendar,
  Award,
  Target,
  Brain,
  FolderOpen,
  Globe,
  ChevronDown,
  ChevronRight,
  Loader2,
  MessageCircle,
  Headphones,
  PenTool,
  Video,
  Volume2,
  X,
  ArrowLeft,
  AlertCircle,
  Mail,
  CheckSquare,
  UserCheck,
  Lightbulb,
  Languages,
  BookOpenCheck,
  GraduationCap,
} from "lucide-react";

import { useRouter, useSearchParams } from "next/navigation";
import LevelCard from "../../LevelCard";
import OralMeetingModal from "../OralMeetingModal";
import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import {
  handleGetAllCourseTeacherGroups,
  handleGetAllCourseTeachers,
  handleGetAllStudentSchedules,
  handleMakeStudentSchedule,
} from "../../../../libs/features/coursesSlice";
import { configs } from "../../../../libs/configs";
import { Spin } from "antd";

/* ----------------------------- Helpers ----------------------------- */
const isISODate = (v) => /^\d{4}-\d{2}-\d{2}$/.test(String(v || ""));

const toISODate = (value) => {
  if (!value) return new Date().toISOString().slice(0, 10);
  if (isISODate(value)) return value;

  const d = new Date(value);
  if (!Number.isNaN(d.getTime())) return d.toISOString().slice(0, 10);

  return new Date().toISOString().slice(0, 10);
};

const parseJwt = (token) => {
  try {
    const parts = String(token || "").split(".");
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch {
    return null;
  }
};

/* ------------------ Schedule interval helpers (private) ------------------ */
const DAY_ORDER = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

// "09:00:00" | "09:00" -> "09:00"
const toHHMM = (t) => {
  if (!t) return "";
  const [hh = "00", mm = "00"] = String(t).split(":");
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
};

// "09:00" -> "09:00:00"
const toHHMMSS = (hhmm) => {
  if (!hhmm) return "";
  const [hh = "00", mm = "00"] = String(hhmm).split(":");
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}:00`;
};

const timeToMinutes = (hhmm) => {
  const [h = "0", m = "0"] = String(hhmm || "0:0").split(":");
  return Number(h) * 60 + Number(m);
};

const minutesToHHMM = (mins) => {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
};

const mergeWindows = (windows) => {
  const sorted = [...windows]
    .map((w) => ({
      ...w,
      startMin: timeToMinutes(toHHMM(w.start_time)),
      endMin: timeToMinutes(toHHMM(w.end_time)),
    }))
    .filter((w) => Number.isFinite(w.startMin) && Number.isFinite(w.endMin))
    .filter((w) => w.endMin > w.startMin)
    .sort((a, b) => a.startMin - b.startMin);

  const merged = [];
  for (const w of sorted) {
    const last = merged[merged.length - 1];
    if (!last) {
      merged.push({ ...w });
      continue;
    }

    // merge overlap or contiguous windows
    if (w.startMin <= last.endMin) {
      last.endMin = Math.max(last.endMin, w.endMin);
      continue;
    }

    merged.push({ ...w });
  }

  return merged.map((w, idx) => ({
    key: `${w.day_of_week || "day"}-${idx}`,
    day_of_week: w.day_of_week,
    window_start: minutesToHHMM(w.startMin),
    window_end: minutesToHHMM(w.endMin),
  }));
};

// Validate time is within window
const validateTimeInWindow = (time, windowStart, windowEnd) => {
  const timeMins = timeToMinutes(time);
  const startMins = timeToMinutes(windowStart);
  const endMins = timeToMinutes(windowEnd);

  return timeMins >= startMins && timeMins <= endMins;
};

/* ----------------------------- Pre Questions ----------------------------- */
const PrePlacementQuestionsModal = ({ isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    learningGoal: null,
    skills: [],
    previousKnowledge: null,
    selfAssessment: null,
  });

  const steps = [
    {
      id: "learningGoal",
      question: "Why do you want to learn Egyptian Arabic?",
      icon: "Lightbulb",
      type: "single",
      options: [
        { value: "travel", label: "Travel to Egypt", icon: "Globe" },
        { value: "work", label: "Work/Business", icon: "BookOpen" },
        { value: "family", label: "Connect with Family", icon: "Users" },
        { value: "culture", label: "Culture & Entertainment", icon: "Star" },
        { value: "other", label: "Other", icon: "Target" },
      ],
    },
    {
      id: "skills",
      question: "Which skills do you want to focus on?",
      icon: "Languages",
      type: "multiple",
      options: [
        { value: "speaking", label: "Speaking", icon: "MessageCircle" },
        { value: "listening", label: "Listening", icon: "Headphones" },
        { value: "reading", label: "Reading", icon: "BookOpen" },
        { value: "writing", label: "Writing", icon: "PenTool" },
      ],
    },
    {
      id: "previousKnowledge",
      question: "Have you studied Egyptian Arabic before?",
      icon: "BookOpenCheck",
      type: "single",
      options: [
        { value: "no", label: "No, I'm completely new", icon: "X" },
        { value: "little", label: "A little bit", icon: "CheckCircle" },
        { value: "some", label: "Yes, I have some knowledge", icon: "Award" },
      ],
    },
    {
      id: "selfAssessment",
      question: "How would you rate your current level?",
      icon: "GraduationCap",
      type: "single",
      options: [
        {
          value: "absolute_beginner",
          label: "Absolute Beginner",
          description: "I know nothing about Egyptian Arabic",
          icon: "BookOpen",
        },
        {
          value: "beginner_knowledge",
          label: "Beginner with Previous Knowledge",
          description: "I know some basic words and phrases",
          icon: "BookOpen",
        },
        {
          value: "lower_intermediate",
          label: "Lower Intermediate",
          description: "I can have simple conversations",
          icon: "MessageCircle",
        },
        {
          value: "upper_intermediate",
          label: "Upper Intermediate",
          description: "I can discuss various topics",
          icon: "Users",
        },
        {
          value: "lower_advanced",
          label: "Lower Advanced",
          description: "I'm fluent in most situations",
          icon: "Award",
        },
        {
          value: "upper_advanced",
          label: "Upper Advanced",
          description: "I'm nearly native-level",
          icon: "GraduationCap",
        },
      ],
    },
  ];

  const getIcon = (iconName) => {
    const iconMap = {
      Lightbulb: Lightbulb,
      Globe: Globe,
      BookOpen: BookOpen,
      Users: Users,
      Star: Star,
      Target: Target,
      Languages: Languages,
      MessageCircle: MessageCircle,
      Headphones: Headphones,
      PenTool: PenTool,
      BookOpenCheck: BookOpenCheck,
      X: X,
      CheckCircle: CheckCircle,
      Award: Award,
      GraduationCap: GraduationCap,
    };
    return iconMap[iconName] || BookOpen;
  };

  const currentStepData = steps[currentStep];

  const handleAnswer = (stepId, value) => {
    if (currentStepData.type === "multiple") {
      setAnswers((prev) => {
        const currentSkills = prev.skills || [];
        const newSkills = currentSkills.includes(value)
          ? currentSkills.filter((s) => s !== value)
          : [...currentSkills, value];
        return { ...prev, skills: newSkills };
      });
    } else {
      setAnswers((prev) => ({ ...prev, [stepId]: value }));
    }
  };

  const canProceed = () => {
    if (currentStepData.type === "multiple") {
      return answers.skills && answers.skills.length > 0;
    }
    return answers[currentStepData.id] !== null;
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(answers);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onClose();
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      setAnswers({
        learningGoal: null,
        skills: [],
        previousKnowledge: null,
        selfAssessment: null,
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const StepIcon = getIcon(currentStepData.icon);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[2000] p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-teal-50 to-cyan-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <StepIcon className="w-6 h-6 text-teal-600" />
              <div>
                <h2 className="text-xl font-bold text-[#023f4d]">
                  Tell Us About Yourself
                </h2>
                <p className="text-gray-600 text-sm">
                  Step {currentStep + 1} of {steps.length}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="px-6 pt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-teal-600 to-cyan-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-2xl font-bold text-[#023f4d] mb-8 text-center">
            {currentStepData.question}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentStepData.options.map((option) => {
              const OptionIcon = getIcon(option.icon);
              const isSelected =
                currentStepData.type === "multiple"
                  ? answers.skills?.includes(option.value)
                  : answers[currentStepData.id] === option.value;

              return (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(currentStepData.id, option.value)}
                  className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                    isSelected
                      ? "border-teal-500 bg-teal-50 shadow-lg"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        isSelected
                          ? "bg-teal-500 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <OptionIcon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4
                        className={`font-semibold mb-1 ${
                          isSelected ? "text-teal-700" : "text-gray-800"
                        }`}
                      >
                        {option.label}
                      </h4>
                      {option.description && (
                        <p className="text-sm text-gray-600">
                          {option.description}
                        </p>
                      )}
                    </div>

                    {currentStepData.type === "multiple" && (
                      <div
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                          isSelected
                            ? "border-teal-500 bg-teal-500"
                            : "border-gray-300"
                        }`}
                      >
                        {isSelected && (
                          <CheckCircle className="w-4 h-4 text-white" />
                        )}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {currentStep === 0 ? "Cancel" : "Back"}
          </button>

          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl hover:from-teal-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {currentStep === steps.length - 1 ? "Complete" : "Next"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

/* ------------------------- Class Type Selection -------------------------- */
const ClassTypeSelectionModal = ({
  isOpen,
  onClose,
  onSelectType,
  onBack,
  teacherId,
  isAbsoluteBeginner,
}) => {
  if (!isOpen) return null;
  const dispatch = useDispatch();
  const { course_teacher_group_loading, course_teacher_group_data } = useSelector(
    (state) => state?.courses
  );
  const searchParams = useSearchParams();
  const groupPrice = searchParams.get("groupPrice");
  const privatePrice = searchParams.get("private")

  useEffect(() => {
    if (!teacherId) return;
    if (!isOpen) return;

    dispatch(handleGetAllCourseTeacherGroups({ data: { teacher_id: teacherId } }));
  }, [isOpen, teacherId, dispatch]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[2000] p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-teal-50 to-cyan-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#023f4d]">
                Choose Your Learning Path
              </h2>
              <p className="text-gray-600 text-sm">
                Select the type of classes that works best for you
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-6">
            <button
              onClick={() => onSelectType("group")}
              className="group p-8 rounded-2xl border-2 border-gray-200 hover:border-teal-500 hover:bg-teal-50 transition-all duration-300 text-left"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-[#023f4d] mb-3">
                Group Classes
              </h3>

              <p className="text-gray-600 mb-6">
                Learn with other students in an interactive and engaging
                environment
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle className="w-5 h-5 text-teal-600" />
                  <span>4-8 students per class</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle className="w-5 h-5 text-teal-600" />
                  <span>Fixed schedule</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle className="w-5 h-5 text-teal-600" />
                  <span>Interactive activities</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle className="w-5 h-5 text-teal-600" />
                  <span>More affordable</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-3xl font-bold text-teal-600">${groupPrice}</div>
                <div className="text-sm text-gray-500">per month</div>
              </div>
            </button>

            <button
              onClick={() => onSelectType("private")}
              className="group p-8 rounded-2xl border-2 border-gray-200 hover:border-cyan-500 hover:bg-cyan-50 transition-all duration-300 text-left relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                POPULAR
              </div>

              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <UserCheck className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-[#023f4d] mb-3">
                Private Classes
              </h3>

              <p className="text-gray-600 mb-6">
                One-on-one personalized lessons tailored to your goals and pace
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle className="w-5 h-5 text-cyan-600" />
                  <span>Individual attention</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle className="w-5 h-5 text-cyan-600" />
                  <span>Flexible schedule</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle className="w-5 h-5 text-cyan-600" />
                  <span>Customized curriculum</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle className="w-5 h-5 text-cyan-600" />
                  <span>Faster progress</span>
                </div>
                {!isAbsoluteBeginner && (
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <CheckCircle className="w-5 h-5 text-cyan-600" />
                    <span>Includes placement test & trial</span>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-3xl font-bold text-cyan-600">${privatePrice}</div>
                <div className="text-sm text-gray-500">per month</div>
              </div>
            </button>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Teacher Selection
          </button>
          
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

/* --------------------------- Teacher Selection --------------------------- */
const TeacherSelectionModal = ({ 
  isOpen, 
  onClose, 
  onSelectTeacher, 
  onBack,
  courseId 
}) => {
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const dispatch = useDispatch();
  const { course_teacher_loading, course_teacher_data } = useSelector(
    (state) => state?.courses
  );

  useEffect(() => {
    if (!isOpen) return;
    if (!courseId) return;
    dispatch(handleGetAllCourseTeachers({ data: { course_id: courseId } }));
  }, [isOpen, courseId, dispatch]);

  const teachers = useMemo(() => {
    const list = course_teacher_data?.data?.message || [];
    return list.map((t) => ({
      id: String(t.teacher_id ?? ""),
      name: t?.teacher_name || "Teacher",
      email: t?.teacher_email || "",
      phone: t?.phone || "",
      bio: t?.bio || t?.specialization || "",
      specialization: t?.specialization || "",
      tags: t?.tags || "",
      languages: t?.languages || "",
      level: t?.level || "",
      rating: Number(t?.rate || 0),
      hourlyRate: t?.hourly_rate || "",
      image: t?.teacher_image || "",
      raw: t,
    }));
  }, [course_teacher_data]);

  const handleConfirm = () => {
    if (!selectedTeacher) return;
    onSelectTeacher(selectedTeacher);
  };

  const handleClose = () => {
    setSelectedTeacher(null);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) setSelectedTeacher(null);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[2000] p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-teal-50 to-cyan-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#023f4d]">
                Select Your Teacher
              </h2>
              <p className="text-gray-600 text-sm">
                Choose your teacher first, then pick your learning path
              </p>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {course_teacher_loading ? (
            <div className="py-12 text-center">
              <Loader2 className="w-10 h-10 animate-spin text-teal-600 mx-auto mb-3" />
              <p className="text-gray-600">Loading teachers...</p>
            </div>
          ) : teachers.length === 0 ? (
            <div className="p-6 rounded-xl bg-gray-50 border border-gray-200 text-center">
              <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">No teachers available right now.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teachers.map((t) => {
                const active = selectedTeacher?.id === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTeacher(t)}
                    className={`p-5 rounded-xl border-2 text-left transition-all ${
                      active
                        ? "border-teal-500 bg-teal-50 shadow-md"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                        {t.image ? (
                          <img
                            src={t.image}
                            alt={t.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-500 font-bold">
                            {t.name?.slice(0, 2)?.toUpperCase()}
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div
                          className={`font-bold text-base ${
                            active ? "text-teal-700" : "text-gray-900"
                          }`}
                        >
                          {t.name}
                        </div>

                        {(t.bio || t.specialization) && (
                          <div className="text-sm text-gray-600 mt-1">
                            {t.bio || t.specialization}
                          </div>
                        )}

                        <div className="mt-3 flex flex-wrap gap-2">
                          {t.level && (
                            <span className="text-xs px-2 py-1 rounded-full bg-white border border-gray-200 text-gray-700">
                              Level: {t.level}
                            </span>
                          )}
                          {t.tags && (
                            <span className="text-xs px-2 py-1 rounded-full bg-white border border-gray-200 text-gray-700">
                              Tag: {t.tags}
                            </span>
                          )}
                          {t.hourlyRate && (
                            <span className="text-xs px-2 py-1 rounded-full bg-white border border-gray-200 text-gray-700">
                              ${t.hourlyRate}/hr
                            </span>
                          )}
                        </div>

                        {t.languages && (
                          <div className="text-xs text-gray-500 mt-3">
                            <span className="font-semibold text-gray-600">
                              Languages:
                            </span>{" "}
                            {t.languages}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-1 text-sm text-gray-700">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span>{Number.isFinite(t.rating) ? t.rating : 0}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          <button
            onClick={handleConfirm}
            disabled={!selectedTeacher}
            className="mt-6 w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-teal-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Continue
          </button>
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Assessment
          </button>
          
          <button
            onClick={handleClose}
            className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

/* ----------------------------- Group Selection --------------------------- */
const GroupSelectionModal = ({ 
  isOpen, 
  onClose, 
  onSelectGroup,
  onBack,
  teacherId 
}) => {
  const [selectedGroup, setSelectedGroup] = useState(null);

  const dispatch = useDispatch();
  const { course_teacher_group_loading, course_teacher_group_data } = useSelector(
    (state) => state?.courses
  );

  useEffect(() => {
    if (!isOpen) return;
    if (!teacherId) return;

    dispatch(handleGetAllCourseTeacherGroups({ data: { teacher_id: teacherId } }));
  }, [isOpen, teacherId, dispatch]);

  const groups = useMemo(() => {
    const list = course_teacher_group_data?.data?.message || [];
    return list.map((g) => ({
      id: String(g?.group_id ?? g?.id ?? ""),
      title: g?.group_name || g?.title || "Group",
      day: g?.day_of_week || g?.day || "",
      time: g?.time || "",
      startDate: g?.start_date || "",
      sessionDuration: g?.session_duration || "90",
      available:
        String(g?.is_full ?? "0") !== "1" &&
        String(g?.available ?? "1") !== "0",
      raw: g,
    }));
  }, [course_teacher_group_data]);

  const handleConfirm = () => {
    if (!selectedGroup) return;
    onSelectGroup(selectedGroup);
  };

  const handleClose = () => {
    setSelectedGroup(null);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) setSelectedGroup(null);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[2000] p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-teal-50 to-cyan-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#023f4d]">
                Select Your Group
              </h2>
              <p className="text-gray-600 text-sm">
                Groups shown are based on your teacher selection
              </p>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {course_teacher_group_loading ? (
            <div className="py-12 text-center">
              <Loader2 className="w-10 h-10 animate-spin text-teal-600 mx-auto mb-3" />
              <p className="text-gray-600">Loading groups...</p>
            </div>
          ) : groups.length === 0 ? (
            <div className="p-6 rounded-xl bg-gray-50 border border-gray-200 text-center">
              <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">
                No groups available for this teacher right now.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {groups.map((g) => (
                <button
                  key={g.id}
                  onClick={() => g.available && setSelectedGroup(g)}
                  disabled={!g.available}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    selectedGroup?.id === g.id
                      ? "border-teal-500 bg-teal-50"
                      : g.available
                      ? "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      : "border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-4">
                      <Calendar
                        className={`w-5 h-5 mt-1 ${
                          selectedGroup?.id === g.id
                            ? "text-teal-600"
                            : "text-gray-400"
                        }`}
                      />
                      <div>
                        <div className="font-semibold text-gray-900">
                          {g.title}
                        </div>

                        <div className="flex gap-2 items-center">
                          <div className="font-semibold text-gray-900">
                            Current Student : {g?.raw?.current_students}
                          </div>

                          <div className="font-semibold text-gray-900">
                            Max Student : {g?.raw?.max_students}
                          </div>
                        </div>

                        {!!g.day && (
                          <div className="text-sm text-gray-600">{g.day}</div>
                        )}
                        {!!g?.raw?.session_duration && (
                          <div className="text-sm text-gray-600">
                            {g?.raw?.session_duration}
                          </div>
                        )}
                        {!!g.startDate && (
                          <div className="text-xs text-gray-500 mt-1">
                            Starts: {g.startDate}
                          </div>
                        )}
                      </div>
                    </div>

                    {!g.available && (
                      <span className="text-sm text-red-600 font-medium">
                        Fully Booked
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          <button
            onClick={handleConfirm}
            disabled={!selectedGroup}
            className="mt-6 w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-teal-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Confirm Group
          </button>
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Class Type
          </button>
          
          <button
            onClick={handleClose}
            className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

/* -------------------------- Private Schedule Selection -------------------------- */
const ScheduleSelectionModal = ({ 
  courseId, 
  selectedTeacher, 
  isOpen, 
  onClose, 
  onSelectSchedules,
  onBack 
}) => {
  const [selected, setSelected] = useState([]);
  const [loadError, setLoadError] = useState("");

  const dispatch = useDispatch();
  const { course_teacher_data, course_teacher_loading } =
    useSelector((state) => state?.courses);
  const [filteredData, setFilteredData] = useState(null);

  // Custom Time Dropdown for 1-hour slots
  const TimeDropdown = ({
    value,
    onChange,
    label,
    windowStart,
    windowEnd,
  }) => {
    const [isOpen, setIsOpen] = useState(false);

    const timeOptions = useMemo(() => {
      const options = [];

      const startMins = timeToMinutes(windowStart);
      const endMins = timeToMinutes(windowEnd);

      const isOvernight = endMins < startMins;

      const windowStartAbs = startMins;
      const windowEndAbs = isOvernight ? endMins + 1440 : endMins;

      // Show start times every 15 minutes, but ONLY if +60 stays inside window
      for (let t = windowStartAbs; t + 60 <= windowEndAbs; t += 15) {
        const startHHMM = minutesToHHMM(t % 1440);
        const endHHMM = minutesToHHMM((t + 60) % 1440);

        options.push({
          value: startHHMM,
          label: `${startHHMM} - ${endHHMM} (1 hour)`,
          startAbs: t,
          endAbs: t + 60,
        });
      }

      return options;
    }, [windowStart, windowEnd]);

    const selectedOption = timeOptions.find((opt) => opt.value === value);

    return (
      <div className="relative">
        <label className="block text-xs font-semibold text-gray-600 mb-1">
          {label}
        </label>

        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-left bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          {selectedOption ? selectedOption.label : "Select start time"}
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-y-auto">
            {timeOptions.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                No available 1-hour starts
              </div>
            ) : (
              timeOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 hover:bg-gray-100 border-b border-gray-100 last:border-0 ${
                    value === option.value
                      ? "bg-teal-50 text-teal-700 font-semibold"
                      : "text-gray-700"
                  }`}
                >
                  <div className="font-medium">{option.label}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {format24to12(option.value)} -{" "}
                    {format24to12(minutesToHHMM((timeToMinutes(option.value) + 60) % 1440))}
                  </div>
                </button>
              ))
            )}
          </div>
        )}
      </div>
    );
  };

  // Format 24h to 12h
  const format24to12 = (time24) => {
    if (!time24) return "";
    const [hours, minutes] = time24.split(":");
    const hour = parseInt(hours);
    const ampm = hour < 12 ? "AM" : "PM";
    const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${hour12}:${minutes} ${ampm}`;
  };

  // Fixed mergeWindows function
  const mergeWindows = (windows) => {
    if (!Array.isArray(windows) || windows.length === 0) return [];

    // Group by day first
    const dayGroups = {};
    windows.forEach(w => {
      const day = w.day_of_week;
      if (!dayGroups[day]) dayGroups[day] = [];
      dayGroups[day].push({
        ...w,
        startMin: timeToMinutes(toHHMM(w.start_time)),
        endMin: timeToMinutes(toHHMM(w.end_time)),
      });
    });

    const merged = [];

    // Merge within each day
    Object.entries(dayGroups).forEach(([day, dayWindows]) => {
      // Sort by start time
      dayWindows.sort((a, b) => a.startMin - b.startMin);

      let dayMerged = [];

      for (const w of dayWindows) {
        const last = dayMerged[dayMerged.length - 1];

        if (!last) {
          dayMerged.push({ ...w });
          continue;
        }

        // Check if windows overlap or are contiguous
        if (w.startMin <= last.endMin) {
          last.endMin = Math.max(last.endMin, w.endMin);
        } else {
          dayMerged.push({ ...w });
        }
      }

      // Convert back to time format
      dayMerged.forEach((w, idx) => {
        merged.push({
          key: `${day}-${idx}`,
          day_of_week: day,
          window_start: minutesToHHMM(w.startMin),
          window_end: minutesToHHMM(w.endMin),
        });
      });
    });

    return merged;
  };

  useEffect(() => {
    if (!isOpen) return;

    dispatch(handleGetAllCourseTeachers({ data: { course_id: courseId } }))
      .unwrap()
      .then(res => {
        if (res?.data?.status === "success") {
          const teachersList = res?.data?.message || [];
          const filtered = teachersList.find(item =>
            String(item?.teacher_id) === String(selectedTeacher?.id)
          );
          setFilteredData(filtered);
          setLoadError("");
        } else {
          setLoadError("Failed to load teacher data");
        }
      })
      .catch(err => {
        console.error("Error loading teachers:", err);
        setLoadError("Error loading teacher schedules");
      });
  }, [isOpen, dispatch, courseId, selectedTeacher]);

  // Normalize available windows from API
  const rawWindows = useMemo(() => {
    const list = filteredData?.teacher_slots;

    if (!Array.isArray(list)) {
      return [];
    }

    return list
      .filter(item => item?.hidden !== "1")
      .map((item) => ({
        day_of_week: item?.day || "",
        start_time: item?.slots_from || "",
        end_time: item?.slots_to || "",
      }));
  }, [filteredData]);

  // Group by day and merge into intervals
  const intervalsByDay = useMemo(() => {
    const map = new Map();

    for (const w of rawWindows) {
      const day = w.day_of_week || "";
      if (!map.has(day)) map.set(day, []);
      map.get(day).push(w);
    }

    const result = new Map();
    for (const [day, windows] of map.entries()) {
      const merged = mergeWindows(windows);
      result.set(day, merged.map((it) => ({ ...it, day_of_week: day })));
    }

    return result;
  }, [rawWindows]);

  const daysToRender = useMemo(() => {
    const existingDays = Array.from(intervalsByDay.keys());
    return existingDays.sort((a, b) => {
      const ia = DAY_ORDER.indexOf(a);
      const ib = DAY_ORDER.indexOf(b);
      if (ia === -1 && ib === -1) return String(a).localeCompare(String(b));
      if (ia === -1) return 1;
      if (ib === -1) return -1;
      return ia - ib;
    });
  }, [intervalsByDay]);

  useEffect(() => {
    if (!isOpen) {
      setSelected([]);
      setFilteredData(null);
      setLoadError("");
    }
  }, [isOpen]);

  const isPicked = (key) => selected.some((x) => x.key === key);

  const togglePickInterval = (interval) => {
    setSelected((prev) => {
      const exists = prev.some((x) => x.key === interval.key);

      if (exists) {
        return prev.filter((x) => x.key !== interval.key);
      }

      // When selecting an interval, auto-set start time and calculate 1-hour end time
      const startMins = timeToMinutes(interval.window_start);
      let endMins = startMins + 60;

      // Check if 1-hour slot fits within window
      const windowEndMins = timeToMinutes(interval.window_end);
      const isMidnightWindow = windowEndMins < startMins;

      if (isMidnightWindow) {
        // For overnight windows, adjust for next day
        const adjustedWindowEnd = windowEndMins + 1440;
        if (endMins > adjustedWindowEnd) {
          endMins = adjustedWindowEnd; // Cap at window end
        }
      } else if (endMins > windowEndMins) {
        endMins = windowEndMins; // Cap at window end
      }

      return [
        ...prev,
        {
          ...interval,
          start_time: interval.window_start,
          end_time: minutesToHHMM(endMins),
        },
      ];
    });
  };

  const updatePickedTime = (key, field, value) => {
    setSelected((prev) =>
      prev.map((x) => {
        if (x.key !== key) return x;

        if (field !== "start_time") return { ...x, [field]: value };

        const ws = timeToMinutes(x.window_start);
        const we = timeToMinutes(x.window_end);

        const isOvernight = we < ws;

        const windowStartAbs = ws;
        const windowEndAbs = isOvernight ? we + 1440 : we;

        let startMins = timeToMinutes(value);

        // If overnight and the picked start is "after midnight",
        // shift it to next-day minutes so it compares correctly.
        let startAbs =
          isOvernight && startMins < ws ? startMins + 1440 : startMins;

        // Hard clamp: keep start within window
        if (startAbs < windowStartAbs) startAbs = windowStartAbs;

        // Ensure a full hour fits: clamp start so start+60 <= windowEndAbs
        if (startAbs + 60 > windowEndAbs) {
          startAbs = windowEndAbs - 60;
        }

        const endAbs = startAbs + 60;

        return {
          ...x,
          start_time: minutesToHHMM(startAbs % 1440),
          end_time: minutesToHHMM(endAbs % 1440),
        };
      })
    );
  };

  const validateSelected = () => {
    for (const s of selected) {
      const ws = timeToMinutes(s.window_start);
      const we = timeToMinutes(s.window_end);

      const isOvernight = we < ws;

      const windowStartAbs = ws;
      const windowEndAbs = isOvernight ? we + 1440 : we;

      const ss = timeToMinutes(s.start_time);
      const se = timeToMinutes(s.end_time);

      const startAbs = isOvernight && ss < ws ? ss + 1440 : ss;
      const endAbs = isOvernight && se < ws ? se + 1440 : se;

      // Must be exactly 1 hour
      if (endAbs - startAbs !== 60) {
        return `For ${s.day_of_week}, session must be exactly 1 hour.`;
      }

      // Must be inside the selected day's window
      if (startAbs < windowStartAbs || endAbs > windowEndAbs) {
        return `For ${s.day_of_week}, session must be within ${s.window_start} - ${s.window_end}.`;
      }
    }
    return "";
  };

  const handleConfirm = () => {
    if (selected.length === 0) {
      toast.error("Please select at least one schedule");
      return;
    }

    const err = validateSelected();
    if (err) {
      toast.error(err);
      return;
    }

    const payloadSchedules = selected.map((s) => ({
      id: s.key,
      day_of_week: s.day_of_week,
      start_time: toHHMMSS(s.start_time),
      end_time: toHHMMSS(s.end_time),
      window_start: s.window_start,
      window_end: s.window_end,
    }));

    onSelectSchedules(payloadSchedules);
  };

  if (!isOpen) return null;

  const showEmpty = !course_teacher_loading && (!filteredData || rawWindows.length === 0);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[2000] p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-teal-50 to-cyan-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#023f4d]">
                Select Your 1-Hour Sessions
              </h2>
              <p className="text-gray-600 text-sm">
                Pick available time slots - each session is exactly 1 hour
              </p>
              {selectedTeacher && (
                <p className="text-xs text-gray-500 mt-1">
                  Teacher: {selectedTeacher.name}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {course_teacher_loading ? (
            <div className="py-12 flex items-center justify-center">
              <Spin size="large" spinning />
              <span className="ml-3 text-gray-600">Loading schedules...</span>
            </div>
          ) : loadError ? (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700">
              {loadError}
            </div>
          ) : showEmpty ? (
            <div className="p-6 rounded-xl bg-gray-50 border border-gray-200 text-center">
              <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">No available schedules found for this teacher.</p>
            </div>
          ) : (
            <>
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>Important:</strong> Each session is <strong>exactly 1 hour</strong>.<br />
                  When you select a start time, end time is automatically set to 1 hour later.
                </p>
              </div>

              <div className="space-y-5 mb-6">
                {daysToRender.map((day) => {
                  const intervals = intervalsByDay.get(day) || [];
                  if (intervals.length === 0) return null;

                  return (
                    <div key={day} className="border border-gray-200 rounded-xl p-4">
                      <div className="font-bold text-[#023f4d] mb-3">{day}</div>

                      <div className="space-y-3">
                        {intervals.map((it) => {
                          const picked = isPicked(it.key);
                          const pickedObj = selected.find((x) => x.key === it.key);
                          const isMidnightWindow = timeToMinutes(it.window_end) < timeToMinutes(it.window_start);

                          return (
                            <div
                              key={it.key}
                              className={`rounded-xl border-2 p-4 transition-all ${
                                picked
                                  ? "border-teal-500 bg-teal-50"
                                  : "border-gray-200 bg-white"
                              }`}
                            >
                              <div className="flex items-center justify-between gap-3 mb-3">
                                <button
                                  type="button"
                                  onClick={() => togglePickInterval(it)}
                                  className="flex items-center gap-3 text-left flex-1"
                                >
                                  <div
                                    className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                      picked
                                        ? "border-teal-600 bg-teal-600"
                                        : "border-gray-300"
                                    }`}
                                  >
                                    {picked && (
                                      <CheckCircle className="w-4 h-4 text-white" />
                                    )}
                                  </div>

                                  <div className="flex-1">
                                    <div className="text-sm font-semibold text-gray-800">
                                      Available: {it.window_start} - {it.window_end}
                                      {isMidnightWindow && (
                                        <span className="ml-2 text-xs text-amber-600">
                                          (overnight)
                                        </span>
                                      )}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      Select 1-hour slots within this window
                                    </div>
                                  </div>
                                </button>
                              </div>

                              {picked && pickedObj && (
                                <>
                                  <div className="mt-4">
                                    <TimeDropdown
                                      value={pickedObj.start_time}
                                      onChange={(value) => updatePickedTime(it.key, "start_time", value)}
                                      label="Select 1-hour session start"
                                      windowStart={it.window_start}
                                      windowEnd={it.window_end}
                                      isStartTime={true}
                                      otherTime={pickedObj.end_time}
                                    />
                                  </div>

                                  <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                                    <div className="text-sm font-semibold text-gray-800 mb-1">
                                      Selected Session:
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <div className="text-lg font-bold text-[#023f4d]">
                                          {pickedObj.start_time} - {pickedObj.end_time}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                          {format24to12(pickedObj.start_time)} - {format24to12(pickedObj.end_time)}
                                          {isMidnightWindow && " (overnight)"}
                                        </div>
                                      </div>
                                      <div className="bg-teal-100 text-teal-800 text-sm font-semibold px-3 py-1 rounded-full">
                                        1 HOUR
                                      </div>
                                    </div>
                                    <div className="mt-2 text-xs text-gray-500">
                                      Window: {it.window_start} - {it.window_end}
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50">
          {selected.length > 0 && (
            <div className="mb-4 p-3 bg-white rounded-lg border border-teal-200">
              <div className="font-semibold text-[#023f4d] mb-2">
                Selected 1-Hour Sessions ({selected.length}):
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {selected.map((s) => {
                  const isMidnight = timeToMinutes(s.window_end) < timeToMinutes(s.window_start);
                  return (
                    <div key={s.key} className="flex justify-between items-center text-sm py-2 border-b border-gray-100 last:border-0">
                      <div>
                        <div className="font-medium text-gray-800">
                          {s.day_of_week}: {s.start_time} - {s.end_time}
                          <span className="ml-2 text-xs bg-teal-100 text-teal-800 px-2 py-0.5 rounded">1h</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {format24to12(s.start_time)} - {format24to12(s.end_time)}
                          {isMidnight && " 🌙"}
                        </div>
                      </div>
                      <button
                        onClick={() => togglePickInterval(s)}
                        className="text-red-600 hover:text-red-800 text-xs px-2 py-1 rounded hover:bg-red-50"
                      >
                        Remove
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleConfirm}
              disabled={selected.length === 0}
              className="flex-1 bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-teal-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {selected.length === 0 ? "Select Sessions First" : `Confirm ${selected.length} Session${selected.length > 1 ? 's' : ''}`}
            </button>
            <button
              onClick={onBack}
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Class Type
            </button>
          </div>
          
          <div className="mt-3">
            <button
              onClick={onClose}
              className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ------------------------- Email + Final Subscription Modal ---------------------- */
const EmailNotificationModal = ({
  isOpen,
  onClose,
  onBack,
  courseData,
  userAnswers,
  selectedClassType,
  selectedSchedules,
  selectedTeacher,
  selectedGroup,
}) => {
  const dispatch = useDispatch();
  const { make_schedule_loading } = useSelector((state) => state?.courses);

  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const storedEmail = JSON.parse(localStorage.getItem("eg_user_data"))?.student_email || "";
    setEmail(storedEmail);
  }, [isOpen]);

  const handleClose = () => {
    setEmail("");
    setIsSubmitted(false);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setIsSubmitted(false);
    }
  }, [isOpen]);

  if (!isOpen || !courseData) return null;

  const prettyLevel = userAnswers?.selfAssessment
    ? userAnswers.selfAssessment
      .replace(/_/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase())
    : "";

  const buildSubscriptionPayload = () => {
    const studentId = JSON.parse(localStorage.getItem("eg_user_data"))?.student_id;
    if (!studentId) return null;

    const base = {
      course_id: String(courseData?.id),
      teacher_id: String(selectedTeacher?.id),
      student_id: String(studentId),
    };

    if (selectedClassType === "group") {
      return {
        ...base,
        subscription_type: "group",
        group_id: String(selectedGroup?.id),
        subscription_start_date: toISODate(selectedGroup?.startDate),
        session_duration: String(selectedGroup?.sessionDuration || 90),
      };
    }

    // private (interval schedules already include HH:MM:SS)
    return {
      ...base,
      subscription_type: "private",
      subscription_start_date: toISODate(new Date()),
      session_duration: "60",
      schedules: (selectedSchedules || []).map((s) => ({
        day_of_week: s.day_of_week,
        start_time: s.start_time,
        end_time: s.end_time,
      })),
    };
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();

    const studentId = JSON.parse(localStorage.getItem("eg_user_data"))?.student_id;
    if (!studentId) {
      toast.error("Student ID not found. Please log in again.");
      return;
    }

    // Validate schedules for private classes
    if (selectedClassType === "private") {
      if (!selectedSchedules || selectedSchedules.length === 0) {
        toast.error("Please select at least one schedule.");
        return;
      }
    }

    const payload = buildSubscriptionPayload();
    if (!payload) {
      toast.error("Subscription payload is missing required data.");
      return;
    }

    const res = await dispatch(handleMakeStudentSchedule({ data: payload }))
      .unwrap();

    if (res?.data?.status == "success") {
      toast.success(res?.data?.message);
      await dispatch(
        handleGetAllStudentSchedules({ data: { student_id: studentId } })
      );
      setIsSubmitted(true)
    } else {
      toast.error(res?.data?.message || "Subscription failed. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[2000] p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-teal-50 to-cyan-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-teal-600" />
              <div>
                <h2 className="text-xl font-bold text-[#023f4d]">
                  {isSubmitted ? "Enrollment Confirmed!" : "Complete Enrollment"}
                </h2>
                <p className="text-gray-600 text-sm">
                  {isSubmitted
                    ? "Your subscription is created successfully."
                    : "We'll send you enrollment details"}
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {!isSubmitted ? (
            <div>
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-4 mb-6">
                <h3 className="font-semibold text-[#023f4d] mb-3">
                  Enrollment Summary:
                </h3>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Class Type:</span>
                    <span className="font-bold text-[#023f4d]">
                      {selectedClassType === "group"
                        ? "Group Classes"
                        : "Private Classes"}
                    </span>
                  </div>

                  {prettyLevel && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Level:</span>
                      <span className="font-bold text-teal-600">
                        {prettyLevel}
                      </span>
                    </div>
                  )}

                  {selectedTeacher?.name && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Teacher:</span>
                      <span className="font-medium text-gray-800">
                        {selectedTeacher.name}
                      </span>
                    </div>
                  )}

                  {selectedClassType === "group" && selectedGroup?.title && (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Group:</span>
                        <span className="font-medium text-gray-800">
                          {selectedGroup.title}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Schedule:</span>
                        <span className="font-medium text-gray-800">
                          {selectedGroup.day || "-"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Time:</span>
                        <span className="font-medium text-gray-800">
                          {selectedGroup.time || "-"}
                        </span>
                      </div>
                    </>
                  )}

                  {selectedClassType === "private" && (
                    <>
                      <div className="text-gray-600 mt-2 font-semibold">
                        Selected Schedules:
                      </div>
                      <div className="space-y-1">
                        {(selectedSchedules || []).map((s) => (
                          <div key={s.id} className="text-sm text-gray-700">
                            • {s.day_of_week} ({toHHMM(s.start_time)} - {toHHMM(s.end_time)})
                          </div>
                        ))}
                        {(selectedSchedules || []).length === 0 && (
                          <div className="text-sm text-gray-600">
                            No schedules selected
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>

              <p className="text-gray-600 mb-4">
                Enter your email address and we will send you:
              </p>

              <ul className="text-sm text-gray-600 mb-4 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-600" />
                  Payment link and instructions
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-600" />
                  Course access details
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-600" />
                  Welcome materials and resources
                </li>
              </ul>

              <form onSubmit={handleSubmitEmail}>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    disabled
                    value={email}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={make_schedule_loading}
                    className="flex-1 bg-gradient-to-r from-[#023f4d] to-teal-600 text-white py-3 px-4 rounded-xl font-semibold hover:to-teal-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {make_schedule_loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4 mr-2" />
                        Send Enrollment Information
                      </>
                    )}
                  </button>
                  
                  <button
                    type="button"
                    onClick={onBack}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {selectedClassType === "group" ? "Back to Group Selection" : "Back to Schedule"}
                  </button>
                </div>
              </form>

              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600">
                  By providing your email, you agree to receive course
                  information and enrollment details.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckSquare className="w-8 h-8 text-green-600" />
              </div>

              <h3 className="text-xl font-bold text-[#023f4d] mb-2">
                Subscription Created!
              </h3>

              <p className="text-gray-600 mb-4">
                Enrollment details will be sent to <strong>{email}</strong>
              </p>

              <button
                onClick={handleClose}
                className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Continue Browsing
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* -------------------------------- Main Page ------------------------------ */
const CoursesEnroll = ({ params }) => {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("levels");
  const [expandedUnits, setExpandedUnits] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [subject, setSubject] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Enrollment modals
  const [showPrePlacementQuestions, setShowPrePlacementQuestions] = useState(false);
  const [showPlacementTest, setShowPlacementTest] = useState(false);
  const [showTeacherSelection, setShowTeacherSelection] = useState(false);
  const [showClassTypeSelection, setShowClassTypeSelection] = useState(false);
  const [showGroupSelection, setShowGroupSelection] = useState(false);
  const [showScheduleSelection, setShowScheduleSelection] = useState(false);
  const [showEmailNotification, setShowEmailNotification] = useState(false);

  // Enrollment data
  const [userAnswers, setUserAnswers] = useState(null);
  const [placementTestScore, setPlacementTestScore] = useState(null);
  const [selectedClassType, setSelectedClassType] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedSchedules, setSelectedSchedules] = useState([]);

  const unwrappedParams = params;

  useEffect(() => {
    const user = localStorage.getItem(configs.localstorageEgyIntstituteTokenName);
    setIsLoggedIn(!!user);
  }, []);

  useEffect(() => {
    const fetchSubjectData = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));

      const subjectData = {
        id: unwrappedParams?.id,
        title: "Egyptian Arabic Complete Course",
        description:
          "Master Egyptian Arabic from beginner to advanced with comprehensive lessons covering daily conversations, cultural contexts, and practical communication skills.",
        longDescription:
          "This comprehensive Egyptian Arabic course is designed for learners who want to communicate effectively in everyday Egyptian life. Through interactive lessons, real-life dialogues, and cultural insights, you'll learn to speak, understand, and interact confidently in Egyptian Arabic.",
        instructor: "Ahmed Hassan",
        duration: "12 weeks",
        students: 2847,
        rating: 4.9,
        reviews: 312,
        price: 149,
        originalPrice: 199,
        totalExams: 36,
        totalFlashcardSets: 24,
        image: "/images/online-course-of-study.jpg",
        advertisingVideoType: "url",
        advertisingVideoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        publicExams: [
          {
            id: 1,
            title: "Egyptian Arabic Basics - Free Trial",
            questions: 20,
            duration: "25 min",
            type: "MCQ",
            isFree: true,
            description: "Test your basic Egyptian Arabic knowledge",
          },
        ],
        units: [
          {
            id: 1,
            title: "Unit 1: Getting Started with Egyptian Arabic",
            description:
              "Foundation of Egyptian Arabic communication and pronunciation",
            topics: [
              {
                id: 1,
                title: "Arabic Alphabet & Pronunciation",
                description:
                  "Master the Arabic alphabet and Egyptian pronunciation patterns",
              },
            ],
          },
        ],
      };

      setSubject(subjectData);
      setIsLoading(false);
    };

    fetchSubjectData();
  }, [unwrappedParams?.id]);

  const handleStartEnrollment = () => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    setUserAnswers(null);
    setPlacementTestScore(null);
    setSelectedClassType(null);
    setSelectedTeacher(null);
    setSelectedGroup(null);
    setSelectedSchedules([]);

    setShowPrePlacementQuestions(true);
  };

  const handlePrePlacementComplete = (answers) => {
    setUserAnswers(answers);
    setShowPrePlacementQuestions(false);

    if (answers.selfAssessment === "absolute_beginner") {
      setShowTeacherSelection(true);
    } else {
      setShowPlacementTest(true);
    }
  };

  const handlePlacementTestComplete = (score) => {
    setPlacementTestScore(score);
    setShowPlacementTest(false);
    setShowTeacherSelection(true);
  };

  const handleTeacherSelect = (teacher) => {
    setSelectedTeacher(teacher);
    setShowTeacherSelection(false);
    setShowClassTypeSelection(true);
  };

  const handleClassTypeSelect = (type) => {
    setSelectedClassType(type);
    setShowClassTypeSelection(false);

    if (type === "group") {
      setShowGroupSelection(true);
      return;
    }

    setShowScheduleSelection(true);
  };

  const handleGroupSelect = (group) => {
    setSelectedGroup(group);
    setShowGroupSelection(false);
    setShowEmailNotification(true);
  };

  const handleSchedulesSelect = (schedulesArr) => {
    const formattedSchedules = (schedulesArr || []).map((s) => ({
      ...s,
      start_time: toHHMMSS(s.start_time),
      end_time: toHHMMSS(s.end_time),
    }));

    setSelectedSchedules(formattedSchedules);
    setShowScheduleSelection(false);
    setShowEmailNotification(true);
  };

  const toggleUnit = (unitId) => {
    const newExpandedUnits = new Set(expandedUnits);
    if (newExpandedUnits.has(unitId)) newExpandedUnits.delete(unitId);
    else newExpandedUnits.add(unitId);
    setExpandedUnits(newExpandedUnits);
  };

  const renderAdvertisingVideo = () => {
    if (!subject?.advertisingVideoType) return null;

    let videoSrc = null;
    if (subject.advertisingVideoType === "url" && subject.advertisingVideoUrl) {
      videoSrc = subject.advertisingVideoUrl;
    }
    if (!videoSrc) return null;

    return (
      <div className="mb-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Video className="w-6 h-6 text-[#023f4d]" />
              <div>
                <h2 className="text-xl font-bold text-[#023f4d]">
                  Course Preview
                </h2>
                <p className="text-gray-600 text-sm">
                  Get a taste of what you'll learn in this course
                </p>
              </div>
            </div>
          </div>

          <div className="relative bg-black">
            <video
              className="w-full h-auto max-h-[500px] object-cover"
              controls
              preload="metadata"
              poster={subject.image}
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
              onEnded={() => setIsVideoPlaying(false)}
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg backdrop-blur-sm">
              <div className="flex items-center gap-2 text-sm">
                <Volume2 className="w-4 h-4" />
                <span>Course Introduction</span>
              </div>
            </div>

            {isVideoPlaying && (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium animate-pulse">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-white rounded-full" />
                  LIVE PREVIEW
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-gradient-to-r from-teal-50 to-cyan-50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="font-semibold text-[#023f4d] mb-1">
                  Why Choose This Course?
                </h3>
                <p className="text-gray-600 text-sm">
                  Watch this preview to understand our teaching methodology and
                  course quality
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4 text-teal-600" />
                  <span>{subject.students.toLocaleString()} students enrolled</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span>{subject.rating} rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!subject) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#023f4d] mx-auto mb-4" />
          <p className="text-gray-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  const levels = [
    {
      id: 1,
      level: "Level 1",
      title: "Egyptian Arabic Conversation Course",
      duration: "12 Weeks",
      description:
        "Start speaking Egyptian Arabic confidently, from zero to real-life conversations!",
      points: [
        "Attached & Detached Pronouns – use them naturally in daily conversations.",
        "Verb conjugation in past, present, future, and imperative forms.",
        "Essential grammar patterns for questions, negation, offers, and natural sentence building.",
        "Speaking & listening practice with real-life dialogues and pronunciation exercises.",
        "Common Egyptian expressions and phrases used in everyday life.",
      ],
      link: `/courses/courseContent/`,
      button: "Enroll in Level 1",
    },
  ];

  return (
    <>
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {renderAdvertisingVideo()}

              <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="lg:w-1/3">
                    <div className="relative">
                      <img
                        src={subject.image}
                        alt={subject.title}
                        className="w-full h-48 object-cover rounded-xl"
                      />
                      <button className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors rounded-xl">
                        <Brain className="w-12 h-12 text-white" />
                      </button>
                    </div>
                  </div>

                  <div className="lg:w-2/3">
                    <h1 className="text-3xl font-bold text-[#023f4d] mb-4">
                      {subject.title}
                    </h1>
                    <p className="text-gray-600 mb-6">{subject.description}</p>

                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-5 h-5 text-teal-600" />
                        <span className="text-sm text-gray-600">
                          {subject.duration}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-5 h-5 text-teal-600" />
                        <span className="text-sm text-gray-600">
                          {subject.students} students
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="w-5 h-5 text-yellow-500" />
                        <span className="text-sm text-gray-600">
                          {subject.rating} ({subject.reviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm">
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-8 px-6 overflow-x-auto">
                    <button
                      onClick={() => setActiveTab("overview")}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 whitespace-nowrap ${
                        activeTab === "overview"
                          ? "border-[#023f4d] text-[#023f4d]"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Overview
                    </button>
                    <button
                      onClick={() => setActiveTab("units")}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 whitespace-nowrap ${
                        activeTab === "units"
                          ? "border-[#023f4d] text-[#023f4d]"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Course Content
                    </button>
                    <button
                      onClick={() => setActiveTab("instructor")}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 whitespace-nowrap ${
                        activeTab === "instructor"
                          ? "border-[#023f4d] text-[#023f4d]"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Instructor
                    </button>
                    <button
                      onClick={() => setActiveTab("levels")}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 whitespace-nowrap ${
                        activeTab === "levels"
                          ? "border-[#023f4d] text-[#023f4d]"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Levels
                    </button>
                  </nav>
                </div>

                <div className="p-6">
                  {activeTab === "overview" && (
                    <div>
                      <h3 className="text-xl font-bold text-[#023f4d] mb-4">
                        Course Overview
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-6">
                        {subject.longDescription}
                      </p>

                      <h4 className="text-lg font-bold text-[#023f4d] mb-4">
                        What you'll learn:
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-teal-600 mt-1" />
                          <span className="text-gray-700">
                            Read and write Arabic script fluently
                          </span>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-teal-600 mt-1" />
                          <span className="text-gray-700">
                            Engage in everyday Egyptian conversations
                          </span>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-teal-600 mt-1" />
                          <span className="text-gray-700">
                            Understand Egyptian movies and TV shows
                          </span>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-teal-600 mt-1" />
                          <span className="text-gray-700">
                            Master Egyptian expressions and idioms
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "units" && (
                    <div>
                      <h3 className="text-xl font-bold text-[#023f4d] mb-6">
                        Course Content
                      </h3>
                      <div className="space-y-4">
                        {subject.units.map((unit) => (
                          <div
                            key={unit.id}
                            className="border border-gray-200 rounded-xl overflow-hidden hover:border-[#023f4d] transition-colors"
                          >
                            <button
                              onClick={() => toggleUnit(unit.id)}
                              className="w-full p-6 bg-white hover:bg-gray-50 transition-colors flex items-center justify-between"
                            >
                              <div className="flex items-center space-x-3">
                                <FolderOpen className="w-6 h-6 text-[#023f4d]" />
                                <div className="text-left">
                                  <h4 className="text-lg font-bold text-[#023f4d]">
                                    {unit.title}
                                  </h4>
                                  <p className="text-sm text-gray-600">
                                    {unit.description}
                                  </p>
                                </div>
                              </div>
                              {expandedUnits.has(unit.id) ? (
                                <ChevronDown className="w-5 h-5 text-[#023f4d]" />
                              ) : (
                                <ChevronRight className="w-5 h-5 text-[#023f4d]" />
                              )}
                            </button>

                            {expandedUnits.has(unit.id) && (
                              <div className="border-t border-gray-200 bg-gray-50 p-6">
                                <div className="space-y-4">
                                  {unit.topics.map((topic) => (
                                    <div
                                      key={topic.id}
                                      className="bg-white rounded-lg p-4 border border-gray-200"
                                    >
                                      <h5 className="font-semibold text-[#023f4d] mb-2">
                                        {topic.title}
                                      </h5>
                                      <p className="text-sm text-gray-600">
                                        {topic.description}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "instructor" && (
                    <div>
                      <h3 className="text-xl font-bold text-[#023f4d] mb-4">
                        About the Instructor
                      </h3>
                      <div className="grid grid-cols-[auto_1fr] gap-4">
                        <div className="w-[64px] h-[64px] bg-[#023f4d] rounded-full flex items-center justify-center">
                          <span className="text-2xl font-bold text-white">AH</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-[#023f4d]">
                            {subject.instructor}
                          </h4>
                          <p className="text-gray-600 mb-4">
                            Native Egyptian Arabic Teacher & Cultural Expert
                          </p>
                          <p className="text-gray-600">
                            Ahmed Hassan is a certified Arabic language instructor
                            with over 10 years of experience.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "levels" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {levels.map((level) => (
                        <LevelCard key={level?.id} item={level} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-[6rem]">
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-[#023f4d]">
                      ${subject.price}
                    </div>
                    <div className="text-lg text-gray-500 line-through">
                      ${subject.originalPrice}
                    </div>
                    <div className="text-sm text-teal-600 font-medium">
                      25% off - Limited Time
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl border border-teal-200 mb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Target className="w-5 h-5 text-teal-600" />
                        <h4 className="font-semibold text-[#023f4d]">
                          Start Your Journey
                        </h4>
                      </div>
                      <p className="text-sm text-gray-600">
                        {isLoggedIn
                          ? "Complete a quick assessment to find your perfect starting point"
                          : "Sign in to start your enrollment process"}
                      </p>
                    </div>

                    <button
                      onClick={handleStartEnrollment}
                      className="w-full bg-gradient-to-r from-[#023f4d] to-teal-600 text-white py-3 px-4 rounded-xl font-semibold hover:to-teal-700 transition-all duration-300 flex items-center justify-center"
                    >
                      {isLoggedIn ? (
                        <>
                          <Target className="w-4 h-4 mr-2" />
                          Start Enrollment
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 mr-2" />
                          Sign In to Enroll
                        </>
                      )}
                    </button>

                    <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                      Add to Wishlist
                    </button>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 font-semibold">
                        This course includes:
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-teal-600" />
                        <span className="text-sm text-gray-700">
                          {subject.totalExams} Practice Tests
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-teal-600" />
                        <span className="text-sm text-gray-700">
                          {subject.totalFlashcardSets} Flashcard Sets
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-teal-600" />
                        <span className="text-sm text-gray-700">
                          Lifetime Access
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-teal-600" />
                        <span className="text-sm text-gray-700">
                          Certificate of Completion
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                      <Lock className="w-4 h-4" />
                      <span>30-day money-back guarantee</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {isLoading && (
            <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-[2001]">
              <div className="bg-white rounded-2xl p-6 shadow-lg flex items-center gap-3">
                <Loader2 className="w-6 h-6 animate-spin text-[#023f4d]" />
                <span className="text-gray-700">Loading...</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <PrePlacementQuestionsModal
        isOpen={showPrePlacementQuestions}
        onClose={() => setShowPrePlacementQuestions(false)}
        onComplete={handlePrePlacementComplete}
      />

      <OralMeetingModal
        open={showPlacementTest}
        onClose={() => setShowPlacementTest(false)}
        onSubmit={handlePlacementTestComplete}
      />

      <TeacherSelectionModal
        isOpen={showTeacherSelection}
        onClose={() => setShowTeacherSelection(false)}
        onSelectTeacher={handleTeacherSelect}
        onBack={() => {
          setShowTeacherSelection(false);
          if (userAnswers?.selfAssessment === "absolute_beginner") {
            setShowPrePlacementQuestions(true);
          } else {
            setShowPlacementTest(true);
          }
        }}
        courseId={unwrappedParams?.id}
      />

      <ClassTypeSelectionModal
        isOpen={showClassTypeSelection}
        onClose={() => setShowClassTypeSelection(false)}
        onSelectType={handleClassTypeSelect}
        onBack={() => {
          setShowClassTypeSelection(false);
          setShowTeacherSelection(true);
        }}
        teacherId={selectedTeacher?.id}
        isAbsoluteBeginner={userAnswers?.selfAssessment === "absolute_beginner"}
      />

      <GroupSelectionModal
        isOpen={showGroupSelection}
        onClose={() => setShowGroupSelection(false)}
        onSelectGroup={handleGroupSelect}
        onBack={() => {
          setShowGroupSelection(false);
          setShowClassTypeSelection(true);
        }}
        teacherId={selectedTeacher?.id}
      />

      <ScheduleSelectionModal
        courseId={unwrappedParams?.id}
        selectedTeacher={selectedTeacher}
        isOpen={showScheduleSelection}
        onClose={() => setShowScheduleSelection(false)}
        onSelectSchedules={handleSchedulesSelect}
        onBack={() => {
          setShowScheduleSelection(false);
          setShowClassTypeSelection(true);
        }}
      />

      <EmailNotificationModal
        isOpen={showEmailNotification}
        onClose={() => setShowEmailNotification(false)}
        onBack={() => {
          setShowEmailNotification(false);
          if (selectedClassType === "group") {
            setShowGroupSelection(true);
          } else {
            setShowScheduleSelection(true);
          }
        }}
        courseData={subject}
        userAnswers={userAnswers}
        selectedClassType={selectedClassType}
        selectedSchedules={selectedSchedules}
        selectedTeacher={selectedTeacher}
        selectedGroup={selectedGroup}
      />
    </>
  );
};

export default CoursesEnroll;