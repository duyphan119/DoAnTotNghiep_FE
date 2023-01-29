import { Box, Tab, Tabs } from "@mui/material";
import { ReactNode, useState } from "react";
import { useSelector } from "react-redux";
import { productDetailSelector } from "../../../redux/slice/productDetailSlice";
import CommentTab from "./CommentTab";

type Props = {};

type TabPanelProps = {
  value: number;
  index: number;
  children?: ReactNode;
};

const TabPanel = ({ value, index, children }: TabPanelProps) => {
  return value === index ? <Box sx={{ p: 2 }}>{children}</Box> : null;
};

const DownTabs = (props: Props) => {
  const { product } = useSelector(productDetailSelector);
  const [value, setValue] = useState<number>(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Chi tiết sản phẩm" />
          <Tab label="Đánh giá" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Box p={2}>
          {product ? (
            <div dangerouslySetInnerHTML={{ __html: product.detail }}></div>
          ) : null}
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CommentTab />
      </TabPanel>
    </Box>
  );
};

export default DownTabs;
