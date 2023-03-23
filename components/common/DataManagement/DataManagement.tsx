import helper from "@/utils/helpers";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Paper, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  createContext,
  FC,
  memo,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ButtonControl from "../ButtonControl";
import Pagination from "./Pagination";
import SearchWrapper from "./SearchWrapper";
import Sort from "./Sort";
import styles from "./_style.module.scss";

type Props = Partial<{
  paperTitle: string;
  count: number;
  limit: number;
  onDeleteAll: (ids: number[]) => void;
  children: ReactNode;
  sorts: Array<{
    label: string;
    sortBy: string;
    sortType: "ASC" | "DESC";
  }>;
  hideCreateBtn: boolean;
}>;

const DataManagementContext = createContext<any>({});

const DataManagement: FC<Props> = ({
  paperTitle,
  count,
  limit,
  onDeleteAll,
  children,
  sorts,
  hideCreateBtn,
}) => {
  const router = useRouter();
  const { p } = router.query;
  const PAGE = p ? +p : 1;
  const TOTAL_PAGE = count && limit ? Math.ceil(count / limit) : 0;
  const SORT_BY = router.query.sortBy ? `${router.query.sortBy}` : "";
  const SORT_TYPE =
    router.query.sortType && router.query.sortType === "ASC" ? "ASC" : "DESC";

  const searchInputRef = useRef<HTMLInputElement>(null);
  const [ids, setIds] = useState<number[]>([]);
  const [sortValue, setSortValue] = useState<string>("");

  const handleSearch = (q: string) => {
    let obj = {
      ...(PAGE && PAGE > 1 ? { p: PAGE } : {}),
      ...(q !== "" ? { q } : {}),
    };
    router.push(helper.getPathFromSearchParams(router.pathname, obj));
  };

  const handleChangePage = (p: number) => {
    let obj = {
      ...(p && p > 1 ? { p } : {}),
      ...(SORT_BY ? { sortBy: SORT_BY } : {}),
      ...(SORT_TYPE === "ASC" ? { sortType: "ASC" } : {}),
    };
    router.push(helper.getPathFromSearchParams(router.pathname, obj));
  };

  const handleDeleteAll = () => {
    if (PAGE > 1 && PAGE <= TOTAL_PAGE) {
      handleChangePage(PAGE - 1);
    }
    onDeleteAll && onDeleteAll(ids);
  };

  const handleChangeSort = (value: string) => {
    setSortValue(value);
    const [sortBy, sortType] = value.split("-");
    let obj = {
      ...(PAGE > 1 ? { p: PAGE } : {}),
      sortBy,
      sortType,
    };
    router.push(helper.getPathFromSearchParams(router.pathname, obj));
  };

  useEffect(() => {
    setIds([]);
  }, [router.query]);

  useEffect(() => {
    if (SORT_BY) {
      const sort = sorts?.find((sortItem) => sortItem.sortBy === SORT_BY);
      if (sort) {
        setSortValue(`${SORT_BY}-${SORT_TYPE}`);
      }
    }
  }, [SORT_BY, SORT_TYPE, sorts]);

  return (
    <DataManagementContext.Provider
      value={{
        ids,
        setIds,
      }}
    >
      <Paper className={styles.paper}>
        <div className={styles.paperTitle}>{paperTitle || "Tiêu đề"}</div>
        <Box
          className={styles.actionsWrapper}
          sx={{
            flexDirection: {
              xs: "column",
              md: "row",
            },
          }}
        >
          <Box
            className={styles.actionsWrapperLeft}
            sx={{
              justifyContent: {
                xs: "space-between",
                md: "flex-start",
              },
            }}
          >
            {hideCreateBtn ? null : (
              <Link href={router.pathname + "/create"}>
                <ButtonControl
                  startIcon={<AddIcon />}
                  tooltip="Đi tới trang thêm mới sản phẩm"
                >
                  Thêm mới
                </ButtonControl>
              </Link>
            )}
            <SearchWrapper onSearch={handleSearch} />
            {sorts ? (
              <Sort
                sorts={sorts}
                value={sortValue}
                onChange={handleChangeSort}
              />
            ) : null}
          </Box>
          <Box
            className={styles.actionsWrapperRight}
            sx={{
              justifyContent: {
                xs: "space-between",
                md: "flex-end",
              },
              alignItems: "center",
            }}
          >
            {ids.length > 0 ? (
              <Typography>Đã chọn: {ids.length}</Typography>
            ) : null}
            <ButtonControl
              color="error"
              startIcon={<DeleteIcon />}
              disabled={ids && ids.length === 0}
              onClick={handleDeleteAll}
            >
              Xoá
            </ButtonControl>
            <Pagination
              onChangePage={handleChangePage}
              page={PAGE}
              totalPage={TOTAL_PAGE}
            />
          </Box>
        </Box>
        {children}
      </Paper>
    </DataManagementContext.Provider>
  );
};

export const useDataManamentContext = () => {
  return useContext(DataManagementContext);
};

export default memo(DataManagement);
