import { Roboto } from "@next/font/google";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { Provider } from "react-redux";
import { Auth, ConfirmDialog, ScrollToTop, Snackbar } from "@/components";
import SocketWrapper from "@/context/SocketContext";
import ThemeWrapper from "@/context/ThemeContext";
import { wrapper } from "@/redux/store";
import "@/styles/_globals.scss";
import "swiper/css";
import "swiper/css/pagination";

const roboto = Roboto({
  weight: ["300", "400", "700", "500", "900"],
  style: ["normal", "italic"],
  subsets: ["latin", "vietnamese"],
});

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <SocketWrapper>
        <Auth>
          <ThemeWrapper>
            <ScrollToTop />
            <NextNProgress
              color="var(--blue)"
              startPosition={0.3}
              stopDelayMs={200}
              height={3}
              showOnShallow={true}
            />
            <div className={roboto.className}>
              <Component {...props.pageProps} />
            </div>
            <Snackbar />
            <ConfirmDialog />
          </ThemeWrapper>
        </Auth>
      </SocketWrapper>
    </Provider>
  );
}
export default App;
