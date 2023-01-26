import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { Roboto } from "@next/font/google";

import { Facebook, ScrollToTop } from "../components";
import AuthWrapper from "../context/AuthContext";
import CartWrapper from "../context/CartContext";
import GroupProductWrapper from "../context/GroupProductContext";
import SnackbarWrapper from "../context/SnackbarContext";
import SocketWrapper from "../context/SocketContext";
import WishlistWrapper from "../context/WishlistContext";
import "swiper/css";
import "swiper/css/pagination";
import "../styles/globals.css";
// EAAFZBavrYXXUBADQdpRUPXa4ZATs4x9KO7etoWCrgLUHwiCgFaiXqzneIj3shrEphnRljqJL9jGZAoyBA3rCu3PWYqtumJ39fvZALw4pSu013HCMXcmtJ54DYFvyYrRMbG5r7iR1SAseYRQN0ZBqXUiWCag5VgZC4nCniQFO6EG2VOg0qu3V39

const roboto = Roboto({
  weight: ["400", "700", "500", "900"],
  style: ["normal", "italic"],
  subsets: ["latin", "vietnamese"],
});

function App({ Component, pageProps }: AppProps) {
  return (
    <SocketWrapper>
      <SnackbarWrapper>
        <CartWrapper>
          <WishlistWrapper>
            <AuthWrapper>
              <GroupProductWrapper>
                <ScrollToTop />
                <NextNProgress
                  color="var(--blue)"
                  startPosition={0.3}
                  stopDelayMs={200}
                  height={3}
                  showOnShallow={true}
                />
                {/* <Facebook /> */}
                <div className={roboto.className}>
                  <Component {...pageProps} />
                </div>
              </GroupProductWrapper>
            </AuthWrapper>
          </WishlistWrapper>
        </CartWrapper>
      </SnackbarWrapper>
    </SocketWrapper>
  );
}
export default App;
