import React, { useId, ChangeEvent, memo } from "react";
import { FieldError } from "react-hook-form";

type Props = Partial<{
  error: FieldError;
  required: boolean;
  label: string;
  register: any;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: any;
  defaultValue: any;
  rows: number;
}>;

const TextAreaControl = ({
  error,
  required,
  label,
  register,
  onChange,
  value,
  defaultValue,
  rows,
}: Props) => {
  const id = useId();
  return (
    <div className="form-group">
      {error ? <div className="form-error">{error.message}</div> : null}
      <textarea
        id={id}
        className="form-control custom-scrollbar"
        autoComplete="off"
        rows={rows || 4}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        {...register}
      ></textarea>
      <label
        htmlFor={id}
        className={`form-label ${required ? "required" : ""}`}
      >
        {label}
      </label>
    </div>
  );
};

export default memo(TextAreaControl);
