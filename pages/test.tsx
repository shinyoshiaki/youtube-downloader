import { NextPage } from "next";
import Link from "next/link";
import Layout from "../src/components/Layout";
import List from "../src/components/List";
import { User } from "../src/interfaces";
import { findAll } from "../src/utils/sample-api";

type Props = {
  items: User[];
  pathname: string;
};

const WithInitialProps: NextPage<Props> = ({ items, pathname }) => (
  <Layout title="List Example (as Functional Component) | Next.js + TypeScript Example">
    <h1>List Example (as Function Component)</h1>
    <p>You are currently on: {pathname}</p>
    <List items={items} />
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
    <a href="/static/dl.mp4" download>
      Click to download
    </a>
  </Layout>
);

WithInitialProps.getInitialProps = async ({ pathname }) => {
  const items: User[] = await findAll();
  const ytdl = await require("ytdl-core");
  const fs = await require("fs");
  const BASE_PATH = `https://www.youtube.com/watch?v=`;

  const youtubeId = `o_LsbDb_a2g`;
  const url = BASE_PATH + youtubeId;

  ytdl(url)
    .on("response", (res: any) => {
      console.log({ res });
    })
    .on("data", (data: Buffer) => {
      console.log({ data });
    })
    .pipe(fs.createWriteStream(`${youtubeId}.mp4`));

  fs.rename(`${youtubeId}.mp4`, `static/dl.mp4`, () => {});

  return { items, pathname };
};

export default WithInitialProps;
