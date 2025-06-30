"use client";
import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useController, useFormContext } from "react-hook-form";

interface FileUploadProps {
  name: string;
  label?: string;
  multiple?: boolean;
  maxFiles?: number;
}

const FileUpload: React.FC<FileUploadProps> = ({
  name,
  label,
  multiple = false,
  maxFiles = 5,
}) => {
  const { control } = useFormContext();
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name, control });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (multiple) {
        const newFiles = [...(value || []), ...acceptedFiles].slice(
          0,
          maxFiles
        );
        onChange(newFiles);
      } else {
        onChange(acceptedFiles[0]);
      }
    },
    [onChange, value, multiple, maxFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple,
    accept: {
      "image/*": [],
    },
  });

  const renderPreviews = () => {
    if (!value) return null;
    if (multiple && Array.isArray(value)) {
      return value.map((file: File, index: number) => (
        <Image
          key={index}
          src={URL.createObjectURL(file)}
          alt={`preview-${index}`}
          height={300}
          width={300}
          className="w-20 h-30 object-cover rounded"
        />
      ));
    } else if (value instanceof File) {
      return (
        <Image
          src={URL.createObjectURL(value)}
          alt="cover"
          className="w-32 h-32 object-cover rounded"
          height={300}
          width={300}
        />
      );
    }
    return null;
  };

  return (
    <div className="mb-4">
      {label && <label className="block mb-2 font-medium">{label}</label>}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded p-4 cursor-pointer text-center ${
          isDragActive ? "border-orange-500" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>
            Drag and drop {multiple ? "images" : "an image"} here, or click to
            select
          </p>
        )}
      </div>

      <div className="flex gap-2 mt-3 flex-wrap">{renderPreviews()}</div>

      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default FileUpload;
