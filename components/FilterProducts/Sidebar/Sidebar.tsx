import { VariantValueApi } from "@/api";
import {
  GroupProductModel,
  ResponseGetAllModel,
  VariantValueModel,
} from "@/models";
import { ProductParams } from "@/types/params";
import helper from "@/utils/helpers";
import { memo, useEffect, useReducer } from "react";
import styles from "../_style.module.scss";

type Props = {
  groupProductData: ResponseGetAllModel<GroupProductModel>;
  onFilter: (params: ProductParams) => void;
  onClose: () => void;
  params: ProductParams;
};

export type Price = {
  label: string;
  min: number;
  max?: number;
};

const prices: any[] = [
  {
    label: "Nhỏ hơn 500.000đ",
    min: 0,
    max: 500000,
  },
  {
    label: "Từ 500.000đ - 1.000.000đ",
    min: 500000,
    max: 1000000,
  },
  {
    label: "Từ 1.000.000đ - 2.000.000đ",
    min: 1000000,
    max: 2000000,
  },
  {
    label: "Lớn hơn 2.000.000đ",
    min: 2000000,
  },
];

type Selected = {
  groupProduct: GroupProductModel;
  variantValues: VariantValueModel[];
  price?: Price;
};

type State = {
  variantValues: {
    keys: string[];
    values: {
      [key: string]: VariantValueModel[];
    };
  };
  selected: Selected;
};

enum Actions {
  SELECT_GROUP_PRODUCT = "Chọn nhóm sản phẩm",
  SELECT_VARIANT_VALUE = "Chọn thuộc tính",
  SELECT_PRICE = "Chọn khoảng giá",
  INIT_VARIANT_VALUES = "Hiển thị các thuộc tính ban đầu",
  INIT_SELECTED = "Hiển thị ban đầu lọc gì",
}

const reducer = (
  state: State,
  { type, payload }: { type: string; payload?: any }
) => {
  switch (type) {
    case Actions.SELECT_GROUP_PRODUCT: {
      const groupProduct = payload as GroupProductModel;
      const isExisting = state.selected.groupProduct.id === groupProduct.id;
      return {
        ...state,
        selected: isExisting
          ? {
              price: state.selected.price,
              variantValues: state.selected.variantValues,
              groupProduct: new GroupProductModel(),
            }
          : { ...state.selected, groupProduct },
      };
    }
    case Actions.SELECT_VARIANT_VALUE: {
      const variantValue = payload as VariantValueModel;
      const index = state.selected.variantValues.findIndex(
        (item) => item.id === variantValue.id
      );

      return {
        ...state,
        selected: {
          ...state.selected,
          variantValues:
            index !== -1
              ? [...state.selected.variantValues].filter((_, i) => i !== index)
              : [...state.selected.variantValues, variantValue],
        },
      };
    }
    case Actions.SELECT_PRICE: {
      const price = payload as Price;
      const isExisting =
        state.selected.price && state.selected.price.label === price.label;
      return {
        ...state,
        selected: isExisting
          ? {
              variantValues: state.selected.variantValues,
              groupProduct: state.selected.groupProduct,
            }
          : { ...state.selected, price },
      };
    }
    case Actions.INIT_VARIANT_VALUES: {
      const variantValues = payload as {
        keys: string[];
        values: {
          [key: string]: VariantValueModel[];
        };
      };
      return { ...state, variantValues };
    }
    case Actions.INIT_SELECTED: {
      const { groupProductData, params } = payload as {
        groupProductData: ResponseGetAllModel<GroupProductModel>;
        params: ProductParams;
      };
      const { group_product_slug, min_price, max_price, v_ids } = params;
      const groupProduct =
        groupProductData.items.find(
          (item) => item.slug === group_product_slug
        ) || new GroupProductModel();
      const price = prices.find(
        (p: Price) =>
          min_price && p.min === +min_price && max_price && p.max === +max_price
      );
      const variantValues = v_ids
        ? v_ids
            .split("-")
            .map((id: string) => {
              let result: VariantValueModel = new VariantValueModel();
              for (let i = 0; i < state.variantValues.keys.length; i++) {
                const _result = state.variantValues.values[
                  state.variantValues.keys[i]
                ].find((vv) => vv.id === +id);
                if (_result && _result.id > 0) {
                  result = _result;
                  break;
                }
              }
              return result;
            })
            .filter((item) => item.id > 0)
        : [];
      return {
        ...state,
        selected: {
          groupProduct,
          ...(price ? { price } : {}),
          variantValues,
        },
      };
    }
    default:
      return state;
  }
};

