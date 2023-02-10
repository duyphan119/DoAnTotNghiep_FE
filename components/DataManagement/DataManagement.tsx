import { Box, Pagination, Paper } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { CSSProperties, FormEvent, memo, useState, ChangeEvent } from "react";
import styles from "./_style.module.scss";

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
  columns: Column[];
  hasCheck: boolean;
  rows: any[];
  count: number;
  limit: number;
  sortable: string[];
}>;

const DataManagement = ({
  paperTitle,
  columns,
  hasCheck,
  rows,
  count,
  limit,
  sortable,
}: Props) => {
  const router = useRouter();
  const { p } = router.query;
  const PAGE = p ? +p : 1;
  const [q, setQ] = useState<string>("");

  const SORT_BY = `${router.query.sortBy}`;
  const SORT_TYPE =
    router.query.sortType && router.query.sortType === "asc" ? "asc" : "desc";

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let obj: any = {
      ...(PAGE && PAGE > 1 ? { p: PAGE } : {}),
      ...(q && q !== "" ? { q } : {}),
    };
    let url = new URLSearchParams(obj).toString();
    router.push(`${router.pathname}${url ? "?" : ""}${url}`);
  };

  const handleColumnClick = (column: Column) => {
    if (sortable) {
      const { key } = column;

      const findSort = sortable.find((item) => item === key);

      if (findSort) {
        let obj: any = {
          ...(PAGE && PAGE > 1 ? { p: PAGE } : {}),
          sortBy: key,
          ...(SORT_TYPE === "desc" ? { sortType: "asc" } : {}),
          ...(q && q !== "" ? { q } : {}),
        };
        let url = new URLSearchParams(obj).toString();
        router.push(`${router.pathname}${url ? "?" : ""}${url}`);
      }
    }
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
      ...(SORT_BY ? { sortBy: SORT_BY } : {}),
      ...(SORT_TYPE === "asc" ? { sortType: "asc" } : {}),
    };
    let url = new URLSearchParams(obj).toString();
    router.push(`${router.pathname}${url ? "?" : ""}${url}`);
  };
  return (
    <Paper className={styles.paper}>
      <div className={styles.paperTitle}>{paperTitle || "Tiêu đề"}</div>
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
            {hasCheck ? (
              <th style={{ backgroundColor: "rgb(250, 250, 250)", width: 40 }}>
                <label htmlFor="checkAll">
                  <input type="checkbox" id="checkAll" />
                </label>
              </th>
            ) : null}
            {columns?.map((column: Column) => (
              <th
                key={column.key || column.display}
                style={{
                  backgroundColor: "rgb(250, 250, 250)",
                  ...column.style,
                }}
                className={column.className}
                onClick={() => handleColumnClick(column)}
              >
                {column.display}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows && rows.length > 0 ? (
            rows.map((row: any, index: number) => {
              return (
                <tr key={row.id}>
                  {hasCheck ? (
                    <td>
                      <label htmlFor={"check" + row.id}>
                        <input type="checkbox" id={"check" + row.id} />
                      </label>
                    </td>
                  ) : null}
                  {columns?.map((column: Column) => (
                    <td key={column.key} style={column.style}>
                      {showRow(column, row, index)}
                    </td>
                  ))}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={columns ? columns.length + (hasCheck ? 1 : 0) : 0}>
                Không có bản ghi nào!
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {rows && rows.length > 0 ? (
        <Pagination
          page={PAGE}
          count={count && limit ? Math.ceil(count / limit) : 0}
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
