import { useState, ReactNode } from "react";
import { Product } from "../../../utils/types";
import { Box, Tab, Tabs } from "@mui/material";
import CommentTab from "./CommentTab";
import { useProductDetailContext } from "../../../pages/product/[slug]";

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
  const { product } = useProductDetailContext();
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
          <div dangerouslySetInnerHTML={{ __html: product.detail }}></div>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CommentTab />
      </TabPanel>
    </Box>
  );
};

export default DownTabs;