const Sidebar = ({ params, onFilter, groupProductData }: Props) => {
  const [{ variantValues, selected }, dispatch] = useReducer(reducer, {
    variantValues: {
      keys: [],
      values: {},
    },
    selected: {
      variantValues: [],
      groupProduct: new GroupProductModel(),
    },
  });

  const clickGroupProduct = (groupProduct: GroupProductModel) => {
    dispatch({ type: Actions.SELECT_GROUP_PRODUCT, payload: groupProduct });
  };

  const clickVariantValue = (variantValue: VariantValueModel) => {
    dispatch({ type: Actions.SELECT_VARIANT_VALUE, payload: variantValue });
  };

  const clickPrice = (price: Price) => {
    dispatch({ type: Actions.SELECT_PRICE, payload: price });
  };

  const handleClick = () => {
    const { groupProduct, price, variantValues } = selected;
    onFilter({
      ...(groupProduct.id > 0 ? { group_product_slug: groupProduct.slug } : {}),
      ...(price
        ? {
            min_price: price.min,
            ...(price.max ? { max_price: price.max } : {}),
          }
        : {}),
      ...(variantValues.length > 0
        ? { v_ids: variantValues.map((vv) => vv.id).join("-") }
        : {}),
      ...(groupProduct.id > 0 || price || variantValues.length > 0
        ? { p: 1 }
        : {}),
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vvApi = new VariantValueApi();
        const data = await vvApi.getAll({ sortType: "ASC", variant: true });
        dispatch({
          type: Actions.INIT_VARIANT_VALUES,
          payload: helper.formatVariants(data.items),
        });
      } catch (error) {}
    };

    fetchData();
  }, []);

  useEffect(() => {
    dispatch({
      type: Actions.INIT_SELECTED,
      payload: { groupProductData, params },
    });
  }, [groupProductData, params, variantValues]);

  return (
    <div className={styles.sidebar}>
      <div className={styles["top-sidebar"]}>
        <div className={styles.result}>
          Đã chọn:
          {selected.groupProduct.id > 0 ||
          selected.variantValues.length > 0 ||
          selected.price ? (
            <ul>
              {selected.groupProduct.id > 0 ? (
                <li
                  onClick={() =>
                    clickGroupProduct(
                      selected.groupProduct as GroupProductModel
                    )
                  }
                >
                  {selected.groupProduct.getFullName()}
                </li>
              ) : null}
              {selected.variantValues.map((variantValue) => {
                return (
                  <li
                    key={variantValue.id}
                    onClick={() => clickVariantValue(variantValue)}
                  >
                    {variantValue.value}
                  </li>
                );
              })}
              {selected.price ? (
                <li onClick={() => clickPrice(selected.price as Price)}>
                  {selected.price.label}
                </li>
              ) : null}
            </ul>
          ) : null}
        </div>
        <button onClick={handleClick}>Lọc</button>
      </div>
      <div className={styles.panel}>
        <div className={styles.title}>Nhóm sản phẩm</div>
        <ul className={styles["checkboxs"]}>
          {groupProductData.items.map((groupProduct) => {
            return (
              <li key={groupProduct.id} className={styles["checkbox"]}>
                <input
                  type="checkbox"
                  name="groupProduct"
                  id={`checkbox${groupProduct.id}`}
                  hidden={true}
                  onChange={(e) => clickGroupProduct(groupProduct)}
                  checked={selected?.groupProduct?.id === groupProduct.id}
                />
                <div
                  className={styles.checked}
                  onClick={() => clickGroupProduct(groupProduct)}
                ></div>
                <label htmlFor={`checkbox${groupProduct.id}`}>
                  {groupProduct.getFullName()}
                </label>
              </li>
            );
          })}
        </ul>
      </div>
      {variantValues.keys.map((key: string) => {
        return (
          <div className={styles.panel} key={key}>
            <div className={styles.title}>{key}</div>
            <ul className={styles.variants}>
              {variantValues.values[key].map((variantValue) => {
                return (
                  <li
                    key={variantValue.id}
                    className={`${styles.variant} ${
                      selected.variantValues.findIndex(
                        (vv) => vv.id === variantValue.id
                      ) !== -1
                        ? styles.active
                        : ""
                    }`}
                    onClick={() => clickVariantValue(variantValue)}
                  >
                    {variantValue.value}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
      <div className={styles.panel}>
        <div className={styles.title}>Giá</div>
        <ul className={styles["checkboxs"]}>
          {prices.map((price: Price) => {
            return (
              <li key={price.label} className={styles["checkbox"]}>
                <input
                  type="checkbox"
                  name="price"
                  id={`checkbox${price.min}`}
                  hidden={true}
                  checked={selected?.price?.label === price.label}
                  onChange={(e) => clickPrice(price)}
                />
                <div
                  className={styles.checked}
                  onClick={() => clickPrice(price)}
                ></div>
                <label htmlFor={`checkbox${price.min}`}>{price.label}</label>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default memo(Sidebar);
