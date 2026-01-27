"use client";

import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { X, ArrowLeft, Clock } from "lucide-react";
import {
  Card,
  Avatar,
  Tag,
  Button,
  Spin,
  Empty,
  Typography,
  Space,
  Divider,
  Tooltip,
  Badge,
} from "antd";
import { handleGetAllCourseTeachers } from "@/libs/features/coursesSlice";
import {
  UserOutlined,
  StarFilled,
  ClockCircleOutlined,
  GlobalOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

export default function TeacherSelectionModal({
  isOpen,
  onClose,
  onSelectTeacher,
  onBack,
  courseId,
}) {
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const dispatch = useDispatch();
  const { course_teacher_loading, course_teacher_data } = useSelector(
    (state) => state?.courses
  );

  useEffect(() => {
    if (!isOpen || !courseId) return;
    dispatch(handleGetAllCourseTeachers({ data: { course_id: courseId } }));
  }, [isOpen, courseId, dispatch]);

  const teachers = useMemo(() => {
    const list = course_teacher_data?.message || [];
    return list.map((t) => {
      // Parse languages separated by **
      const languagesArray = t?.languages
        ? t.languages.split("**").filter(Boolean)
        : [];

      // Parse tags separated by commas
      const tagsArray = t?.tags
        ? t.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
        : [];

      // Get teacher slots
      const slots = Array.isArray(t?.teacher_slots) ? t.teacher_slots : [];
      const availableDays = slots
        .filter((s) => s?.hidden !== "1")
        .map((s) => s?.day)
        .filter(Boolean);

      return {
        id: String(t.teacher_id ?? ""),
        name: t?.teacher_name || "Teacher",
        email: t?.teacher_email || "",
        phone: t?.phone || "",
        bio: t?.bio || t?.specialization || "",
        specialization: t?.specialization || "",
        tags: tagsArray,
        languages: languagesArray,
        level: t?.level || "",
        rating: Number(t?.rate || 0),
        hourlyRate: t?.hourly_rate || "",
        experienceHours: t?.experience_hours || "",
        image: t?.teacher_image || "",
        slots: slots,
        availableDays: availableDays,
        raw: t,
      };
    });
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
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 p-6 border-b border-gray-200 bg-gradient-to-r from-teal-50 to-cyan-50">
          <div className="flex items-center justify-between">
            <div>
              <Title level={3} className="!mb-1 !text-[#023f4d]">
                Select Your Teacher
              </Title>
              <Text type="secondary" className="text-sm">
                Choose your teacher first, then pick your learning path
              </Text>
            </div>
            <Button
              type="text"
              shape="circle"
              icon={<X className="w-5 h-5" />}
              onClick={handleClose}
              className="hover:bg-white/50"
            />
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {course_teacher_loading ? (
            <div className="py-20 flex flex-col items-center justify-center">
              <Spin size="large" />
              <Text type="secondary" className="mt-4">
                Loading teachers...
              </Text>
            </div>
          ) : teachers.length === 0 ? (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <span className="text-gray-600">
                  No teachers available right now.
                  <br />
                  <Text type="secondary" className="text-sm">
                    Please try again later or contact support.
                  </Text>
                </span>
              }
              className="py-12"
            />
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {teachers.map((t) => {
                  const active = selectedTeacher?.id === t.id;
                  return (
                    <Card
                      key={t.id}
                      hoverable
                      onClick={() => setSelectedTeacher(t)}
                      className={`!rounded-2xl transition-all duration-300 cursor-pointer relative ${
                        active
                          ? "!border-2 !border-teal-500 shadow-lg shadow-teal-100"
                          : "!border !border-gray-200 hover:shadow-md"
                      }`}
                      style={{
                        backgroundColor: active ? "#f0fdfa" : "white",
                      }}
                      bodyStyle={{ padding: "20px" }}
                    >
                      {/* Selected Indicator */}
                      {active && (
                        <div className="absolute top-3 right-3 z-10">
                          <div className="w-7 h-7 rounded-full bg-teal-500 flex items-center justify-center shadow-md">
                            <svg
                              className="w-4 h-4 text-white"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2.5"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path d="M5 13l4 4L19 7"></path>
                            </svg>
                          </div>
                        </div>
                      )}

                      <div className="flex items-start gap-4">
                        {/* Avatar */}
                        <Badge
                          count={
                            t.availableDays.length > 0 ? (
                              <Tooltip
                                title={`Available: ${t.availableDays.join(", ")}`}
                              >
                                <div className="w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                                  <CalendarOutlined className="text-white text-[10px]" />
                                </div>
                              </Tooltip>
                            ) : null
                          }
                          offset={[-5, 50]}
                        >
                          <Avatar
                            size={70}
                            src={t.image}
                            icon={<UserOutlined />}
                            className={`flex-shrink-0 transition-all ${
                              active
                                ? "ring-2 ring-teal-500 ring-offset-2"
                                : "ring-1 ring-gray-200"
                            }`}
                            style={{
                              backgroundColor: t.image
                                ? "transparent"
                                : "#14b8a6",
                            }}
                          >
                            {!t.image && t.name?.slice(0, 2)?.toUpperCase()}
                          </Avatar>
                        </Badge>

                        {/* Content */}
                        <div className="flex-1 min-w-0 pr-8">
                          {/* Name */}
                          <Title
                            level={5}
                            className={`!mb-1 !leading-tight ${
                              active ? "!text-teal-700" : "!text-gray-900"
                            }`}
                          >
                            {t.name}
                          </Title>

                          {/* Rating & Experience */}
                          <div className="flex items-center gap-3 mb-2">
                            <div className="flex items-center gap-1">
                              <StarFilled className="text-yellow-500 text-sm" />
                              <Text className="text-sm font-semibold">
                                {t.rating.toFixed(1)}
                              </Text>
                            </div>
                            {t.experienceHours && (
                              <>
                                <Divider
                                  type="vertical"
                                  className="!my-0 !bg-gray-300"
                                />
                                <div className="flex items-center gap-1">
                                  <ClockCircleOutlined className="text-gray-400 text-xs" />
                                  <Text className="text-xs text-gray-600">
                                    {t.experienceHours}h exp
                                  </Text>
                                </div>
                              </>
                            )}
                          </div>

                          {/* Bio/Specialization */}
                          {t.specialization && (
                            <Text className="text-sm text-gray-600 block mb-2">
                              <span className="font-semibold">
                                Specialization:
                              </span>{" "}
                              {t.specialization}
                            </Text>
                          )}

                          {t.bio && t.bio !== t.specialization && (
                            <Paragraph
                              ellipsis={{ rows: 2 }}
                              className="!mb-3 !text-sm !text-gray-600"
                            >
                              {t.bio}
                            </Paragraph>
                          )}

                          {/* Tags */}
                          {t.tags.length > 0 && (
                            <Space size={[4, 6]} wrap className="mb-3">
                              {t.tags.slice(0, 3).map((tag, idx) => (
                                <Tag
                                  key={idx}
                                  color={active ? "cyan" : "default"}
                                  className="!rounded-full !px-2.5 !py-0.5 !text-xs !m-0"
                                >
                                  {tag}
                                </Tag>
                              ))}
                              {t.tags.length > 3 && (
                                <Tooltip
                                  title={t.tags.slice(3).join(", ")}
                                  placement="top"
                                >
                                  <Tag
                                    color={active ? "cyan" : "default"}
                                    className="!rounded-full !px-2.5 !py-0.5 !text-xs !m-0"
                                  >
                                    +{t.tags.length - 3}
                                  </Tag>
                                </Tooltip>
                              )}
                            </Space>
                          )}

                          {/* Level & Hourly Rate */}
                          <div className="flex items-center gap-2 mb-3">
                            {t.level && (
                              <Tag
                                color={active ? "blue" : "default"}
                                className="!rounded-full !px-2.5 !py-0.5 !text-xs !m-0"
                              >
                                {t.level}
                              </Tag>
                            )}
                            {t.hourlyRate && (
                              <Tag
                                color={active ? "green" : "success"}
                                icon={<ClockCircleOutlined />}
                                className="!rounded-full !px-2.5 !py-0.5 !text-xs !m-0"
                              >
                                ${t.hourlyRate}/hr
                              </Tag>
                            )}
                          </div>

                          {/* Languages */}
                          {t.languages.length > 0 && (
                            <div className="flex items-center gap-2">
                              <GlobalOutlined className="text-gray-400 text-xs mt-0.5" />
                              <div className="flex-1">
                                <Space size={[4, 4]} wrap>
                                  {t.languages.map((lang, idx) => (
                                    <Text
                                      key={idx}
                                      className="text-xs text-gray-600"
                                    >
                                      {lang}
                                      {idx < t.languages.length - 1 && " •"}
                                    </Text>
                                  ))}
                                </Space>
                              </div>
                            </div>
                          )}

                          {/* Available Days */}
                          {t.availableDays.length > 0 && (
                            <div className="mt-2 pt-2 border-t border-gray-100">
                              <div className="flex items-center gap-2">
                                <CalendarOutlined className="text-gray-400 text-xs" />
                                <Text className="text-xs text-gray-500">
                                  Available:{" "}
                                  <span className="font-medium text-gray-700">
                                    {t.availableDays.join(", ")}
                                  </span>
                                </Text>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>

              {/* Continue Button */}
              <Button
                type="primary"
                size="large"
                block
                disabled={!selectedTeacher}
                onClick={handleConfirm}
                className="!mt-6 !h-12 !rounded-xl !font-semibold !text-base"
                style={{
                  background: selectedTeacher
                    ? "linear-gradient(to right, #14b8a6, #06b6d4)"
                    : undefined,
                  border: "none",
                }}
              >
                Continue with{" "}
                {selectedTeacher ? selectedTeacher.name : "Selected Teacher"}
              </Button>
            </>
          )}
        </div>

        {/* Footer */}
        <Divider className="!my-0" />
        <div className="p-6 bg-gray-50 flex justify-between items-center">
          <Button
            size="large"
            onClick={onBack}
            icon={<ArrowLeft className="w-4 h-4" />}
            className="!rounded-xl !border-gray-300 hover:!border-teal-500 hover:!text-teal-600"
          >
            Back to Assessment
          </Button>

          <Button
            size="large"
            onClick={handleClose}
            className="!rounded-xl !border-gray-300 hover:!border-gray-400"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
