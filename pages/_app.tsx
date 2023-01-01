import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import "swiper/css";
import "swiper/css/pagination";
import { Facebook, ScrollToTop } from "../components";
import AuthWrapper from "../context/AuthContext";
import CartWrapper from "../context/CartContext";
import GroupProductWrapper from "../context/GroupProductContext";
import SnackbarWrapper from "../context/SnackbarContext";
import WishlistWrapper from "../context/WishlistContext";
import "../styles/globals.css";
// EAAFZBavrYXXUBADQdpRUPXa4ZATs4x9KO7etoWCrgLUHwiCgFaiXqzneIj3shrEphnRljqJL9jGZAoyBA3rCu3PWYqtumJ39fvZALw4pSu013HCMXcmtJ54DYFvyYrRMbG5r7iR1SAseYRQN0ZBqXUiWCag5VgZC4nCniQFO6EG2VOg0qu3V39
function App({ Component, pageProps }: AppProps) {
  return (
    <SnackbarWrapper>
      <CartWrapper>
        <WishlistWrapper>
          <AuthWrapper>
            <GroupProductWrapper>
              <ScrollToTop />
              <NextNProgress
                color="var(--primary-color)"
                startPosition={0.3}
                stopDelayMs={200}
                height={3}
                showOnShallow={true}
              />
              {/* <Facebook /> */}
              <Component {...pageProps} />
            </GroupProductWrapper>
          </AuthWrapper>
        </WishlistWrapper>
      </CartWrapper>
    </SnackbarWrapper>
  );
}
export default App;
