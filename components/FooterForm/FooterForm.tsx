import React from "react";
import { Button } from "@mui/material";

type Props = Partial<{
  onBack: any;
  submitText: string;
}>;

const FooterForm = ({ onBack, submitText }: Props) => {
  return (
    <>
      <Button variant="outlined" color="secondary" onClick={onBack}>
        Quay lại
      </Button>
      <Button variant="contained" type="submit" style={{ marginLeft: 8 }}>
        {submitText || "Lưu"}
      </Button>
    </>
  );
};

export default FooterForm;
