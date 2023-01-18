import React, {
  useState,
  useEffect,
  useMemo,
  useContext,
  createContext,
} from "react";
import {
  Product,
  ProductVariant,
  Variant,
  VariantValue,
} from "../../utils/types";
import { Modal, Typography, Box, Button, Grid, Tooltip } from "@mui/material";
import { getAllVariants } from "../../apis/variant";
import { MSG_SUCCESS } from "../../utils/constants";
import styles from "./style.module.css";
import {
  CreateProductVariant,
  createProductVariants,
  getAllProductVariants,
  updateProductVariants,
} from "../../apis/productvariant";
import { Wrapper } from "./Wrapper";
import { useSnackbarContext } from "../../context/SnackbarContext";
type Props = {
  open?: boolean;
  onClose?: any;
  product?: Product;
};

export type Input = {
  price: number;
  inventory: number;
  name: string;
};

const ModalProductVariantContext = createContext<any>({});

const ModalProductVariant = ({ open, onClose, product }: Props) => {
  const { show } = useSnackbarContext();
  const [variants, setVariants] = useState<Variant[]>([]);
  const [selected, setSelected] = useState<Variant[]>([]);
  const [generatedSelected, setGeneratedSelected] = useState<VariantValue[][]>(
    []
  );
  const [productVariants, setProductVariants] = useState<ProductVariant[]>([]);
  const [inputs, setInputs] = useState<Input[]>([]);

  const countSelected = useMemo(() => {
    return selected.length > 0
      ? selected.reduce(
          (prev: number, cur: Variant) => prev * cur.variantValues.length,
          1
        )
      : 0;
  }, [selected]);

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
    setProductVariants(
      [...productVariants].filter(
        (productVariant: ProductVariant) => productVariant.id !== id
      )
    );
  };

  const handleGenerate = () => {
    const COUNT = countSelected;
    let results = new Array(COUNT).fill("");
    selected.forEach((variant: Variant, index1: number) => {
      if (variant.variantValues.length > 0)
        results = results.map((result: any, index2: number) => {
          const LENGTH = variant.variantValues.length;
          if (index1 === variants.length - 1) {
            return [
              ...result,
              variant.variantValues[Math.floor(index2 % LENGTH)],
            ];
          } else {
            return [
              ...result,
              variant.variantValues[Math.floor((index2 * LENGTH) / COUNT)],
            ];
          }
        });
    });
    setInputs(
      results.map((variantValues: VariantValue[]) => {
        return {
          name: (() => {
            variantValues.sort(
              (a: VariantValue, b: VariantValue) => a.id - b.id
            );
            return variantValues
              .map((variantValue: VariantValue) => variantValue.value)
              .join(" / ");
          })(),
          price: product ? product.price : 0,
          inventory: product ? product.inventory : 0,
          variantValues,
        };
      })
    );
  };

  const handleChange = (data: Input) => {
    console.log({ data });
    const index1 = productVariants.findIndex(
      (productVariant: ProductVariant) => productVariant.name === data.name
    );
    if (index1 === -1) {
      const index2 = inputs.findIndex(
        (input: Input) => input.name === data.name
      );
      if (index2 !== -1) {
        const _inputs = [...inputs];
        _inputs[index2] = Object.assign(_inputs[index2], data);
        setInputs(_inputs);
      }
    } else {
      const _productVariants = [...productVariants];
      _productVariants[index1] = Object.assign(_productVariants[index1], data);
      setProductVariants(_productVariants);
    }
  };

  const handleCreate = async () => {
    if (product) {
      const productId = product.id;
      try {
        console.log(inputs.map((input: Input) => ({ ...input, productId })));
        const { message: msg1 } = await createProductVariants(
          inputs.map((input: Input) => ({ ...input, productId }))
        );
        if (msg1 === MSG_SUCCESS) {
          const { message: msg2, data: data2 } = await getAllProductVariants({
            variant_values: true,
            productId,
          });
          if (msg2 === MSG_SUCCESS) {
            setProductVariants(data2.items);
            setInputs([]);
          }
        }
      } catch (error) {
        console.log("Add product variant error", error);
      }
    }
  };

  const handleUpdate = async () => {
    try {
      const { message } = await updateProductVariants(
        productVariants.map((productVariant: ProductVariant) => ({
          id: productVariant.id,
          inventory: productVariant.inventory,
          price: productVariant.price,
        }))
      );
      if (message === MSG_SUCCESS) {
        show("Đã lưu", "success");
      }
    } catch (error) {
      console.log("Update product variant error", error);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        if (product) {
          const [
            { message: msg1, data: data1 },
            { message: msg2, data: data2 },
          ] = await Promise.all([
            getAllVariants({
              variant_values: true,
            }),
            getAllProductVariants({
              productId: product.id,
              variant_values: true,
            }),
          ]);
          if (msg1 === MSG_SUCCESS) {
            setVariants(data1.items);
          }
          if (msg2 === MSG_SUCCESS) {
            setProductVariants(data2.items);
          }
        }
      } catch (error) {
        console.log("FETCH VARIANTS ERROR", error);
      }
    };

    fetch();
  }, [product]);

  return (
    <ModalProductVariantContext.Provider
      value={{
        onCreate: handleCreate,
        onUpdate: handleUpdate,
        onDelete: handleDelete,
        onChange: handleChange,
      }}
    >
      <Modal open={open || false} onClose={onClose}>
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
                          <div className={styles.variantName}>
                            {variant.name}
                          </div>
                          <div className={styles.variantValues}>
                            {variant.variantValues.map(
                              (variantValue: VariantValue) => {
                                const isActive =
                                  indexVariant !== -1 &&
                                  selected[
                                    indexVariant
                                  ].variantValues.findIndex(
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
                        <Wrapper
                          title="Các biến thể sản phẩm"
                          productVariants={productVariants}
                          product={product}
                        />
                      </Grid>
                    ) : null}
                    {inputs.length > 0 ? (
                      <Grid item xs={6}>
                        <Wrapper
                          title="Các biến thể sản phẩm vừa tạo"
                          inputs={inputs}
                          product={product}
                        />
                      </Grid>
                    ) : null}
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </ModalProductVariantContext.Provider>
  );
};

export function useModalProductVariantContext() {
  return useContext(ModalProductVariantContext);
}

export default ModalProductVariant;
