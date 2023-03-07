import { Button, CircularProgress, SxProps, Tooltip } from "@mui/material";
import { CSSProperties, ElementType, MouseEvent, ReactNode, memo } from "react";

type Props = Partial<{
  isLoading: boolean;
  variant: "contained" | "outlined" | "text";
  children: ReactNode;
  type: "button" | "submit";
  className: string;
  sx: SxProps;
  loadingStyle: CSSProperties;
  color:
    | "secondary"
    | "error"
    | "success"
    | "info"
    | "inherit"
    | "warning"
    | "primary";
  onClick: (e: MouseEvent<HTMLElement>) => void;
  component: ElementType;
  startIcon: ReactNode;
  autoFocus: boolean;
  tooltip: string;
  size: "small" | "medium" | "large";
  disabled: boolean;
}>;

const ButtonControl = ({
  isLoading,
  variant,
  children,
  type,
  className,
  sx,
  loadingStyle,
  color,
  onClick,
  component,
  startIcon,
  autoFocus,
  tooltip,
  size,
  disabled,
}: Props) => {
  return (
    <Tooltip title={tooltip}>
      <Button
        variant={variant || "contained"}
        type={type || "button"}
        className={className || ""}
        sx={sx || {}}
        color={color || "primary"}
        onClick={onClick}
        component={component || "button"}
        startIcon={
          isLoading ? (
            <CircularProgress
              style={{
                color: "#fff",
                width: "20px",
                height: "20px",
                ...loadingStyle,
              }}
            />
          ) : (
            startIcon
          )
        }
        autoFocus={autoFocus}
        size={size || "medium"}
        disabled={disabled || false}
      >
        {isLoading ? "Đang xử lý" : children}
      </Button>
    </Tooltip>
  );
};

export default memo(ButtonControl);
