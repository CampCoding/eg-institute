"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  X,
  Calendar,
  Phone,
  Video,
  MessageSquare,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  Form,
  DatePicker,
  Input,
  Button,
  Spin,
  Radio,
  Tag,
  Typography,
} from "antd";
import { handleGetAllReservedMeeting } from "@/libs/features/meetingSlice";
import dayjs from "dayjs";

const { TextArea } = Input;
const { Title, Text } = Typography;

export default function OralMeetingModal({
  open,
  onClose,
  onSubmit,
  initial = {},
  courseId,
}) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { all_reserved_meetings_loading, all_reserved_meetings_list } =
    useSelector((state) => state?.meeting);

  const [selectedDate, setSelectedDate] = useState(null);
  const [timeInput, setTimeInput] = useState("");
  const [selectedReservationId, setSelectedReservationId] = useState("");
  const [platform, setPlatform] = useState("Zoom");

  const platforms = [
    { label: "Zoom", value: "Zoom", icon: Video },
    { label: "WhatsApp", value: "WhatsApp", icon: Phone },
  ];

  useEffect(() => {
    if (!open) return;

    setSelectedDate(null);
    setTimeInput("");
    setSelectedReservationId("");
    setPlatform("Zoom");
    form.resetFields();

    dispatch(handleGetAllReservedMeeting());
  }, [open, dispatch, form]);

  const allSlots = useMemo(() => {
    const msg =
      all_reserved_meetings_list?.message ||
      all_reserved_meetings_list?.data ||
      [];
    return Array.isArray(msg) ? msg : [];
  }, [all_reserved_meetings_list]);

  const availableSlots = useMemo(() => {
    return allSlots.filter((m) => {
      const status = String(m?.status || "").toLowerCase();
      const hasStudent =
        m?.student_id !== null &&
        m?.student_id !== undefined &&
        String(m.student_id) !== "";

      if (hasStudent) return false;
      if (["booked", "reserved", "accepted", "confirmed"].includes(status))
        return false;

      return true;
    });
  }, [allSlots]);

  // ✅ Get unique available dates from API
  const availableDates = useMemo(() => {
    const dates = new Set();
    availableSlots.forEach((slot) => {
      if (slot?.meeting_date) {
        dates.add(slot.meeting_date);
      }
    });
    return Array.from(dates);
  }, [availableSlots]);

  const slotsByDate = useMemo(() => {
    if (!selectedDate) return [];
    const dateStr = dayjs(selectedDate).format("YYYY-MM-DD");
    return availableSlots
      .filter((s) => String(s.meeting_date) === dateStr)
      .sort((a, b) =>
        String(a.meeting_time || "").localeCompare(String(b.meeting_time || ""))
      );
  }, [availableSlots, selectedDate]);

  const allowedTimeInputs = useMemo(() => {
    const set = new Set();
    for (const s of slotsByDate) {
      const hhmm = toHHMM(s?.meeting_time);
      if (hhmm) set.add(hhmm);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [slotsByDate]);

  const findSlotByTime = (hhmm) => {
    if (!hhmm) return null;
    return (
      slotsByDate.find((s) => toHHMM(s?.meeting_time) === String(hhmm)) || null
    );
  };

  useEffect(() => {
    if (!selectedDate) return;

    if (allowedTimeInputs.length === 0) {
      setTimeInput("");
      setSelectedReservationId("");
      return;
    }

    const firstTime = allowedTimeInputs[0];
    setTimeInput(firstTime);

    const slot = findSlotByTime(firstTime);
    setSelectedReservationId(
      slot?.meeting_resrvations_id ? String(slot.meeting_resrvations_id) : ""
    );
  }, [selectedDate, allowedTimeInputs]);

  useEffect(() => {
    if (!selectedDate || !timeInput) {
      setSelectedReservationId("");
      return;
    }

    const slot = findSlotByTime(timeInput);
    setSelectedReservationId(
      slot?.meeting_resrvations_id ? String(slot.meeting_resrvations_id) : ""
    );
  }, [selectedDate, timeInput]);

  // ✅ Handle Continue - Pass data to parent without API call
  const handleContinue = (values) => {
    if (!selectedDate) {
      toast.error("Please select a date");
      return;
    }

    if (!timeInput) {
      toast.error("Please select a time");
      return;
    }

    if (!selectedReservationId) {
      toast.error("This slot is not available. Choose another time.");
      return;
    }

    // ✅ Pass meeting data to parent (will be submitted later with subscription)
    const meetingData = {
      meeting_resrvations_id: String(selectedReservationId),
      meeting_type: platformToMeetingType(platform),
      meeting_date: dayjs(selectedDate).format("YYYY-MM-DD"),
      meeting_time: toHHMMSS(timeInput),
      note: values.notes || "",
      platform: platform,
    };

    onSubmit(meetingData);
    onClose();
  };

  // ✅ Disable all dates except those from API
  const disabledDate = (current) => {
    if (!current) return true;

    // Disable dates before today
    if (current < dayjs().startOf("day")) {
      return true;
    }

    // Only enable dates from API
    const dateStr = current.format("YYYY-MM-DD");
    return !availableDates.includes(dateStr);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 bg-gradient-to-r from-teal-50 to-cyan-50 border-b border-teal-100">
          <div>
            <Text type="secondary" className="text-xs block mb-1">
              {initial?.course_title || "Course"}
            </Text>
            <Title level={4} className="!mb-0 !text-gray-800">
              Schedule Placement Test
            </Title>
          </div>

          <Button
            type="text"
            shape="circle"
            icon={<X className="w-5 h-5" />}
            onClick={onClose}
            className="hover:bg-white/50"
          />
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {all_reserved_meetings_loading ? (
            <div className="py-16 flex flex-col items-center justify-center gap-4">
              <Spin size="large" />
              <Text type="secondary">Loading available dates...</Text>
            </div>
          ) : (
            <Form
              form={form}
              layout="vertical"
              onFinish={handleContinue}
              className="space-y-1"
            >
              {/* Platform Selection */}
              <Form.Item
                label={
                  <span className="text-sm font-semibold text-gray-800">
                    Preferred Platform
                  </span>
                }
              >
                <Radio.Group
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full"
                >
                  <div className="grid grid-cols-2 gap-3">
                    {platforms.map((p) => (
                      <Radio.Button
                        key={p.value}
                        value={p.value}
                        className={`!h-auto !py-3 !px-4 !rounded-xl !border-2 transition-all ${
                          platform === p.value
                            ? "!bg-teal-50 !border-teal-400 !text-teal-800"
                            : "!bg-white !border-gray-200 hover:!border-teal-300"
                        }`}
                      >
                        <div className="flex items-center gap-2 justify-center">
                          <p.icon className="w-5 h-5" />
                          <span className="font-medium">{p.label}</span>
                        </div>
                      </Radio.Button>
                    ))}
                  </div>
                </Radio.Group>
              </Form.Item>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Date Picker - Only API dates enabled */}
                <Form.Item
                  label={
                    <span className="text-sm font-semibold text-gray-800">
                      Meeting Date
                    </span>
                  }
                  rules={[{ required: true, message: "Please select a date" }]}
                >
                  <DatePicker
                    value={selectedDate}
                    onChange={(date) => {
                      setSelectedDate(date);
                      setTimeInput("");
                      setSelectedReservationId("");
                    }}
                    disabledDate={disabledDate}
                    format="YYYY-MM-DD"
                    placeholder="Select date"
                    className="w-full !h-11 !rounded-xl"
                    suffixIcon={<Calendar className="w-4 h-4 text-gray-400" />}
                  />
                  {availableDates.length === 0 && (
                    <Text type="secondary" className="text-xs block mt-2">
                      No dates available. Please contact support.
                    </Text>
                  )}
                  {selectedDate && allowedTimeInputs.length === 0 && (
                    <Text type="secondary" className="text-xs block mt-2">
                      No times available for this date.
                    </Text>
                  )}
                </Form.Item>

                {/* Time Selection */}
                <Form.Item
                  label={
                    <span className="text-sm font-semibold text-gray-800">
                      Available Times
                    </span>
                  }
                  validateStatus={
                    selectedDate && !timeInput ? "error" : "success"
                  }
                  help={
                    selectedDate && !timeInput ? "Please select a time" : ""
                  }
                >
                  {selectedDate && allowedTimeInputs.length > 0 ? (
                    <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-1">
                      {allowedTimeInputs.map((t) => {
                        const active = t === timeInput;
                        return (
                          <Tag
                            key={t}
                            color={active ? "cyan" : "default"}
                            className={`!px-3 !py-1.5 !text-sm cursor-pointer !rounded-full transition-all ${
                              active
                                ? "!bg-teal-50 !border-teal-400 !text-teal-800 shadow-sm"
                                : "!bg-white !border-gray-200 hover:!border-teal-300"
                            }`}
                            onClick={() => {
                              setTimeInput(t);
                              const slot = findSlotByTime(t);
                              setSelectedReservationId(
                                slot?.meeting_resrvations_id
                                  ? String(slot.meeting_resrvations_id)
                                  : ""
                              );
                            }}
                          >
                            {to12Hour(toHHMMSS(t))}
                          </Tag>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="h-11 flex items-center">
                      <Text type="secondary" className="text-sm">
                        Select a date first
                      </Text>
                    </div>
                  )}
                </Form.Item>
              </div>

              {/* Notes */}
              <Form.Item
                label={
                  <span className="text-sm font-semibold text-gray-800">
                    Notes (Optional)
                  </span>
                }
                name="notes"
              >
                <TextArea
                  rows={4}
                  placeholder="Tell us anything helpful (level, goals, availability)…"
                  className="!rounded-xl"
                />
              </Form.Item>

              {/* Selected Slot Info */}
              {selectedDate && timeInput && selectedReservationId && (
                <div className="bg-teal-50 border border-teal-200 rounded-xl p-3 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <Text className="text-sm font-semibold text-teal-800 block">
                      Selected Placement Test Slot
                    </Text>
                    <Text className="text-xs text-teal-700">
                      {dayjs(selectedDate).format("MMMM D, YYYY")} at{" "}
                      {to12Hour(toHHMMSS(timeInput))} via {platform}
                    </Text>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <Form.Item className="!mb-0 !mt-6">
                <div className="flex items-center justify-end gap-3">
                  <Button
                    size="large"
                    onClick={onClose}
                    className="!rounded-xl !px-6"
                  >
                    Cancel
                  </Button>

                  <Button
                    type="primary"
                    size="large"
                    htmlType="submit"
                    disabled={!selectedReservationId}
                    icon={<ArrowRight className="w-4 h-4" />}
                    className="!bg-gradient-to-r !from-teal-600 !to-cyan-600 !border-0 hover:!from-teal-700 hover:!to-cyan-700 !rounded-xl !px-6 shadow-md hover:shadow-lg"
                  >
                    Continue to Teacher Selection
                  </Button>
                </div>
              </Form.Item>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- helpers ----------------------------- */

function platformToMeetingType(platform) {
  const p = String(platform || "").toLowerCase();
  if (p.includes("google")) return "google_meet";
  if (p.includes("zoom")) return "zoom";
  if (p.includes("whatsapp")) return "whatsapp";
  if (p.includes("phone")) return "phone_call";
  return "google_meet";
}

function toHHMM(timeStr) {
  if (!timeStr) return "";
  const parts = String(timeStr).split(":");
  const hh = String(parts[0] || "00").padStart(2, "0");
  const mm = String(parts[1] || "00").padStart(2, "0");
  return `${hh}:${mm}`;
}

function toHHMMSS(hhmm) {
  if (!hhmm) return "";
  const parts = String(hhmm).split(":");
  const hh = String(parts[0] || "00").padStart(2, "0");
  const mm = String(parts[1] || "00").padStart(2, "0");
  return `${hh}:${mm}:00`;
}

function to12Hour(timeStr) {
  if (!timeStr) return "";
  const parts = String(timeStr).split(":");
  const hh = Number(parts[0] || 0);
  const mm = Number(parts[1] || 0);

  const period = hh >= 12 ? "PM" : "AM";
  const h12 = hh % 12 === 0 ? 12 : hh % 12;
  const min = String(mm).padStart(2, "0");
  return `${h12}:${min} ${period}`;
}
