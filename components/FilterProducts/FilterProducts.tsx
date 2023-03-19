import { Breadcrumbs, ProductCard } from "@/components";
import { DefaultLayout } from "@/layouts";
import { GroupProductModel, ProductModel, ResponseGetAllModel } from "@/models";
import { ProductParams, SortParams } from "@/types/params";
import helper from "@/utils/helpers";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import {
  Badge,
  Box,
  Container,
  Drawer,
  Grid,
  IconButton,
  Pagination,
} from "@mui/material";
import { useRouter } from "next/router";
import { CSSProperties, FC, useMemo, useReducer } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

type BreadcrumbLink = {
  label: string;
  href: string;
  style?: CSSProperties;
};
type Breadcrumb = {
  links: BreadcrumbLink[];
  current: string;
};
type Props = {
  totalProducts: number;
  breadcrumbs: Breadcrumb;
  pathName: string;
  groupProductData: ResponseGetAllModel<GroupProductModel>;
  productData: ResponseGetAllModel<ProductModel>;
  totalPages: number;
};

type State = {
  open: boolean;
  params: ProductParams;
};

enum Actions {
  TOGGLE_DRAWER = "Đóng / Mở bộ lọc",
  CLOSE_DRAWER = "Đóng bộ lọc",
  FILTER = "Lọc",
}

const reducer = (
  state: State,
  { type, payload }: { type: string; payload?: any }
) => {
  switch (type) {
    case Actions.TOGGLE_DRAWER: {
      return { ...state, open: !state.open };
    }
    case Actions.CLOSE_DRAWER: {
      return { ...state, open: false };
    }
    case Actions.FILTER: {
      return { ...state, open: false, params: payload };
    }
    default:
      return state;
  }
};

const FilterProducts: FC<Props> = ({
  totalProducts,
  breadcrumbs,
  groupProductData,
  pathName,
  productData,
  totalPages,
}) => {
  const router = useRouter();
  const {
    group_product_slug,
    sortType,
    sortBy,
    min_price,
    max_price,
    v_ids,
    p,
  } = router.query;
  const [{ open, params }, dispatch] = useReducer(reducer, {
    open: false,
    params: {
      ...(group_product_slug ? { group_product_slug } : {}),
      ...(sortType ? { sortType } : {}),
      ...(sortBy ? { sortBy } : {}),
      ...(min_price ? { min_price: +`${min_price}` } : {}),
      ...(max_price ? { max_price: +`${max_price}` } : {}),
      ...(v_ids ? { v_ids } : {}),
      ...(p ? { p: +`${p}` } : {}),
    },
  });

  const countParams = useMemo(() => {
    let count = 0;

    try {
      if (params.min_price || params.max_price) count += 1;
      count += params.v_ids.split("-").length;
    } catch (error) {}

    return count;
  }, [params]);

  const filter = (params: SortParams | ProductParams) => {
    const path = window.location.origin + pathName;

    router.push(helper.getPathFromSearchParams(path, params));

    dispatch({ type: Actions.FILTER, payload: params });
  };

  const handleSort = (newParams: SortParams) => {
    filter({ ...params, ...newParams });
  };

  const handleFilter = (newParams: ProductParams) => {
    if (
      newParams.group_product_slug &&
      pathName.endsWith(newParams.group_product_slug)
    )
      delete newParams.group_product_slug;

    if (newParams.p && newParams.p <= 1) delete newParams.p;

    filter(newParams);
  };

  const handleClick = () => {
    dispatch({ type: Actions.TOGGLE_DRAWER });
  };

  const handleClose = () => {
    dispatch({ type: Actions.CLOSE_DRAWER });
  };

  const handleChangePage = (page: number) => {
    handleFilter({ ...params, p: page });
  };

  return (
    <DefaultLayout>
      <Container maxWidth="lg">
        <Box>
          <Breadcrumbs
            links={breadcrumbs.links}
            current={breadcrumbs.current}
            currentWrap={true}
            currentstyle={{ marginBlock: 8, fontSize: 24 }}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Box sx={{ mr: 1 }}>
            <IconButton onClick={handleClick}>
              <Badge badgeContent={countParams} color="secondary">
                <FilterAltOutlinedIcon />
              </Badge>
            </IconButton>
            <Drawer open={open} onClose={handleClose} anchor="left">
              <Box sx={{ maxWidth: "50vw", padding: "16px" }}>
                <Sidebar
                  onFilter={handleFilter}
                  onClose={handleClose}
                  groupProductData={groupProductData}
                  params={params}
                />
              </Box>
            </Drawer>
          </Box>
          <Header onSort={handleSort} totalProducts={totalProducts} />
        </Box>
        <Grid container columnSpacing={2} rowSpacing={2}>
          {productData.items.map((product) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            );
          })}
          {productData.count > 0 ? (
            totalPages > 1 ? (
              <Grid item xs={12}>
                <Pagination
                  count={totalPages}
                  sx={{ ul: { justifyContent: "center" } }}
                  variant="outlined"
                  shape="rounded"
                  showLastButton
                  showFirstButton
                  page={params.p || 1}
                  onChange={(e, page) => handleChangePage(page)}
                />
              </Grid>
            ) : null
          ) : (
            <Grid item xs={12}>
              <Box sx={{ bgcolor: "#f8bbd0", p: 2 }}>
                Không có sản phẩm phù hợp
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </DefaultLayout>
  );
};

export default FilterProducts;
