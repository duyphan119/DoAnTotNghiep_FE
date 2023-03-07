import { Box, Button, Grid } from "@mui/material";
import { memo, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { VariantModel, VariantValueModel } from "../../../../models";
import { productSelector } from "../../../../redux/slice/productSlice";
import {
  productVariantActions,
  productVariantSelector,
} from "../../../../redux/slice/productVariantSlice";
import {
  variantActions,
  variantSelector,
} from "../../../../redux/slice/variantSlice";
import { useAppDispatch } from "../../../../redux/store";
import { Variant, VariantValue } from "../../../../utils/types";
import { Wrapper } from "./Wrapper";
import styles from "./_style.module.scss";

type Props = {
  getPrice: () => number;
  getInventory: () => number;
};

const ProductVariantForm = ({ getPrice, getInventory }: Props) => {
  const appDispatch = useAppDispatch();
  const { current: product } = useSelector(productSelector);
  const { productVariants, inputs } = useSelector(productVariantSelector);
  const { variantData } = useSelector(variantSelector);
  const [selected, setSelected] = useState<VariantModel[]>([]);

  const countSelected = useMemo(() => {
    return selected.length > 0
      ? selected.reduce(
          (prev: number, cur: Variant) => prev * cur.variantValues.length,
          1
        )
      : 0;
  }, [selected]);

  const handleClickVariantValue = (
    variantValue: VariantValueModel,
    variant: VariantModel
  ) => {
    const _selected = [...selected];
    const indexVariant = _selected.findIndex(
      (v: VariantModel) => v.id === variant.id
    );
    if (indexVariant !== -1) {
      const indexVariantValue = _selected[indexVariant].variantValues.findIndex(
        (vv: VariantValueModel) => vv.id === variantValue.id
      );
      if (indexVariantValue !== -1) {
        _selected[indexVariant].variantValues.splice(indexVariantValue, 1);
      } else {
        _selected[indexVariant].variantValues.push(variantValue);
      }
    } else {
      _selected.push({ ...variant, variantValues: [variantValue] });
    }
    setSelected(_selected);
  };

  const handleGenerate = () => {
    appDispatch(
      productVariantActions.generateInputs({
        selected,
        variants: variantData.items,
        count: countSelected,
        price: !product || product.id > 0 ? product.price : getPrice(),
        inventory:
          !product || product.id > 0 ? product.inventory : getInventory(),
      })
    );
  };

  useEffect(() => {
    appDispatch(variantActions.fetchGetAll({ variant_values: true }));
    if (product.id > 0) {
      appDispatch(
        productVariantActions.fetchGetAll({
          productId: product.id,
          variant_values: true,
        })
      );
    }
  }, [product]);

  return (
    <>
      <Box display="flex" flexDirection="column">
        <Box className={styles.title}>Biến thể sản phẩm</Box>
        <Box className={styles.wrapper}>
          <div className={styles.variants}>
            {variantData.items.map((variant: VariantModel) => {
              const indexVariant = selected.findIndex(
                (v: VariantModel) => v.id === variant.id
              );
              return (
                <Box className={styles.variant} key={variant.id}>
                  <div className={styles.variantName}>{variant.name}</div>
                  <div className={styles.variantValues}>
                    {variant.variantValues.map(
                      (variantValue: VariantValueModel) => {
                        const isActive =
                          indexVariant !== -1 &&
                          selected[indexVariant].variantValues.findIndex(
                            (vv: VariantValueModel) => vv.id === variantValue.id
                          ) !== -1;
                        return (
                          <div
                            className={`${styles.variantValue} ${
                              isActive ? styles.active : ""
                            }`}
                            key={variantValue.id}
                            onClick={() =>
                              handleClickVariantValue(variantValue, variant)
                            }
                          >
                            {variantValue.value}
                          </div>
                        );
                      }
                    )}
                  </div>
                </Box>
              );
            })}
            <div>
              <Button
                variant="contained"
                onClick={handleGenerate}
                disabled={countSelected === 0}
              >
                Tạo
              </Button>
            </div>
          </div>
          <Grid container columnSpacing={2} rowSpacing={2}>
            {inputs.length > 0 || productVariants.length > 0 ? (
              <Grid item xs={12}>
                <Wrapper title="Các biến thể sản phẩm" />
              </Grid>
            ) : null}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default memo(ProductVariantForm);
