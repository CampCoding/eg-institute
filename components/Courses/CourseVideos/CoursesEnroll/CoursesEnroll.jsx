"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { configs } from "@/libs/configs";

// Components
import AdvertisingVideo from "./components/AdvertisingVideo";
import CourseHeader from "./components/CourseHeader";
import CourseTabs from "./components/CourseTabs";
import EnrollmentSidebar from "./components/EnrollmentSidebar";

// Modals
import PrePlacementQuestionsModal from "./components/modals/PrePlacementQuestionsModal";
import OralMeetingModal from "./components/modals/OralMeetingModal"; // ✅ Local import
import TeacherSelectionModal from "./components/modals/TeacherSelectionModal";
import ClassTypeSelectionModal from "./components/modals/ClassTypeSelectionModal";
import GroupSelectionModal from "./components/modals/GroupSelectionModal";
import ScheduleSelectionModal from "./components/modals/ScheduleSelectionModal";
import EmailNotificationModal from "./components/modals/EmailNotificationModal";
import useFetchCourseDetails from "./hooks/useFetchCourseDetails";

export default function CoursesEnroll({ params }) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Enrollment modals
  const [showPrePlacementQuestions, setShowPrePlacementQuestions] =
    useState(false);
  const [showPlacementTest, setShowPlacementTest] = useState(false);
  const [showTeacherSelection, setShowTeacherSelection] = useState(false);
  const [showClassTypeSelection, setShowClassTypeSelection] = useState(false);
  const [showGroupSelection, setShowGroupSelection] = useState(false);
  const [showScheduleSelection, setShowScheduleSelection] = useState(false);
  const [showEmailNotification, setShowEmailNotification] = useState(false);
  const [placementTestMeeting, setPlacementTestMeeting] = useState(null);

  // Enrollment data
  const [userAnswers, setUserAnswers] = useState(null);
  const [placementTestScore, setPlacementTestScore] = useState(null);
  const [selectedClassType, setSelectedClassType] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedSchedules, setSelectedSchedules] = useState([]);

  const courseId = params?.id;

  useEffect(() => {
    const user = localStorage.getItem(
      configs.localstorageEgyIntstituteTokenName
    );
    setIsLoggedIn(!!user);
  }, []);

  const {
    data: courseResponse,
    isLoading,
    error,
  } = useFetchCourseDetails(courseId);
  const courseData = courseResponse?.message;

  const handleStartEnrollment = () => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    // Reset enrollment data
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

  const handlePlacementTestComplete = (meetingData) => {
    // ✅ Store meeting data without submitting
    setPlacementTestMeeting(meetingData);
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
    setSelectedSchedules(schedulesArr);
    setShowScheduleSelection(false);
    setShowEmailNotification(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#023f4d] mx-auto mb-4" />
          <p className="text-gray-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Course not found</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <AdvertisingVideo course={courseData} />
              <CourseHeader course={courseData} />
              <CourseTabs course={courseData} />
            </div>

            <div className="lg:col-span-1">
              <EnrollmentSidebar
                course={courseData}
                isLoggedIn={isLoggedIn}
                onEnrollClick={handleStartEnrollment}
              />
            </div>
          </div>
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
        courseId={courseId} // ✅ Pass courseId
        initial={{
          course_title: courseData?.course_name,
        }}
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
        courseId={courseId}
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
        groupPrice={courseData?.group_price}
        privatePrice={courseData?.private_price}
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
        courseId={courseId}
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
        courseData={courseData}
        userAnswers={userAnswers}
        selectedClassType={selectedClassType}
        selectedSchedules={selectedSchedules}
        selectedTeacher={selectedTeacher}
        selectedGroup={selectedGroup}
        placementTestMeeting={placementTestMeeting}
      />
    </>
  );
}
