import { Grid, Pagination } from "@mui/material";
import { useSelector } from "react-redux";
import {
  productDetailActions,
  productDetailSelector,
} from "@/redux/slice/productDetailSlice";
import { useAppDispatch } from "@/redux/store";
import CommentInput from "./CommentInput";
import Comments from "./Comments";
import { ProductModel } from "@/models";

type Props = {
  product: ProductModel;
};

const CommentTab = ({ product }: Props) => {
  const appDispatch = useAppDispatch();
  const { page, totalPage } = useSelector(productDetailSelector);

  const changePage = (newPage: number) => {
    appDispatch(productDetailActions.setPage({ page: newPage, product }));
  };

  return (
    <Grid container columnSpacing={2} rowSpacing={2}>
      <Grid
        item
        xs={12}
        md={8}
        borderRight={1}
        borderColor="rgba(0, 0, 0, 0.12)"
      >
        <Comments />
        {totalPage > 1 ? (
          <Pagination
            count={totalPage}
            sx={{ ul: { justifyContent: "center" } }}
            variant="outlined"
            shape="rounded"
            showLastButton
            showFirstButton
            page={page}
            onChange={(e, p) => changePage(p)}
            color="primary"
          />
        ) : null}
      </Grid>
      <Grid
        item
        xs={12}
        md={4}
        borderLeft={1}
        borderColor="rgba(0, 0, 0, 0.12)"
      >
        <CommentInput />
      </Grid>
    </Grid>
  );
};

export default CommentTab;
