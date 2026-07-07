"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import ProgressBar from "./ProgressBar";

interface Props {
  onFile: (file: File) => void;
}

export default function FileDropzone({ onFile }: Props) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;
      const file = acceptedFiles[0];
      setUploading(true);
      // Simulate progress
      const interval = setInterval(() => {
        setProgress((prev) => (prev >= 90 ? 90 : prev + 10));
      }, 200);
      // Actually pass file to parent; real progress can be done via axios
      setTimeout(() => {
        clearInterval(interval);
        setProgress(100);
        onFile(file);
        setUploading(false);
      }, 1500);
    },
    [onFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"], "image/*": [".png", ".jpg", ".jpeg"] },
    maxSize: 20 * 1024 * 1024,
    multiple: false,
  });

  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors ${
          isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
        }`}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <ProgressBar progress={progress} />
        ) : (
          <p className="text-gray-600">
            {isDragActive
              ? "Drop the drawing here"
              : "Drag & drop an isometric drawing (PDF, PNG, JPG), or click to browse"}
          </p>
        )}
        <p className="text-xs text-gray-400 mt-2">Max 20 MB</p>
      </div>
    </div>
  );
}