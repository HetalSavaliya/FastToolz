"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface UploadAreaProps {
  title: string;
  subtitle?: string;
  icon: any;
  accept?: string;
  multiple?: boolean;
  onFileChange: (file: File | FileList) => void;
  onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
  className?: string;
}

const UploadArea: React.FC<UploadAreaProps> = ({
  title,
  subtitle = "Click to browse or drag files here",
  icon,
  accept = "*/*",
  multiple = false,
  onFileChange,
  onDrop,
  className = "",
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (onDrop) onDrop(e);
    const file = e.dataTransfer.files;
    if (file.length) {
      multiple ? onFileChange(file) : onFileChange(file[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length) {
      multiple ? onFileChange(files) : onFileChange(files[0]);
    }
  };

  return (
    <div
      className={`group relative border-2 border-dashed border-[var(--accent)] rounded-2xl
        p-10 text-center cursor-pointer transition-all duration-500
        bg-[var(--card)]/80 backdrop-blur-sm shadow-lg hover:border-[var(--accent)]
        hover:shadow-[0_0_20px_var(--accent)]  ${className}`}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        ref={fileInputRef}
        hidden
      />

      {/* Animated glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/15 via-transparent to-[var(--accent)]/15 blur-3xl animate-pulse" />
      </div>

      {/* Upload content */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-3">
        <motion.div
          className="w-20 h-20 rounded-full bg-[var(--accent)]/15 flex items-center justify-center"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <FontAwesomeIcon
            icon={icon}
            className="text-[var(--accent)] text-4xl"
          />
        </motion.div>

        <p className="text-lg font-semibold text-[var(--foreground)]">
          {title}
        </p>
        <p className="text-sm opacity-70">{subtitle}</p>
      </div>
    </div>
  );
};

export default UploadArea;
