import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { Product, User } from "../utils/types";
import { logout as apiLogout, RegisterDTO } from "../apis/auth";
import { COOKIE_ACCESSTOKEN_NAME, MSG_SUCCESS } from "../utils/constants";
import { useSnackbarContext } from "./SnackbarContext";
import { setCookie, deleteCookie, hasCookie } from "cookies-next";
import jwtDecode from "jwt-decode";
import { getCart } from "../apis/order";
import { getFavoriteProducts } from "../apis/product";
import { useCartContext } from "./CartContext";
import { useWishlistContext } from "./WishlistContext";
const AuthContext = createContext<any>({});

type Props = {
  children?: ReactNode;
};

const AuthWrapper = ({ children }: Props) => {
  const { show } = useSnackbarContext();
  const [profile, setProfile] = useState<User | null>();
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const { setCart } = useCartContext();
  const { setListId } = useWishlistContext();

  const changeProfile = (newProfile: User | null) => {
    setProfile(newProfile);
    localStorage.setItem("user", JSON.stringify(newProfile));
  };
  const login = async (user: User, accessToken: string) => {
    if (accessToken && user) {
      setProfile(user);
      localStorage.setItem("user", JSON.stringify(user));
      let decoded: any = jwtDecode(accessToken);
      console.log(decoded.exp);
      setCookie(COOKIE_ACCESSTOKEN_NAME, accessToken, {
        maxAge: 6000,
      });
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
    if (!hasCookie(COOKIE_ACCESSTOKEN_NAME)) {
      setProfile(null);
    } else {
      const profile = JSON.parse(localStorage.getItem("user") || "null");
      setProfile(profile);
    }
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  return useContext(AuthContext);
}
export default AuthWrapper;
