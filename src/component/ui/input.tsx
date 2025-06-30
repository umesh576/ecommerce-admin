"use client";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";

type InputProps = {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
  multiline?: boolean;
};

const Input = ({
  name,
  label,
  type = "text",
  placeholder = "",
  multiline = false,
  defaultValue = "",
}: InputProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext(); // Use this to access form state from parent form

  return (
    <div className="mb-4 tracking-wider">
      <label
        htmlFor={name}
        className="block text-md  font-medium text-gray-700"
      >
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) =>
          multiline ? (
            <textarea
              {...field}
              placeholder={placeholder}
              id={name}
              rows={4} // You can adjust rows or use a dynamic height depending on the content
              className={`mt-1 block w-full px-3 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                errors[name] ? "border-red-500" : "border-gray-300"
              }`}
            />
          ) : (
            <input
              {...field}
              type={type}
              placeholder={placeholder}
              id={name}
              className={`mt-1 block w-full px-3 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                errors[name] ? "border-red-500 focus-none" : "border-gray-300"
              }`}
            />
          )
        }
      />
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">
          {errors[name as string]?.message as string}
        </p>
      )}
    </div>
  );
};

export default Input;
