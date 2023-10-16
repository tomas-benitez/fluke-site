import "@/styles/fonts/lucida-sans.css";
import "../styles/scss/bootstrap.scss";
import "../styles/scss/index.scss";
import "../styles/scss/utilities.scss";
import "../styles/globals.css";
import SSRProvider from "react-bootstrap/SSRProvider";
import { AppContextProvider } from "src/context";
import { QueryClient, QueryClientProvider } from "react-query";
import { DefaultSeo } from "next-seo";
import { MotionConfig } from "framer-motion";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <MotionConfig reducedMotion="user">
      <SSRProvider>
        <QueryClientProvider client={queryClient}>
          <AppContextProvider>
            <DefaultSeo
              openGraph={{
                type: "website",
                locale: "es_AR",
                url: "https://fluke.com.ar",
                site_name: "Fluke Argentina",
                images: [
                  {
                    url: "https://fluke.com.ar/logo/fluke.jpg",
                    width: 200,
                    height: 58,
                    alt: "Logo de Fluke Corporation",
                  },
                ],
              }}
              twitter={{
                handle: "@FlukeCorp",
                site: "@FlukeCorp",
                cardType: "summary_large_image",
              }}
              title="Fluke Argentina"
            />
            <Component {...pageProps} />
          </AppContextProvider>
        </QueryClientProvider>
      </SSRProvider>
    </MotionConfig>
  );
}

export default MyApp;
