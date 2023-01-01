import { Box, Pagination, Paper } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { CSSProperties, FormEvent, memo, useState, ChangeEvent } from "react";
import styles from "./style.module.css";

type SortBy = {
  display: string;
  value: string;
};

type Column = { key: string } & Partial<{
  style: CSSProperties;
  className: string;
  display: string;
  render: any;
}>;

type Props = Partial<{
  paperTitle: string;
  sortBys: SortBy[];
  columns: Column[];
  hasCheck: boolean;
  rows: any[];
  count: number;
  limit: number;
}>;

const DataManagement = (props: Props) => {
  const router = useRouter();
  const { p } = router.query;
  const PAGE = p ? +p : 1;
  const [q, setQ] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  const [sortType, setSortType] = useState<string>("desc");

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let obj: any = {
      ...(PAGE && PAGE > 1 ? { p: PAGE } : {}),
      ...(sortBy ? { sortBy } : {}),
      ...(sortType && sortType !== "desc" ? { sortType } : {}),
      ...(q && q !== "" ? { q } : {}),
    };
    let url = new URLSearchParams(obj).toString();
    router.push(`${router.pathname}${url ? "?" : ""}${url}`);
  };

  const handleSort = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let obj: any = {
      ...(PAGE && PAGE > 1 ? { p: PAGE } : {}),
      ...(sortBy ? { sortBy } : {}),
      ...(sortType && sortType !== "desc" ? { sortType } : {}),
    };
    let url = new URLSearchParams(obj).toString();
    router.push(`${router.pathname}${url ? "?" : ""}${url}`);
  };

  const showRow = (column: Column, row: any, index: number) => {
    if (column.render) {
      return column.render(row);
    }
    if (column.key === "index") {
      return index + 1;
    }
    return row[column.key];
  };
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setQ(e.target.value);
  };
  const handleChangePage = (p: number) => {
    let obj: any = {
      ...(p && p > 1 ? { p } : {}),
      ...(sortBy !== "" ? { sortBy: sortBy, sortType: sortType } : {}),
    };
    let url = new URLSearchParams(obj).toString();
    router.push(`${router.pathname}${url ? "?" : ""}${url}`);
  };
  return (
    <Paper className={styles.paper}>
      <div className={styles.paperTitle}>{props.paperTitle || "Tiêu đề"}</div>
      <Box className={styles.actionsWrapper}>
        <Box className={styles.actionsWrapperLeft}>
          <form className={styles.searchWrapper} onSubmit={handleSearch}>
            <input
              type="search"
              value={q}
              onChange={handleChangeInput}
              placeholder="Tìm tại đây"
            />
            <button type="submit" className="btnSearch">
              Tìm
            </button>
          </form>
          <form className={styles.sortForm} onSubmit={handleSort}>
            <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
              <option value="">Sắp xếp theo</option>
              {props.sortBys?.map((sb: SortBy) => (
                <option key={sb.value + ""} value={sb.value}>
                  {sb.display}
                </option>
              ))}
            </select>
            <select
              onChange={(e) => setSortType(e.target.value)}
              value={sortType}
            >
              <option value="asc">Tăng dần</option>
              <option value="desc">Giảm dần</option>
            </select>
            <button className="btnSort" type="submit" disabled={sortBy === ""}>
              Sắp xếp
            </button>
          </form>
        </Box>
        <Box>
          <Link href={router.pathname + "/create"}>
            <button className="btnAdd">Thêm mới</button>
          </Link>
        </Box>
      </Box>
      <table className="table">
        <thead>
          <tr>
            {props.hasCheck ? (
              <th style={{ backgroundColor: "rgb(250, 250, 250)", width: 40 }}>
                <label htmlFor="checkAll">
                  <input type="checkbox" id="checkAll" />
                </label>
              </th>
            ) : null}
            {props.columns?.map((column: Column) => (
              <th
                key={column.key || column.display}
                style={{
                  backgroundColor: "rgb(250, 250, 250)",
                  ...column.style,
                }}
                className={column.className}
              >
                {column.display}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.rows && props.rows.length > 0 ? (
            props.rows.map((row: any, index: number) => {
              return (
                <tr key={row.id}>
                  {props.hasCheck ? (
                    <td>
                      <label htmlFor={"check" + row.id}>
                        <input type="checkbox" id={"check" + row.id} />
                      </label>
                    </td>
                  ) : null}
                  {props.columns?.map((column: Column) => (
                    <td key={column.key} style={column.style}>
                      {showRow(column, row, index)}
                    </td>
                  ))}
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={
                  props.columns
                    ? props.columns.length + (props.hasCheck ? 1 : 0)
                    : 0
                }
              >
                Không có bản ghi nào!
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {props.rows && props.rows.length > 0 ? (
        <Pagination
          page={PAGE}
          count={
            props.count && props.limit
              ? Math.ceil(props.count / props.limit)
              : 0
          }
          sx={{ ul: { justifyContent: "center", marginTop: "16px" } }}
          variant="outlined"
          shape="rounded"
          showLastButton
          showFirstButton
          onChange={(e, page) => handleChangePage(page)}
          color="primary"
        />
      ) : null}
    </Paper>
  );
};

export default memo(DataManagement);
