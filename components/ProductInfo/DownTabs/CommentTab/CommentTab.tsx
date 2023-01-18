import { Grid, Pagination } from "@mui/material";
import { useProductDetailContext } from "../../../../pages/product/[slug]";
import CommentInput from "./CommentInput";
import Comments from "./Comments";

type Props = {};

const CommentTab = (props: Props) => {
  const { page, setPage, totalPage } = useProductDetailContext();

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
            onChange={(e, p) => setPage(p)}
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
