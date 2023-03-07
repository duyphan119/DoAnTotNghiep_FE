import React, { useId, memo } from "react";
import styles from "./_style.module.scss";

type Props = Partial<{
  type: "radio" | "checkbox";
  label: string;
  register: any;
  wrapperClassname: string;
  circleClassName: string;
  defaultChecked: boolean;
  value: string | number;
}>;

const RadioControl = ({
  type,
  label,
  register,
  wrapperClassname,
  circleClassName,
  defaultChecked,
  value,
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
        {...register}
      />
      <div className={`${styles.circle} ${circleClassName || ""}`}></div>
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default memo(RadioControl);
