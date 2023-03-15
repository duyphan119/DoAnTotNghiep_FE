import { Box, Tab, Tabs } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchSelector } from "@/redux/slice/fetchSlice";
import {
  productDetailActions,
  productDetailReducer,
  productDetailSelector,
} from "@/redux/slice/productDetailSlice";
import { useAppDispatch } from "@/redux/store";
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

const LIMIT = 5;

const DownTabs = (props: Props) => {
  const appDispatch = useAppDispatch();
  const { product } = useSelector(productDetailSelector);
  const { reducers } = useSelector(fetchSelector);
  const [value, setValue] = useState<number>(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (
      value === 1 &&
      product.id > 0 &&
      !reducers.includes(productDetailReducer.fetchGetAllCommentProduct)
    ) {
      appDispatch(
        productDetailActions.fetchGetAllCommentProduct({
          productId: product.id,
          limit: LIMIT,
        })
      );
    }
  }, [value, product]);

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
