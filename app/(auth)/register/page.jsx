"use client";

import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  User,
  BookOpen,
  Users,
  Globe,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Select, message } from "antd";
import {
  PlusOutlined,
  LoadingOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { timezoneOptions } from "../../../utils/timeZone";
import { base_url } from "../../../libs/constant";
import "./style.css";

const IMAGE_UPLOAD_URL =
  "https://camp-coding.tech/eg_Institute/image_uplouder.php";

const arabicLevelOptions = [
  { value: "complete_beginner", label: "Complete Beginner" },
  { value: "beginner", label: "Beginner" },
  { value: "elementary", label: "Elementary" },
  { value: "intermediate", label: "Intermediate" },
  { value: "upper_intermediate", label: "Upper Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "fluent", label: "Fluent / Native" },
];

const genderOptions = [
  { value: "male", label: "Male - ذكر" },
  { value: "female", label: "Female - أنثى" },
];

const Register = () => {
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    country: "",
    time_zone: undefined,
    gender: undefined,
    expectation_level: undefined,
  });
  const [focusedField, setFocusedField] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);

  // ✅ Track previous country code to detect country change
  const previousCountryCode = useRef("");

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: BookOpen,
      title: "5000+ Lessons",
      description: "Comprehensive curriculum",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Users,
      title: "Expert Teachers",
      description: "Native Arabic speakers",
      color: "from-teal-500 to-green-500",
    },
  ];

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Fixed: Auto-fill country when phone country changes
  const onPhoneChange = (value, countryData) => {
    const newCountryCode = countryData?.countryCode || "";
    const countryChanged = newCountryCode !== previousCountryCode.current;

    setFormData((prev) => ({
      ...prev,
      phone: "+" + value,
      // Update country when country code changes
      country: countryChanged
        ? countryData?.name || prev.country
        : prev.country,
    }));

    // Update the previous country code
    previousCountryCode.current = newCountryCode;
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        message.error("You can only upload image files!");
        return;
      }

      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const clearImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImageFile(null);
    setImagePreview(null);
    const fileInput = document.getElementById("profile-image-input");
    if (fileInput) fileInput.value = "";
  };

  const uploadImage = async (file) => {
    const data = new FormData();
    data.append("image", file);

    try {
      setImageUploading(true);
      const response = await axios.post(IMAGE_UPLOAD_URL, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data) {
        return response.data;
      }
      throw new Error("Failed to get image URL from response");
    } catch (error) {
      console.error("Image upload error:", error);
      throw error;
    } finally {
      setImageUploading(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Please enter your name!");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("Please enter your email!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email!");
      return;
    }

    if (!formData.phone || formData.phone.length < 8) {
      toast.error("Please enter a valid phone number!");
      return;
    }

    if (!formData.password) {
      toast.error("Please enter your password!");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }

    if (!formData.country.trim()) {
      toast.error("Please enter your country!");
      return;
    }

    if (!formData.time_zone) {
      toast.error("Please select your timezone!");
      return;
    }

    if (!formData.gender) {
      toast.error("Please select your gender!");
      return;
    }

    if (!formData.expectation_level) {
      toast.error("Please select your Arabic level!");
      return;
    }

    setIsLoading(true);

    try {
      let imageUrl = "";

      if (imageFile && imageFile instanceof File) {
        try {
          imageUrl = await uploadImage(imageFile);
        } catch (error) {
          toast.error("Failed to upload image. Please try again.");
          setIsLoading(false);
          return;
        }
      }

      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        image: imageUrl,
        country: formData.country,
        time_zone: formData.time_zone,
        gender: formData.gender,
        expectation_level: formData.expectation_level,
      };

      const response = await axios.post(
        base_url + "/auth/signUp.php",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response?.data?.status === "success") {
        toast.success("Account created successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
          country: "",
          time_zone: undefined,
          gender: undefined,
          expectation_level: undefined,
        });
        clearImage();
        router.push("/login");
      } else {
        toast.error(response?.data?.message || "Registration failed!");
      }
    } catch (error) {
      console.error("Register error:", error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const getInputClass = (fieldName) => {
    const baseClass =
      "w-full pl-10 pr-4 py-2.5 bg-white border-2 rounded-xl text-gray-800 placeholder-gray-400 text-sm transition-all duration-300 focus:outline-none";
    const focusedClass = "border-teal-500 shadow-lg shadow-teal-500/20";
    const normalClass = "border-gray-200 hover:border-gray-300";

    return `${baseClass} ${focusedField === fieldName ? focusedClass : normalClass}`;
  };

  const getIconClass = (fieldName) => {
    return `w-4 h-4 transition-colors duration-300 ${
      focusedField === fieldName ? "text-teal-500" : "text-gray-400"
    }`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-teal-100 flex items-center justify-center p-4 relative overflow-hidden">
      <div
        className={`relative z-10 w-full max-w-md lg:max-w-6xl bg-white/40 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-1000 ${
          isVisible
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-12 opacity-0 scale-95"
        }`}
      >
        <div className="grid lg:grid-cols-2 min-h-[700px]">
          {/* Left Side */}
          <div className="relative bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600 p-8 lg:p-12 hidden lg:flex flex-col justify-between overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full translate-y-48 -translate-x-48"></div>
            </div>

            <div className="relative z-10">
              <div
                className={`transform transition-all duration-700 delay-200 ${
                  isVisible
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-12 opacity-0"
                }`}
              >
                <Link href="/">
                  <img
                    src="/images/logo.png"
                    alt="Logo"
                    className="w-32 mb-8 drop-shadow-2xl cursor-pointer hover:scale-105 transition-transform"
                  />
                </Link>
              </div>

              <div
                className={`space-y-4 mb-8 transform transition-all duration-700 delay-300 ${
                  isVisible
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-12 opacity-0"
                }`}
              >
                <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                  Start Your Journey
                </h1>
                <p className="text-lg text-white/90 leading-relaxed max-w-md">
                  Join thousands of learners worldwide and master Arabic with
                  our personalized approach.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={index}
                      className={`bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 transform transition-all duration-700 hover:scale-105 hover:bg-white/20 ${
                        isVisible
                          ? "translate-y-0 opacity-100"
                          : "translate-y-8 opacity-0"
                      }`}
                      style={{ transitionDelay: `${800 + index * 100}ms` }}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-3 shadow-lg`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-white font-bold text-sm mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-white/70 text-xs">
                        {feature.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              className={`relative z-10 mt-8 pt-8 border-t border-white/20 transform transition-all duration-700 delay-1200 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <p className="text-white/80 italic text-sm">
                &quot;Every expert was once a beginner. Start your Arabic
                journey today.&quot;
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="p-6 lg:p-10 flex items-center justify-center overflow-y-auto max-h-screen">
            <div className="w-full max-w-md">
              <div
                className={`text-center mb-6 transform transition-all duration-700 delay-400 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <Link href="/" className="lg:hidden inline-block mb-4">
                  <img
                    src="/images/logo.png"
                    alt="Logo"
                    className="w-20 mx-auto"
                  />
                </Link>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">
                  Create Account
                </h2>
                <p className="text-gray-600 text-sm">
                  Fill in your details to get started
                </p>
              </div>

              <form onSubmit={onSubmit} className="space-y-4">
                {/* Profile Image Upload */}
                <div
                  className={`flex flex-col items-center mb-6 transform transition-all duration-700 delay-450 ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  <div className="relative group">
                    <div
                      onClick={() =>
                        document.getElementById("profile-image-input").click()
                      }
                      className={`w-32 h-32 sm:w-36 sm:h-36 rounded-full border-4 cursor-pointer flex items-center justify-center overflow-hidden transition-all duration-300 ${
                        imagePreview
                          ? "border-teal-500 border-solid shadow-xl shadow-teal-500/20"
                          : "border-dashed border-gray-300 bg-gray-50 hover:border-teal-500 hover:bg-teal-50/30"
                      }`}
                    >
                      {imagePreview ? (
                        <>
                          <img
                            src={imagePreview}
                            alt="Profile Preview"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-medium">
                              Change Photo
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="text-center p-4">
                          {imageUploading ? (
                            <LoadingOutlined className="text-3xl text-teal-500 mb-2" />
                          ) : (
                            <PlusOutlined className="text-3xl text-gray-400 mb-2" />
                          )}
                          <p className="text-xs text-gray-500">
                            {imageUploading ? "Uploading..." : "Add Photo"}
                          </p>
                        </div>
                      )}

                      {imageUploading && imagePreview && (
                        <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                          <LoadingOutlined className="text-3xl text-white" />
                        </div>
                      )}
                    </div>

                    {imagePreview && !imageUploading && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          clearImage();
                        }}
                        className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors duration-200 transform hover:scale-110"
                      >
                        <DeleteOutlined className="text-sm" />
                      </button>
                    )}

                    <input
                      id="profile-image-input"
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className={getIconClass("name")} />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={onInputChange}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField("")}
                      className={getInputClass("name")}
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className={getIconClass("email")} />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={onInputChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField("")}
                      className={getInputClass("email")}
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <PhoneInput
                    country="eg"
                    value={formData.phone}
                    onChange={onPhoneChange}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField("")}
                    enableSearch
                    searchPlaceholder="Search country..."
                    inputProps={{
                      name: "phone",
                      required: true,
                    }}
                    containerClass="phone-input-container"
                    inputClass="phone-input-field"
                    buttonClass="phone-input-button"
                    dropdownClass="phone-input-dropdown"
                    searchClass="phone-input-search"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Password *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className={getIconClass("password")} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={onInputChange}
                      onFocus={() => setFocusedField("password")}
                      onBlur={() => setFocusedField("")}
                      className={`${getInputClass("password")} pr-10`}
                      placeholder="Min. 6 characters"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-teal-500 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Country & Gender */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Country *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className={getIconClass("country")} />
                      </div>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={onInputChange}
                        onFocus={() => setFocusedField("country")}
                        onBlur={() => setFocusedField("")}
                        className={getInputClass("country")}
                        placeholder="e.g., Egypt, USA"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Gender *
                    </label>
                    <Select
                      value={formData.gender}
                      onChange={(value) => onSelectChange("gender", value)}
                      placeholder="Select Gender"
                      options={genderOptions}
                      className="w-full register-select"
                      size="large"
                      showSearch
                      filterOption={filterOption}
                    />
                  </div>
                </div>

                {/* Timezone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Timezone *
                  </label>
                  <Select
                    value={formData.time_zone}
                    onChange={(value) => onSelectChange("time_zone", value)}
                    placeholder="Search and select timezone..."
                    options={timezoneOptions}
                    className="w-full register-select"
                    size="large"
                    showSearch
                    filterOption={filterOption}
                  />
                </div>

                {/* Arabic Level */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Your Arabic Level *
                  </label>
                  <Select
                    value={formData.expectation_level}
                    onChange={(value) =>
                      onSelectChange("expectation_level", value)
                    }
                    placeholder="Select your current level..."
                    options={arabicLevelOptions}
                    className="w-full register-select"
                    size="large"
                    showSearch
                    filterOption={filterOption}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || imageUploading}
                  className="group relative w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg shadow-teal-500/30 hover:shadow-xl hover:shadow-teal-500/40 transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden mt-6"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isLoading || imageUploading ? (
                      <>
                        <LoadingOutlined className="text-xl" />
                        <span>
                          {imageUploading
                            ? "Uploading Image..."
                            : "Creating Account..."}
                        </span>
                      </>
                    ) : (
                      <>
                        <span>Create Account</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                </button>

                {/* Login Link */}
                <div className="text-center">
                  <p className="text-gray-600">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="text-teal-600 hover:text-teal-700 font-bold transition-colors hover:underline"
                    >
                      Sign In
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
