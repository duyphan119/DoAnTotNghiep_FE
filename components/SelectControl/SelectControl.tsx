import React, { useId, ChangeEvent } from "react";
import { FieldError } from "react-hook-form";
import { SelectOption } from "../../utils/types";

type Props = Partial<{
  error: FieldError;
  required: boolean;
  label: string;
  register: any;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  value: any;
  options: SelectOption[];
}>;

const SelectControl = ({
  error,
  required,
  label,
  register,
  onChange,
  value,
  options,
}: Props) => {
  const id = useId();
  return (
    <div className="form-group">
      {error ? <div className="form-error">{error.message}</div> : null}
      <select
        id={id}
        className="form-control"
        value={value}
        onChange={onChange}
        {...register}
      >
        {options?.map((item: SelectOption, index: number) => {
          return (
            <option value={item.value} key={index}>
              {item.display || item.value}
            </option>
          );
        })}
      </select>
      <label
        htmlFor={id}
        className={`form-label ${required ? "required" : ""}`}
      >
        {label}
      </label>
    </div>
  );
};

export default SelectControl;
