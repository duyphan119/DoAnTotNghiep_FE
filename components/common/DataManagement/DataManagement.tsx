import AddIcon from "@mui/icons-material/Add";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  ClickAwayListener,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  Paper,
  Popper,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  createContext,
  FormEvent,
  memo,
  MouseEvent,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ButtonControl from "../ButtonControl";
import styles from "./_style.module.scss";

type Props = Partial<{
  paperTitle: string;
  count: number;
  limit: number;
  onDeleteAll: any;
  children: ReactNode;
  sorts: Array<{
    label: string;
    sortBy: string;
    sortType: "asc" | "desc";
  }>;
  hideCreateBtn: boolean;
}>;

const DataManagementContext = createContext<any>({});

const DataManagement = ({
  paperTitle,
  count,
  limit,
  onDeleteAll,
  children,
  sorts,
  hideCreateBtn,
}: Props) => {
  const router = useRouter();
  const { p } = router.query;
  const PAGE = p ? +p : 1;
  const TOTAL_PAGE = count && limit ? Math.ceil(count / limit) : 0;
  const SORT_BY = router.query.sortBy ? `${router.query.sortBy}` : "";
  const SORT_TYPE =
    router.query.sortType && router.query.sortType === "asc" ? "asc" : "desc";

  const goToRef = useRef<HTMLInputElement>(null);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [ids, setIds] = useState<number[]>([]);
  const [openPopper, setOpenPopper] = useState<boolean>(false);
  const [sortValue, setSortValue] = useState<string>("");

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpenPopper((state) => !state);
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = searchInputRef.current ? searchInputRef.current.value : "";
    let obj: any = {
      ...(PAGE && PAGE > 1 ? { p: PAGE } : {}),
      ...(q !== "" ? { q } : {}),
    };
    let url = new URLSearchParams(obj).toString();
    router.push(`${router.pathname}${url ? "?" : ""}${url}`);
    setIds([]);
  };

  const handleChangePage = (p: number) => {
    let obj: any = {
      ...(p && p > 1 ? { p } : {}),
      ...(SORT_BY ? { sortBy: SORT_BY } : {}),
      ...(SORT_TYPE === "asc" ? { sortType: "asc" } : {}),
    };
    let url = new URLSearchParams(obj).toString();
    router.push(`${router.pathname}${url ? "?" : ""}${url}`);
    setIds([]);
  };

  const handleGoToPage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (goToRef.current) {
      const page = +goToRef.current.value;
      if (page > 0 && page <= TOTAL_PAGE) {
        handleChangePage(page);
        setOpenPopper(false);
        setIds([]);
      }
    }
  };

  const pagination = (
    <Box display="flex">
      <IconButton
        onClick={() => handleChangePage(PAGE - 1)}
        disabled={PAGE <= 1}
      >
        <ChevronLeftIcon />
      </IconButton>
      <ButtonControl variant="text" onClick={handleClick}>
        Trang {PAGE} / {TOTAL_PAGE || 1}
      </ButtonControl>
      {openPopper ? (
        <ClickAwayListener onClickAway={() => setOpenPopper(false)}>
          <Popper open={openPopper} anchorEl={anchorEl}>
            <Box
              sx={{
                border: 1,
                p: 1,
                bgcolor: "background.paper",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontSize: "12px",
              }}
            >
              <span>Đi tới trang</span>
              <form onSubmit={handleGoToPage}>
                <input
                  type="number"
                  ref={goToRef}
                  className={styles.goToPageInput}
                />
              </form>
            </Box>
          </Popper>
        </ClickAwayListener>
      ) : null}

      <IconButton
        onClick={() => handleChangePage(PAGE + 1)}
        disabled={count && limit ? PAGE >= TOTAL_PAGE : true}
      >
        <ChevronRightIcon />
      </IconButton>
    </Box>
  );

  const handleDeleteAll = () => {
    if (PAGE > 1 && PAGE <= TOTAL_PAGE) {
      handleChangePage(PAGE - 1);
    }
    onDeleteAll(ids);
  };

  const searchWrapper = (
    <form className={styles.searchWrapper} onSubmit={handleSearch}>
      <FormControl variant="standard">
        <Input
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          inputRef={searchInputRef}
          placeholder="Tìm kiếm"
        />
      </FormControl>
    </form>
  );

  const handleChangeSort = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setSortValue(value);
    const [sortBy, sortType] = value.split("-");
    let obj: any = {
      ...(PAGE > 1 ? { p: PAGE } : {}),
      sortBy,
      sortType,
    };
    let url = new URLSearchParams(obj).toString();
    router.push(`${router.pathname}${url ? "?" : ""}${url}`);
    setIds([]);
  };

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
            {searchWrapper}
            {sorts ? (
              <FormControl size="small" sx={{ minWidth: "200px" }}>
                <InputLabel>Sắp xếp theo</InputLabel>
                <Select
                  value={sortValue}
                  label="Sắp xếp theo"
                  onChange={handleChangeSort}
                >
                  {sorts.map((sortItem) => {
                    return (
                      <MenuItem
                        key={sortItem.label}
                        value={`${sortItem.sortBy}-${sortItem.sortType}`}
                      >
                        {sortItem.label}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
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
            {pagination}
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
