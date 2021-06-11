import { NextSeo } from "next-seo";

export default function Home(): JSX.Element {
  return <NextSeo title="Home" />;
}

Home.auth = true;
