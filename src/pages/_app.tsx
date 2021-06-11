import { Layout } from "@/components";
import { SEO } from "@/constants/seo-constants";
import ProgressBar from "@badrap/bar-of-progress";
import { Provider, signIn, useSession } from "next-auth/client";
import { DefaultSeo } from "next-seo";
import Router from "next/router";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import type { AppProps } from "next/app";
import type { WithChildren } from "src/interfaces/common-props";

import "tailwindcss/tailwind.css";
import "@/styles/globals.css";

const progress = new ProgressBar({
  size: 2,
  color: "#22D3EE",
  className: "bar-of-progress",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", () => {
  progress.finish();
  window.scrollTo(0, 0);
});
Router.events.on("routeChangeError", progress.finish);

const {
  DEFAULT_TITLE_TEMPLATE,
  DEFAULT_DESCRIPTION,
  DEFAULT_CANONICAL,
  SITE_NAME,
  DEFAULT_TITLE,
  DEFAULT_OG_IMAGE,
  TWITTER_HANDLE,
  FAVICON_LINK,
} = SEO;

const queryClient = new QueryClient();

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
  const canonicalPath = router.pathname === "/" ? "" : router.pathname;
  const url = `${DEFAULT_CANONICAL}${canonicalPath}`;

  function Auth({ children }: WithChildren) {
    const [session, loading] = useSession();
    const isUser = !!session?.user;
    React.useEffect(() => {
      if (loading) {
        return;
      }
      if (!isUser) {
        void signIn();
      }
    }, [isUser, loading]);

    if (isUser) {
      return children as never;
    }

    return <div>Loading...</div>;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const componentHasAuth = (Component as any).auth;

  return (
    <>
      <DefaultSeo
        title={DEFAULT_TITLE}
        titleTemplate={DEFAULT_TITLE_TEMPLATE}
        description={DEFAULT_DESCRIPTION}
        canonical={url}
        openGraph={{
          type: "website",
          locale: "en_US",
          url,
          site_name: SITE_NAME,
          title: SITE_NAME,
          description: DEFAULT_DESCRIPTION,
          images: [
            {
              url: DEFAULT_OG_IMAGE,
              alt: SITE_NAME,
            },
          ],
        }}
        twitter={{
          handle: TWITTER_HANDLE,
          site: TWITTER_HANDLE,
          cardType: "summary_large_image",
        }}
        additionalLinkTags={[
          {
            rel: "shortcut icon",
            href: FAVICON_LINK,
          },
        ]}
      />
      <QueryClientProvider client={queryClient}>
        <Provider session={pageProps.session}>
          {componentHasAuth ? (
            <Auth>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}

          <ReactQueryDevtools initialIsOpen={false} />
        </Provider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
