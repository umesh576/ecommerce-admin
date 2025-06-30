/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import dynamic from "next/dynamic";
const Select = dynamic(() => import("react-select"), { ssr: false });
import { useController, useFormContext } from "react-hook-form";

interface Option {
  label: string;
  value: string;
}

interface SelectInputProps {
  name: string;
  label?: string;
  options: Option[];
  placeholder?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
  name,
  label,
  options,
  placeholder,
}) => {
  const { control } = useFormContext();
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name, control });

  return (
    <div className="mb-4">
      {label && <label className="block mb-2 font-medium">{label}</label>}
      <Select
        options={options}
        value={options.find((option) => option.value === value) || null}
        onChange={(selected: any) => onChange(selected?.value)}
        placeholder={placeholder}
        className="react-select-container"
        classNamePrefix="react-select"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default SelectInput;
