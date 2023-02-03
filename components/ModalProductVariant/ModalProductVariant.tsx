import { Box, Button, Grid, Modal } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  productManagementActions,
  productManagementSelector,
} from "../../redux/slice/productManagementSlice";
import {
  productVariantActions,
  productVariantSelector,
} from "../../redux/slice/productVariantSlice";
import {
  variantActions,
  variantSelector,
} from "../../redux/slice/variantSlice";
import { useAppDispatch } from "../../redux/store";
import { Variant, VariantValue } from "../../utils/types";
import styles from "./style.module.css";
import { Wrapper } from "./Wrapper";
type Props = {};

const ModalProductVariant = (props: Props) => {
  const appDispatch = useAppDispatch();
  const { openModalPV, current: product } = useSelector(
    productManagementSelector
  );
  const { productVariants, inputs } = useSelector(productVariantSelector);
  const { variants } = useSelector(variantSelector);
  const [selected, setSelected] = useState<Variant[]>([]);

  const countSelected = useMemo(() => {
    return selected.length > 0
      ? selected.reduce(
          (prev: number, cur: Variant) => prev * cur.variantValues.length,
          1
        )
      : 0;
  }, [selected]);

  useEffect(() => {
    if (product) {
      appDispatch(variantActions.fetchGetAllVariants({ variant_values: true }));
      appDispatch(
        productVariantActions.fetchGetAllProductVariants({
          productId: product.id,
          variant_values: true,
        })
      );
    }
  }, [product]);

  if (!openModalPV || !product) return null;

  const handleClickVariantValue = (
    variantValue: VariantValue,
    variant: Variant
  ) => {
    const _selected = [...selected];
    const indexVariant = _selected.findIndex(
      (v: Variant) => v.id === variant.id
    );
    if (indexVariant !== -1) {
      const indexVariantValue = _selected[indexVariant].variantValues.findIndex(
        (vv: VariantValue) => vv.id === variantValue.id
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

  const handleDelete = (id: number) => {
    // setProductVariants(
    //   [...productVariants].filter(
    //     (productVariant: ProductVariant) => productVariant.id !== id
    //   )
    // );
  };

  const handleGenerate = () => {
    appDispatch(
      productVariantActions.generateInputs({
        selected,
        variants,
        count: countSelected,
        product,
      })
    );
  };

  return (
    <Modal
      open={openModalPV}
      onClose={() => appDispatch(productManagementActions.hideModalPV())}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          width: "80%",
          height: "80%",
          padding: "16px",
        }}
      >
        <Grid container sx={{ height: "100%" }}>
          <Grid item xs={12} sx={{ height: "100%" }}>
            <Box display="flex" flexDirection="column" height="100%">
              <Box className={styles.title}>Biến thể sản phẩm</Box>
              <Box className={styles.wrapper}>
                <div className={styles.variants}>
                  {variants.map((variant: Variant) => {
                    const indexVariant = selected.findIndex(
                      (v: Variant) => v.id === variant.id
                    );
                    return (
                      <Box className={styles.variant} key={variant.id}>
                        <div className={styles.variantName}>{variant.name}</div>
                        <div className={styles.variantValues}>
                          {variant.variantValues.map(
                            (variantValue: VariantValue) => {
                              const isActive =
                                indexVariant !== -1 &&
                                selected[indexVariant].variantValues.findIndex(
                                  (vv: VariantValue) =>
                                    vv.id === variantValue.id
                                ) !== -1;
                              return (
                                <div
                                  className={`${styles.variantValue} ${
                                    isActive ? styles.active : ""
                                  }`}
                                  key={variantValue.id}
                                  onClick={() =>
                                    handleClickVariantValue(
                                      variantValue,
                                      variant
                                    )
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
                  {productVariants.length > 0 ? (
                    <Grid item xs={6}>
                      <Wrapper title="Các biến thể sản phẩm" />
                    </Grid>
                  ) : null}
                  {inputs.length > 0 ? (
                    <Grid item xs={6}>
                      <Wrapper title="Các biến thể sản phẩm vừa tạo" />
                    </Grid>
                  ) : null}
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ModalProductVariant;
