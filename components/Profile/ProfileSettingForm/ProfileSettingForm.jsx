"use client";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  User2,
  CheckCircle,
  AlertCircle,
  Save,
} from "lucide-react";
import React, { useEffect, useState } from "react";

export default function ProfileSettingForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case "email":
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = "Please enter a valid email address";
        } else {
          delete newErrors.email;
        }
        break;
      case "phone":
        if (value && !/^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/\s/g, ""))) {
          newErrors.phone = "Please enter a valid phone number";
        } else {
          delete newErrors.phone;
        }
        break;
      case "password":
        if (value && value.length < 8) {
          newErrors.password = "Password must be at least 8 characters";
        } else {
          delete newErrors.password;
        }
        break;
      case "confirmPassword":
        if (value && value !== formData.password) {
          newErrors.confirmPassword = "Passwords do not match";
        } else {
          delete newErrors.confirmPassword;
        }
        break;
      default:
        if (value.trim() === "") {
          delete newErrors[name];
        }
    }

    setErrors(newErrors);
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (value.trim() !== "") {
      validateField(name, value);
    }
  };

  const handleSubmit = (e) => {
    setSaving(true);

    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      // Show success message or handle response
    }, 2000);
  };

  const InputField = ({
    name,
    label,
    type = "text",
    placeholder,
    icon: Icon,
    showToggle = false,
    showValue = false,
    onToggle = null,
  }) => {
    const hasError = errors[name];
    const hasValue = formData[name]?.length > 0;
    const isFocused = focusedField === name;

    return (
      <div className="group">
        <label className="flex items-center gap-2 mb-3 text-sm font-semibold text-gray-700 transition-colors duration-200 group-hover:text-teal-600">
          <Icon className="w-4 h-4 text-teal-500" />
          {label}
        </label>

        <div className="relative">
          <input
            type={showToggle ? (showValue ? "text" : "password") : type}
            name={name}
            value={formData[name]}
            onChange={onInputChange}
            onFocus={() => setFocusedField(name)}
            onBlur={() => setFocusedField("")}
            className={`w-full px-4 py-4 text-gray-800 placeholder-gray-400 transition-all duration-300 border-2 rounded-2xl bg-gradient-to-r from-white to-gray-50 backdrop-blur-sm focus:outline-none focus:ring-0 ${
              hasError
                ? "border-red-300 focus:border-red-400 bg-red-50/50"
                : isFocused
                ? "border-teal-400 shadow-lg shadow-teal-100/50 bg-white"
                : hasValue
                ? "border-teal-200 bg-white"
                : "border-gray-200 hover:border-gray-300"
            }`}
            placeholder={placeholder}
          />

          {showToggle && (
            <button
              type="button"
              onClick={onToggle}
              className="absolute inset-y-0 right-4 flex items-center text-gray-400 transition-colors duration-200 hover:text-teal-500"
            >
              {showValue ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          )}

          {hasValue && !hasError && !showToggle && (
            <CheckCircle className="absolute inset-y-0 right-4 w-5 h-5 my-auto text-green-500" />
          )}

          {hasError && (
            <AlertCircle className="absolute inset-y-0 right-4 w-5 h-5 my-auto text-red-500" />
          )}
        </div>

        {hasError && (
          <p className="mt-2 text-sm text-red-600 animate-in slide-in-from-top-1 duration-200">
            {hasError}
          </p>
        )}
      </div>
    );
  };

  useEffect(() => {
    // Pre-fill form with user data

    const userData = window.localStorage
      ? JSON.parse(localStorage.getItem("eg_user_data"))
      : undefined;

    if (userData) {
      setFormData((prev) => ({
        ...prev,
        firstName: userData.student_name.split(" ")[0] || "",
        lastName: userData.student_name.split(" ")[1] || "",
        email: userData.student_email || "",
        phone: userData.phone || "",
      }));
    }
  }, []);

  return (
    <div className="h-full bg-gradient-to-br from-teal-50 via-white to-blue-50 p-6">
      <div className="max-w-4xl  mx-auto">
        <div className="mb-3 text-center">
          <div className="inline-flex items-center px-6 py-3 mb-4 text-sm font-bold tracking-wider text-teal-700 uppercase transition-all duration-300 bg-gradient-to-r from-teal-100 to-teal-200 rounded-full shadow-lg hover:shadow-xl hover:scale-105">
            <User2 className="w-4 h-4 mr-2" />
            Profile Settings
          </div>
        </div>

        {/* Form */}
        <div className="!p-[4px_8px]">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <InputField
              name="firstName"
              label="First Name"
              placeholder="Enter your first name"
              icon={User2}
            />

            <InputField
              name="lastName"
              label="Last Name"
              placeholder="Enter your last name"
              icon={User2}
            />

            <InputField
              name="email"
              label="Email Address"
              type="email"
              placeholder="Enter your email address"
              icon={Mail}
            />

            <InputField
              name="phone"
              label="Phone Number"
              type="tel"
              placeholder="Enter your phone number"
              icon={Phone}
            />

            <InputField
              name="password"
              label="New Password"
              placeholder="Create a strong password"
              icon={Lock}
              showToggle={true}
              showValue={showPassword}
              onToggle={() => setShowPassword(!showPassword)}
            />

            <InputField
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Re-enter your password"
              icon={Lock}
              showToggle={true}
              showValue={showConfirm}
              onToggle={() => setShowConfirm(!showConfirm)}
            />
          </div>

          {/* Password Requirements */}
          {formData.password && (
            <div className="p-4 mt-8 border border-gray-200 rounded-xl bg-gray-50">
              <h4 className="mb-2 text-sm font-semibold text-gray-700">
                Password Requirements:
              </h4>
              <div className="grid grid-cols-1 gap-2 text-sm md:grid-cols-2">
                <div
                  className={`flex items-center gap-2 ${
                    formData.password.length >= 8
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  At least 8 characters
                </div>
                <div
                  className={`flex items-center gap-2 ${
                    /[A-Z]/.test(formData.password)
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  One uppercase letter
                </div>
                <div
                  className={`flex items-center gap-2 ${
                    /[0-9]/.test(formData.password)
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  One number
                </div>
                <div
                  className={`flex items-center gap-2 ${
                    /[!@#$%^&*]/.test(formData.password)
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  One special character
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end mt-8">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading || Object.keys(errors).length > 0}
              className="inline-flex items-center px-8 py-4 text-white transition-all duration-300 bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl hover:from-teal-600 hover:to-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:scale-105 transform"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
