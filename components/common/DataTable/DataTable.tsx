import { Checkbox } from "@mui/material";
import { useRouter } from "next/router";
import { CSSProperties, memo, ReactNode, useRef } from "react";
import { useDataManamentContext } from "../DataManagement/DataManagement";

type Column = { key: string } & Partial<{
  style: CSSProperties;
  className: string;
  display: string;
  render: any;
}>;

type Props = Partial<{
  columns: Column[];
  hasCheck: boolean;
  rows: any[];
  count: number;
  limit: number;
  sortable: string[];
  children: ReactNode;
  isLoading: boolean;
}>;

const DataTable = ({ isLoading, columns, hasCheck, rows, sortable }: Props) => {
  const router = useRouter();
  const { p } = router.query;
  const PAGE = p ? +p : 1;
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { ids, setIds } = useDataManamentContext();

  const SORT_BY = router.query.sortBy ? `${router.query.sortBy}` : "";
  const SORT_TYPE =
    router.query.sortType && router.query.sortType === "ASC" ? "ASC" : "DESC";

  const handleColumnClick = (column: Column) => {
    if (sortable) {
      const { key } = column;

      const findSort = sortable.find((item) => item === key);

      const q = searchInputRef.current ? searchInputRef.current.value : "";
      if (findSort) {
        let obj: any = {
          ...(PAGE && PAGE > 1 ? { p: PAGE } : {}),
          sortBy: key,
          ...(SORT_TYPE === "DESC" ? { sortType: "ASC" } : {}),
          ...(q !== "" ? { q } : {}),
        };
        let url = new URLSearchParams(obj).toString();
        router.push(`${router.pathname}${url ? "?" : ""}${url}`);
        setIds([]);
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

  const handleCheckAll = () => {
    setIds(ids.length > 0 ? [] : rows ? rows.map((row: any) => row.id) : []);
  };

  const handleCheck = (id: number) => {
    const arr = [...ids];
    const index = arr.findIndex((item) => item === id);
    if (index !== -1) {
      arr.splice(index, 1);
    } else {
      arr.push(id);
    }
    setIds(arr);
  };

  return (
    <table className="table" style={{ fontSize: "14px" }}>
      <thead>
        <tr>
          {hasCheck ? (
            <th
              style={{
                backgroundColor: "rgb(250, 250, 250)",
                width: 32,
              }}
            >
              <div className="flex-center">
                <input
                  type="checkbox"
                  onChange={handleCheckAll}
                  checked={
                    rows && rows.length > 0 && ids.length === rows.length
                  }
                  name="checkboxAll"
                />
              </div>
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
        {isLoading ? (
          <tr>
            <td colSpan={columns ? columns.length + (hasCheck ? 1 : 0) : 0}>
              Đang tải dữ liệu
            </td>
          </tr>
        ) : rows && rows.length > 0 ? (
          rows.map((row: any, index: number) => {
            return (
              <tr key={row.id}>
                {hasCheck ? (
                  <td style={{ textAlign: "center" }}>
                    <div className="flex-center">
                      <input
                        type="checkbox"
                        checked={ids.includes(row.id)}
                        onChange={() => handleCheck(row.id)}
                        name="checkbox"
                      />
                    </div>
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
        {}
      </tbody>
    </table>
  );
};

export default memo(DataTable);
