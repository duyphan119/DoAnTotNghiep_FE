import { Box, Modal, Tab, Tabs } from "@mui/material";
import React from "react";
import Login from "./Login";
import Register from "./Register";
import styles from "./style.module.css";

type Props = {
  open: boolean;
  onClose?: any;
};
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
const ModalAuth = (props: Props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Box
        bgcolor="#fff"
        width={400}
        position="absolute"
        top="50%"
        left="50%"
        sx={{ transform: "translate(-50%, -50%)" }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Đăng nhập" />
            <Tab label="Đăng ký" />
          </Tabs>
          <TabPanel value={value} index={0}>
            <Login onClose={props.onClose} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Register onClose={props.onClose} />
          </TabPanel>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalAuth;
