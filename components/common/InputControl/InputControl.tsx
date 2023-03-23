import { useId, ChangeEvent, memo, ReactNode } from "react";
import { FieldError } from "react-hook-form";
import { TextField, FormControl, InputAdornment } from "@mui/material";

type Props = Partial<{
  error: FieldError;
  type: string;
  required: boolean;
  label: string;
  register: any;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: any;
  defaultValue: any;
  disabled: boolean;
  variant: "outlined" | "standard" | "filled";
  placeholder: string;
  startIcon: ReactNode;
  endIcon: ReactNode;
  fullWidth: boolean;
  useMuiCustom: boolean;
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
  disabled,
  variant,
  placeholder,
  startIcon,
  endIcon,
  fullWidth,
  useMuiCustom,
}: Props) => {
  const id = useId();
  return (
    <>
      {useMuiCustom ? (
        <FormControl fullWidth={fullWidth || true}>
          <TextField
            id={id}
            required={required}
            value={value}
            onChange={onChange}
            defaultValue={defaultValue}
            disabled={disabled}
            variant={variant || "standard"}
            placeholder={placeholder}
            type={type}
            InputProps={{
              ...(startIcon
                ? {
                    startAdornment: (
                      <InputAdornment position="start">
                        {startIcon}
                      </InputAdornment>
                    ),
                  }
                : {}),
              ...(endIcon
                ? {
                    endAdornment: (
                      <InputAdornment position="end">{endIcon}</InputAdornment>
                    ),
                  }
                : {}),
            }}
            label={label}
            error={error ? true : false}
            helperText={error ? error.message : ""}
            {...register}
          />
        </FormControl>
      ) : (
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
            disabled={disabled}
            {...register}
          />
          <label
            htmlFor={id}
            className={`form-label ${required ? "required" : ""}`}
          >
            {label}
          </label>
        </div>
      )}
    </>
  );
};

export default memo(InputControl);
