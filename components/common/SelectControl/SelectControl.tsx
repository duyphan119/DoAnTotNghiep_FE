import { useId, ChangeEvent, memo } from "react";
import { FieldError } from "react-hook-form";

type Props = Partial<{
  error: FieldError;
  required: boolean;
  label: string;
  register: any;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  value: any;
  options: {
    value: string | number;
    display?: string | number;
  }[];
  disabled: boolean;
}>;

const SelectControl = ({
  error,
  required,
  label,
  register,
  onChange,
  value,
  options,
  disabled,
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
        disabled={disabled}
        {...register}
      >
        {options?.map((item, index: number) => {
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

export default memo(SelectControl);
