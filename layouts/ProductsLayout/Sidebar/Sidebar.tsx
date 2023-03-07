import { useEffect, useState } from "react";
import { getAllVariantValues } from "../../../apis/variantvalue";
import { GroupProductModel, VariantValueModel } from "../../../models";
import ResponseGetAllModel from "../../../models/ResponseGetAllModel";
import { useAppDispatch } from "../../../redux/store";
import { MSG_SUCCESS } from "../../../utils/constants";
import helper from "../../../utils/helpers";
import styles from "../_style.module.scss";

type Props = {
  groupProductData: ResponseGetAllModel<GroupProductModel>;
  onFilter?: any;
  query?: any;
  onClose?: any;
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
  groupProduct?: GroupProductModel;
  variantValues: VariantValueModel[];
  price?: Price;
};

const Sidebar = ({ onClose, onFilter, query, groupProductData }: Props) => {
  const appDispatch = useAppDispatch();
  const [variantValues, setVariantValues] = useState<{
    keys: string[];
    values: {
      [key: string]: VariantValueModel[];
    };
  }>({
    keys: [],
    values: {},
  });
  const [selected, setSelected] = useState<Selected>({
    variantValues: [],
  });

  const clickGroupProduct = (groupProduct: GroupProductModel) => {
    setSelected((prev) => {
      if (prev?.groupProduct?.id === groupProduct.id) {
        return {
          price: prev.price,
          variantValues: prev.variantValues,
        };
      }
      return {
        ...prev,
        groupProduct,
      };
    });
  };

  const clickVariantValue = (variantValue: VariantValueModel) => {
    setSelected((prev) => {
      const index = prev.variantValues.findIndex(
        (vv) => vv.id === variantValue.id
      );

      if (index === -1) {
        return {
          ...prev,
          variantValues: [
            ...prev.variantValues.filter((vv) => vv.id !== variantValue.id),
            variantValue,
          ],
        };
      }
      return {
        ...prev,
        variantValues: prev.variantValues.filter(
          (v) => v.id !== variantValue.id
        ),
      };
    });
  };

  const clickPrice = (price: Price) => {
    setSelected((prev) => {
      if (prev?.price?.label === price.label) {
        return {
          groupProduct: prev.groupProduct,
          variantValues: prev.variantValues,
        };
      }
      return {
        ...prev,
        price,
      };
    });
  };

  const handleClick = () => {
    if (onFilter) {
      const { groupProduct, price, variantValues } = selected;
      const obj: any = {};
      if (groupProduct) {
        obj.group_product_slug = groupProduct.slug;
      }
      if (price) {
        obj.min_price = price.min;
        if (price.max) {
          obj.max_price = price.max;
        }
      }
      if (variantValues.length > 0) {
        obj.v_ids = variantValues.map((vv) => vv.id).join("-");
      }
      onFilter(obj);
      onClose && onClose();
    }
  };

  useEffect(() => {
    (async () => {
      const { message, data } = await getAllVariantValues({
        sortType: "asc",
        variant: true,
      });

      if (message === MSG_SUCCESS) {
        setVariantValues(helper.formatVariants(data.items));
      }
    })();
  }, []);

  useEffect(() => {
    if (variantValues.keys.length > 0) {
      const { group_product_slug, min_price, max_price, v_ids } = query;

      const groupProduct = groupProductData.items.find(
        (gp) => group_product_slug && gp.slug === group_product_slug
      );

      const _p = prices.find(
        (p: Price) =>
          min_price && p.min === +min_price && max_price && p.max === +max_price
      );
      const _variantValues: any = v_ids
        ? v_ids.split("-").map((id: string) => {
            let result: any;

            for (let i = 0; i < variantValues.keys.length; i++) {
              const _result = variantValues.values[variantValues.keys[i]].find(
                (vv) => vv.id === +id
              );

              if (_result) {
                result = _result;
                break;
              }
            }
            return result;
          })
        : [];
      const s: Selected = {
        ...(groupProduct ? { groupProduct } : {}),
        ...(_p ? { price: _p } : {}),
        variantValues: _variantValues,
      };
      setSelected(s);
    }
  }, [groupProductData, query, variantValues]);

  return (
    <div className={styles.sidebar}>
      <div className={styles["top-sidebar"]}>
        <div className={styles.result}>
          Đã chọn:
          {selected ? (
            <ul>
              {selected.groupProduct ? (
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

export default Sidebar;
