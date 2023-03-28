import { OrderItemModel } from "@/models";
import { cartActions } from "@/redux/slice/cartSlice";
import { useAppDispatch } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import styles from "./_style.module.scss";
import { publicRoutes } from "@/utils/routes";
import { memo } from "react";
import { useDefaultLayoutContext } from "@/context/DefaultLayoutContext";

type Props = {
  item: OrderItemModel;
};

const CartItem = ({ item }: Props) => {
  const appDispatch = useAppDispatch();
  const { profile } = useDefaultLayoutContext();

  const handleUpdateItem = (newQuantity: number) => {
    if (profile.id > 0) {
      if (newQuantity < 1) {
        appDispatch(cartActions.fetchDeleteCartItem(item.id));
      } else {
        appDispatch(
          cartActions.fetchUpdateCartItem({ id: item.id, newQuantity })
        );
      }
    } else {
      if (newQuantity < 1) {
        appDispatch(cartActions.deleteCartItemPv(item.productVariantId));
      } else {
        appDispatch(cartActions.updateCartItem({ id: item.id, newQuantity }));
      }
    }
  };

  const handleDeleteItem = () => {
    if (profile.id > 0) {
      appDispatch(cartActions.fetchDeleteCartItem(item.id));
    } else {
      appDispatch(cartActions.deleteCartItemPv(item.productVariantId));
    }
  };

  const price = item ? item.getTotalPrice() : 0;

  return (
    <tr>
      <td>
        <div className={styles["td-product"]}>
          <IconButton color="error" onClick={handleDeleteItem}>
            <DeleteOutlineIcon />
          </IconButton>
          <div>
            <Image
              width={72}
              height={72}
              priority={true}
              alt=""
              src={item.getThumbnail()}
            />
          </div>
          <div>
            <Link
              href={publicRoutes.productDetail(
                `${item.productVariant.product.slug}`
              )}
            >
              {item.productVariant.product.name}
            </Link>
            {item.productVariant.id > 0 ? (
              <div className={styles.variant}>{item.productVariant.name}</div>
            ) : null}
          </div>
        </div>
      </td>
      <td>{item.price}</td>
      <td>
        <div className={styles["quantity-wrapper"]}>
          <div>{item.price}</div>
          <div className={styles.quantity}>
            <button
              className={styles.inc}
              onClick={() => handleUpdateItem(item.quantity - 1)}
            >
              -
            </button>
            {item.quantity}
            <button
              className={styles.desc}
              onClick={() => handleUpdateItem(item.quantity + 1)}
            >
              +
            </button>
          </div>
          <div>{price}</div>
        </div>
      </td>
      <td>{price}</td>
    </tr>
  );
};

export default memo(CartItem);
