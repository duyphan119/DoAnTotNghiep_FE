import { ButtonControl } from "@/components";
import { useDefaultLayoutContext } from "@/context/DefaultLayoutContext";
import { useSocketContext } from "@/context/SocketContext";
import {
  OrderItemModel,
  ProductVariantModel,
  VariantValueModel,
} from "@/models";
import { authSelector } from "@/redux/slice/authSlice";
import { cartActions } from "@/redux/slice/cartSlice";
import {
  productDetailActions,
  productDetailSelector,
} from "@/redux/slice/productDetailSlice";
import { snackbarActions } from "@/redux/slice/snackbarSlice";
import { useAppDispatch } from "@/redux/store";
import { publicRoutes } from "@/utils/routes";
import { Rating } from "@mui/material";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./_style.module.scss";

type Props = {};

const Right: FC<Props> = () => {
  const { socket } = useSocketContext();
  const appDispatch = useAppDispatch();
  const router = useRouter();
  const { profile } = useDefaultLayoutContext();

  const {
    product,
    selectedVariantValues,
    selectedProductVariant,
    renderVariantValues,
  } = useSelector(productDetailSelector);
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = (qtt?: number) => {
    if (selectedProductVariant) {
      if (profile.id > 0) {
        // Thêm vào giỏ hàng khi đã đăng nhập
        appDispatch(
          cartActions.fetchAddToCart({
            quantity: qtt || quantity,
            productVariantId: selectedProductVariant.id,
            price: selectedProductVariant.price,
          })
        );
      } else {
        // Thêm vào giỏ hàng lúc chưa đăng nhập
        appDispatch(
          cartActions.addToCart(
            new OrderItemModel({
              quantity: qtt || quantity,
              productVariantId: selectedProductVariant.id,
              price: selectedProductVariant.price,
              productVariant: new ProductVariantModel({
                ...JSON.parse(JSON.stringify(selectedProductVariant)),
                product: JSON.parse(JSON.stringify(product)),
              }),
            })
          )
        );
        appDispatch(
          snackbarActions.success("Sản phẩm đã được thêm vào giỏ hàng")
        );
      }
      router.push(publicRoutes.cart);
    }
  };

  const handlePurchaseNow = () => {
    handleAddToCart(1);
    router.push(publicRoutes.payment);
  };

  const changeQuantity = (newQuantity: number) => {
    newQuantity > 0 && setQuantity(newQuantity);
  };

  const handleClickVariantValue = (variantValue: VariantValueModel) => {
    appDispatch(productDetailActions.clickVariantValue(variantValue));
  };

  useEffect(() => {
    socket.on(
      "Update Star Product",
      ({ id, star }: { id: number; star: number }) => {
        console.log({ id, star });
        appDispatch(productDetailActions.updateStar({ id, star }));
      }
    );
  }, [socket]);

  return product.id > 0 ? (
    <div className={styles.right}>
      <div className={styles.name}>{product.name}</div>
      <div className={styles.star}>
        <Rating value={product.star} readOnly precision={0.5} />
      </div>
      <div className={styles.price}>
        {selectedProductVariant.id > 0 || !selectedProductVariant
          ? selectedProductVariant.price
          : product.rangePrice()}
        đ
      </div>
      {renderVariantValues.keys.map((key: string) => {
        return (
          <div className={styles.variantType} key={key}>
            <div className={styles.title}>{key}</div>
            <ul className={styles.variant}>
              {renderVariantValues.values[key].map((variantValue) => {
                const active =
                  selectedVariantValues.findIndex(
                    (i) => i.id === variantValue.id
                  ) !== -1;

                return (
                  <li
                    key={variantValue.id}
                    onClick={() => handleClickVariantValue(variantValue)}
                    className={active ? styles.active : ""}
                  >
                    {variantValue.value}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
      <div className={styles.quantity}>
        <button onClick={() => changeQuantity(quantity - 1)}>-</button>
        <span>{quantity}</span>
        <button onClick={() => changeQuantity(quantity + 1)}>+</button>
      </div>
      <div className={styles.buttons}>
        <ButtonControl color="secondary" onClick={handlePurchaseNow}>
          Mua ngay
        </ButtonControl>
        <ButtonControl variant="outlined" onClick={() => handleAddToCart()}>
          Thêm vào giỏ hàng
        </ButtonControl>
      </div>
      <ul className={styles.description}>
        {product.description !== "" &&
          product
            .getDescription()
            .map((text: string, index: number) => <li key={index}>{text}</li>)}
      </ul>
    </div>
  ) : null;
};

export default Right;
