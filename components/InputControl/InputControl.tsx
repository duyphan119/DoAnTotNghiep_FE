import React, { useId, ChangeEvent, memo } from "react";
import { FieldError } from "react-hook-form";

type Props = Partial<{
  error: FieldError;
  type: string;
  required: boolean;
  label: string;
  register: any;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: any;
  defaultValue: any;
}>;

const InputControl = ({
  error,
  type,
  required,
  label,
  register,
  onChange,
  value,
  defaultValue,
}: Props) => {
  const id = useId();
  return (
    <div className="form-group">
      {error ? <div className="form-error">{error.message}</div> : null}
      <input
        type={type || "text"}
        id={id}
        className="form-control"
        autoComplete="off"
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
        {...register}
      />
      <label
        htmlFor={id}
        className={`form-label ${required ? "required" : ""}`}
      >
        {label}
      </label>
    </div>
  );
};

export default memo(InputControl);
