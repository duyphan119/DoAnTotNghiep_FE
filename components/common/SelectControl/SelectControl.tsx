import { useId, ChangeEvent, memo } from "react";
import { FieldError } from "react-hook-form";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  FormHelperText,
} from "@mui/material";

type Props = Partial<{
  error: FieldError;
  required: boolean;
  label: string;
  register: any;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onChangeMuiCustom: (e: SelectChangeEvent) => void;
  value: any;
  options: {
    value: string | number | readonly string[];
    display?: string | number;
  }[];
  disabled: boolean;
  useMuiCustom: boolean;
  fullWidth: boolean;
  variant: "outlined" | "standard" | "filled";
  defaultValue: string;
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
  useMuiCustom,
  fullWidth,
  onChangeMuiCustom,
  defaultValue,
  variant,
}: Props) => {
  const id = useId();
  const labelId = useId();
  return useMuiCustom ? (
    <FormControl fullWidth={fullWidth || true} error={error ? true : false}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        id={id}
        labelId={labelId}
        label={label}
        variant={variant || "standard"}
        required={required}
        disabled={disabled}
        value={value || ""}
        onChange={onChangeMuiCustom}
        defaultValue={defaultValue}
        {...register}
      >
        {!options || options.length === 0 ? (
          <MenuItem value={""}>
            <em>{label}</em>
          </MenuItem>
        ) : null}
        {options?.map((item, index) => {
          return (
            <MenuItem value={item.value} key={index}>
              {item.display || item.value}
            </MenuItem>
          );
        })}
      </Select>
      {error ? <FormHelperText>{error.message}</FormHelperText> : null}
    </FormControl>
  ) : (
    <div className="form-group">
      {error ? <div className="form-error">{error.message}</div> : null}
      <select
        id={id}
        className="form-control"
        value={value}
        onChange={onChange}
        disabled={disabled}
        defaultValue={defaultValue}
        {...register}
      >
        {options?.map((item, index) => {
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
