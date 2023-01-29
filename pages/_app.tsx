import { Roboto } from "@next/font/google";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { Provider } from "react-redux";

import "swiper/css";
import "swiper/css/pagination";
import { Auth, ScrollToTop, Snackbar } from "../components";
import SocketWrapper from "../context/SocketContext";
import { wrapper } from "../redux/store";
import "../styles/globals.css";
// EAAFZBavrYXXUBADQdpRUPXa4ZATs4x9KO7etoWCrgLUHwiCgFaiXqzneIj3shrEphnRljqJL9jGZAoyBA3rCu3PWYqtumJ39fvZALw4pSu013HCMXcmtJ54DYFvyYrRMbG5r7iR1SAseYRQN0ZBqXUiWCag5VgZC4nCniQFO6EG2VOg0qu3V39

const roboto = Roboto({
  weight: ["400", "700", "500", "900"],
  style: ["normal", "italic"],
  subsets: ["latin", "vietnamese"],
});

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <SocketWrapper>
        <Auth>
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
            <Component {...props.pageProps} />
          </div>
          <Snackbar />
        </Auth>
      </SocketWrapper>
    </Provider>
  );
}
export default App;
