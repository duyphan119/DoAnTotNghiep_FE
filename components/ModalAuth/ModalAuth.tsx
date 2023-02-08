import ClearIcon from "@mui/icons-material/Clear";
import { Box, Modal } from "@mui/material";
import { useState, memo } from "react";

import Login from "./Login";
import Register from "./Register";
import styles from "./_style.module.scss";

type Props = {
  open: boolean;
  onClose?: any;
};
type TabProps = Partial<{
  label: string;
  onClick: any;
  index: number;
  value: number;
}>;
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

const Tab = ({ onClick, label, index, value }: TabProps) => {
  return (
    <Box
      className={`${styles.tab} ${index === value ? styles.active : ""}`}
      onClick={() => onClick(index)}
    >
      {label}
    </Box>
  );
};

const ModalAuth = ({ open, onClose }: Props) => {
  const [value, setValue] = useState<number>(0);

  const handleClick = (newValue: number) => {
    setValue(newValue);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className={styles.modalAuth}>
        <Box className={styles.closeIcon} onClick={onClose}>
          <ClearIcon />
        </Box>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Box className={styles.tabs}>
            <Tab
              label="Đăng nhập"
              onClick={handleClick}
              value={value}
              index={0}
            />
            <Tab
              label="Đăng ký"
              onClick={handleClick}
              value={value}
              index={1}
            />
          </Box>
          <TabPanel value={value} index={0}>
            <Login />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Register />
          </TabPanel>
        </Box>
      </Box>
    </Modal>
  );
};

export default memo(ModalAuth);
