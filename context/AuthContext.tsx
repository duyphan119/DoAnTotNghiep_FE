import { deleteCookie, setCookie } from "cookies-next";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getProfile } from "../apis/auth";
import { getCart } from "../apis/order";
import { getFavoriteProducts } from "../apis/product";
import { ModalAuth } from "../components";
import {
  COOKIE_ACCESSTOKEN_NAME,
  COOKIE_USER_ID,
  MSG_SUCCESS,
} from "../utils/constants";
import { Product, User } from "../utils/types";
import { useCartContext } from "./CartContext";
import { useSnackbarContext } from "./SnackbarContext";
import { useWishlistContext } from "./WishlistContext";
const AuthContext = createContext<any>({});

type Props = {
  children?: ReactNode;
};

const AuthWrapper = ({ children }: Props) => {
  const { show } = useSnackbarContext();
  const [profile, setProfile] = useState<User | null>();
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { setCart } = useCartContext();
  const { setListId } = useWishlistContext();

  const changeProfile = (newProfile: User | null) => {
    setProfile(newProfile);
    localStorage.setItem("user", JSON.stringify(newProfile));
  };
  const login = async (user: User, accessToken: string) => {
    if (accessToken && user) {
      setCookie(COOKIE_USER_ID, user.id);
      setProfile(user);
      localStorage.setItem("user", JSON.stringify(user));
      setCookie(COOKIE_ACCESSTOKEN_NAME, accessToken);
      show("Đăng nhập thành công", "success");
      try {
        let [resCart, resWishlist] = await Promise.all([
          getCart(),
          getFavoriteProducts(),
        ]);
        let { message: msg1, data: data1 } = resCart;
        if (msg1 === MSG_SUCCESS) {
          setCart(data1.items ? data1 : { ...data1, items: [] });
        }

        let { message: msg2, data: data2 } = resWishlist;
        if (msg2 === MSG_SUCCESS) {
          setListId(data2.items.map((prod: Product) => prod.id));
        }
      } catch (error) {
        console.log("GET CART & WISHLIST ERROR: ", error);
      }
    }
  };
  const register = (user: User, accessToken: string) => {
    login(user, accessToken);
  };
  const logout = async () => {
    setProfile(null);
    localStorage.removeItem("user");
    deleteCookie(COOKIE_ACCESSTOKEN_NAME);
    setCart({ items: [] });
    setListId([]);
  };

  useEffect(() => {
    // const abortController = new AbortController();
    const checkLogged = async () => {
      try {
        // const { message, data } = await getProfile(abortController.signal);
        const { message, data } = await getProfile();
        console.log("FETCH profile:::", data);
        if (message === MSG_SUCCESS) {
          setProfile(data);
        }
      } catch (error) {
        console.log("CHECK LOGGED ERROR", error);
      }
      setLoading(false);
    };
    checkLogged();
    // return () => abortController.abort();
  }, []);

  useEffect(() => {
    setIsLogged(profile ? true : false);
  }, [profile]);

  return (
    <AuthContext.Provider
      value={{
        profile,
        changeProfile,
        login,
        logout,
        register,
        isLogged,
        setOpenModal: setOpen,
        loading,
      }}
    >
      {children}
      {open ? <ModalAuth open={open} onClose={() => setOpen(false)} /> : null}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  return useContext(AuthContext);
}
export default AuthWrapper;
