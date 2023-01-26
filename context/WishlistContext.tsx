import { hasCookie } from "cookies-next";
import { createKey } from "next/dist/shared/lib/router/router";
import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import {
  createFavoriteProduct,
  deleteFavoriteProduct,
  getFavoriteProducts,
} from "../apis/product";
import { COOKIE_ACCESSTOKEN_NAME, MSG_SUCCESS } from "../utils/constants";
import { Product } from "../utils/types";
import { useSnackbarContext } from "./SnackbarContext";
type Props = Partial<{
  children: ReactNode;
}>;
const WishlistContext = createContext({} as any);

const WishlistWrapper = (props: Props) => {
  const [listId, setListId] = useState<Array<number>>([]);
  const { show } = useSnackbarContext();

  useEffect(() => {
    (async () => {
      try {
        if (hasCookie(COOKIE_ACCESSTOKEN_NAME)) {
          const { message, data } = await getFavoriteProducts();
          if (message === MSG_SUCCESS) {
            setListId(data.items.map((prod: Product) => prod.id));
          }
        }
      } catch (error) {
        console.log("GET WISHLIST ERROR", error);
      }
    })();
  }, []);

  const addToWishlist = async (productId: number) => {
    try {
      const { message } = await createFavoriteProduct(productId);
      if (message === MSG_SUCCESS) {
        setListId((p) => [...p, productId]);
        show("Sản phẩm đã được thêm vào danh sách yêu thích", "success");
      }
    } catch (error) {
      console.log(error);
      show("Đã có lỗi xảy ra, vui lòng thử lại", "error");
    }
  };

  const deleteItem = async (productId: number) => {
    try {
      const { message } = await deleteFavoriteProduct(productId);
      if (message === MSG_SUCCESS) {
        setListId((p) => p.filter((id: number) => id !== productId));
        show("Sản phẩm đã được xóa khỏi danh sách yêu thích", "success");
      }
    } catch (error) {
      console.log(error);
      show("Đã có lỗi xảy ra, vui lòng thử lại", "error");
    }
  };

  return (
    <WishlistContext.Provider
      value={{ listId, addToWishlist, deleteItem, setListId }}
    >
      {props.children}
    </WishlistContext.Provider>
  );
};
export function useWishlistContext() {
  return useContext(WishlistContext);
}
export default WishlistWrapper;
