import React, { memo } from "react";
import { useRouter } from "next/router";
import ButtonControl from "../ButtonControl";

type Props = Partial<{
  submitText: string;
  isLoading: boolean;
}>;

const FooterForm = ({ submitText, isLoading }: Props) => {
  const router = useRouter();
  return (
    <>
      <ButtonControl
        color="secondary"
        variant="outlined"
        onClick={() => router.back()}
      >
        Quay lại
      </ButtonControl>
      <ButtonControl type="submit" sx={{ ml: 1 }} isLoading={isLoading}>
        {submitText || "Lưu"}
      </ButtonControl>
    </>
  );
};

export default memo(FooterForm);
