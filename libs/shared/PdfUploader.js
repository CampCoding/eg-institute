"use client";
import { useState } from "react";
import axios from "axios";
import { configs } from "../configs";

export default function usePdfUploader(endpoint) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const upload = async (file, additionalData = {}) => {
    setLoading(true);
    setError(null);
    setData(null);

    const formData = new FormData();
    formData.append("file", file);

    // Add additional fields like student_id, quiz_id if provided
    Object.keys(additionalData).forEach((key) => {
      formData.append(key, additionalData[key]);
    });

    try {
      const token = localStorage.getItem(
        configs.localstorageEgyIntstituteTokenName
      );
      const response = await axios.post(
        `https://camp-coding.tech/eg_Institute/pdf_uplouder.php`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(response.data);
      setLoading(false);
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Upload failed";
      setError(errorMessage);
      setLoading(false);
      throw new Error(errorMessage);
    }
  };

  return { upload, loading, data, error };
}
