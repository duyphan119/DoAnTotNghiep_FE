import { SortParams } from "@/types/params";
import { ClickAwayListener } from "@mui/material";
import { useRouter } from "next/router";
import { useReducer } from "react";
import styles from "../_style.module.scss";
type Props = {
  onSort: (params: SortParams) => void;
  totalProducts: number;
};
type Item = {
  label: string;
  sortBy: string;
  sortType: string;
};

type State = {
  open: boolean;
  item: Item;
};
const items: Item[] = [
  {
    label: "Mặc định",
    sortBy: "id",
    sortType: "DESC",
  },
  {
    label: "Tên A-Z",
    sortBy: "name",
    sortType: "ASC",
  },
  {
    label: "Tên Z-A",
    sortBy: "name",
    sortType: "DESC",
  },
  {
    label: "Giá tăng dần",
    sortBy: "price",
    sortType: "ASC",
  },
  {
    label: "Giá giảm dần",
    sortBy: "price",
    sortType: "DESC",
  },
];

enum Actions {
  SELECT_MENU_ITEM = "Chọn sắp xếp theo cái gì",
  TOGGLE_MENU = "Chọn xem menu sắp xếp",
}

const reducer = (
  state: State,
  { type, payload }: { type: string; payload?: any }
) => {
  switch (type) {
    case Actions.SELECT_MENU_ITEM: {
      return { ...state, open: false, item: payload };
    }
    case Actions.TOGGLE_MENU: {
      return { ...state, open: !state.open };
    }
    default:
      return state;
  }
};

const Header = ({ onSort, totalProducts }: Props) => {
  const router = useRouter();
  const { sortBy, sortType } = router.query;

  const [{ open, item }, dispatch] = useReducer(reducer, {
    open: false,
    item:
      items.find(
        (i: Item) => i.sortBy === `${sortBy}` && i.sortType === `${sortType}`
      ) || items[0],
  });

  const toggleHidden = () => {
    dispatch({ type: Actions.TOGGLE_MENU });
  };
  const handleClick = (item: Item) => {
    onSort({
      sortBy: item.sortBy,
      sortType: item.sortType === "DESC" ? "DESC" : "ASC",
    });
    // dispatch({ type: Actions.SELECT_MENU_ITEM, payload: item });
  };

  return (
    <div className={styles.header}>
      <div>{totalProducts} sản phẩm</div>
      <div className={styles["header-right"]}>
        <div>Sắp xếp</div>
        <div className={styles["header-menu"]}>
          <div
            className={styles["header-menu-selected"]}
            onClick={toggleHidden}
          >
            {item.label}
          </div>
          {open ? (
            <ClickAwayListener onClickAway={toggleHidden}>
              <ul className={styles["header-menu-items"]}>
                {items.map((item: Item) => {
                  return (
                    <li
                      key={item.label}
                      className="text-hover"
                      onClick={() => handleClick(item)}
                    >
                      {item.label}
                    </li>
                  );
                })}
              </ul>
            </ClickAwayListener>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Header;
