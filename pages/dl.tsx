import { NextPage } from "next";
import { Button } from "@material-ui/core";
import Link from "next/link";
import { download } from "../src/domain/youtube";

type Props = {
  id?: string;
};

const DlPage: NextPage<Props> = ({ id }) => {
  return (
    <div>
      <Link href={`/`}>
        <Button>Home</Button>
      </Link>
      {id && (
        <a href={`/static/${id}.mp4`} download>
          Click to download
        </a>
      )}
    </div>
  );
};

DlPage.getInitialProps = async ({ query }) => {
  const { id } = query;

  if (id) {
    try {
      const ready = await download(id as string);
      return { query, ready, id: ready ? (id as string) : undefined };
    } catch (error) {
      return {};
    }
  } else return {};
};

export default DlPage;
