import { useId, memo, CSSProperties } from "react";
import styles from "./_style.module.scss";

type Props = Partial<{
  type: "radio" | "checkbox";
  label: string;
  register: any;
  wrapperClassname: string;
  circleClassName: string;
  defaultChecked: boolean;
  value: string | number | boolean;
  disabled: boolean;
  wrapperStyle: CSSProperties;
  labelStyle: CSSProperties;
}>;

const RadioControl = ({
  type,
  label,
  register,
  wrapperClassname,
  circleClassName,
  defaultChecked,
  value,
  disabled,
  wrapperStyle,
  labelStyle,
}: Props) => {
  const id = useId();
  return (
    <div
      className={`${styles.radio} ${wrapperClassname || ""}`}
      style={{ ...wrapperStyle }}
    >
      <input
        type={type || "radio"}
        id={id}
        hidden
        defaultChecked={defaultChecked || false}
        value={value}
        disabled={disabled}
        {...register}
      />
      <div className={`${styles.circle} ${circleClassName || ""}`}></div>
      <label htmlFor={id} style={{ ...labelStyle }}>
        {label}
      </label>
    </div>
  );
};

export default memo(RadioControl);
