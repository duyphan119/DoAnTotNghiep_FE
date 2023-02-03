import React, { memo } from "react";
import { Button, CircularProgress } from "@mui/material";

type Props = Partial<{
  onBack: any;
  submitText: string;
  isLoading: boolean;
}>;

const FooterForm = ({ onBack, submitText, isLoading }: Props) => {
  return (
    <>
      <Button variant="outlined" color="secondary" onClick={onBack}>
        Quay lại
      </Button>
      <Button variant="contained" type="submit" style={{ marginLeft: 8 }}>
        {isLoading ? (
          <>
            <CircularProgress
              style={{ color: "#fff", width: "20px", height: "20px" }}
            />
            &nbsp;&nbsp; Đang xử lý
          </>
        ) : (
          submitText || "Lưu"
        )}
      </Button>
    </>
  );
};

export default memo(FooterForm);
