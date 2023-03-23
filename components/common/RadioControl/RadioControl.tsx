import { useId, memo } from "react";
import styles from "./_style.module.scss";

type Props = Partial<{
  type: "radio" | "checkbox";
  label: string;
  register: any;
  wrapperClassname: string;
  circleClassName: string;
  defaultChecked: boolean;
  value: string | number;
  disabled: boolean;
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
}: Props) => {
  const id = useId();
  return (
    <div className={`${styles.radio} ${wrapperClassname || ""}`}>
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
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default memo(RadioControl);
