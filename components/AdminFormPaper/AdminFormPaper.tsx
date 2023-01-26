import { Paper } from "@mui/material";
import { ReactNode } from "react";

type Props = Partial<{
  children: ReactNode;
  title: string;
}>;

const AdminFormPaper = ({ children, title }: Props) => {
  return (
    <Paper sx={{ p: 2 }}>
      <div style={{ fontSize: "2rem", fontWeight: "600", marginBottom: 16 }}>
        {title}
      </div>
      {children}
    </Paper>
  );
};

export default AdminFormPaper;
