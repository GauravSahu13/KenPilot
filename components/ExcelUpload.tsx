"use client";

import { useState } from "react";
import { Upload, CheckCircle, XCircle } from "lucide-react";

export default function ExcelUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
    setMessage(null);
  };

  const onUpload = async () => {
    if (!file) {
      setMessage({ type: "error", text: "Please select an Excel file" });
      return;
    }

    setUploading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/knowledge/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setMessage({
        type: "success",
        text: data.message || "Knowledge base updated successfully",
      });
      setFile(null);
      const input = document.getElementById("excel-upload-input") as HTMLInputElement | null;
      if (input) input.value = "";
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Upload failed" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">Upload Excel</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Update FAQs, Services, and About data for RAG.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <input
          id="excel-upload-input"
          type="file"
          accept=".xlsx,.xls"
          onChange={onFileChange}
          className="block w-full text-sm text-gray-700 dark:text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 dark:file:bg-primary-900 dark:file:text-primary-200"
        />
        {file && (
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Selected: {file.name}
          </p>
        )}
      </div>

      <button
        onClick={onUpload}
        disabled={!file || uploading}
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white py-3 text-sm font-semibold transition-colors"
      >
        {uploading ? (
          <>
            <div className="h-4 w-4 border-2 border-white/60 border-t-transparent rounded-full animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Upload className="h-4 w-4" />
            Upload knowledge file
          </>
        )}
      </button>

      {message && (
        <div
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
            message.type === "success"
              ? "bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-200"
              : "bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-200"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <XCircle className="h-4 w-4" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
        <p>Expected columns:</p>
        <ul className="list-disc list-inside space-y-0.5">
          <li>Category (About | Services | Contact | FAQ | Website)</li>
          <li>Question (optional)</li>
          <li>Answer</li>
        </ul>
      </div>
    </div>
  );
}

