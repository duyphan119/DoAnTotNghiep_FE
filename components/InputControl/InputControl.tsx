import React, { useId } from "react";
import { FieldError } from "react-hook-form";

type Props = Partial<{
  error: FieldError;
  type: string;
  required: boolean;
  label: string;
  register: any;
}>;

const InputControl = ({ error, type, required, label, register }: Props) => {
  const id = useId();
  return (
    <div className="form-group">
      {error ? <div className="form-error">{error.message}</div> : null}
      <input
        type={type || "text"}
        id={id}
        className="form-control"
        autoComplete="off"
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

export default InputControl;
