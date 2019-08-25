import { NextPage } from "next";
import { Button } from "@material-ui/core";
import Link from "next/link";
import { download, Progress, finishDownload } from "../src/domain/youtube";

type Props = {
  status: Progress;
  id?: string;
};

const DlPage: NextPage<Props> = ({ id, status }) => {
  const renderStatus = () => {
    switch (status) {
      case "completed":
        return (
          <a href={`/static/${id}.mp4`} download>
            Click to download
          </a>
        );
      case "downloading":
        return (
          <div>
            <p>downloading</p>
            <a href={`/dl?id=${id}&finish=true`}>
              <Button>finish</Button>
            </a>
          </div>
        );
      case "fail":
        return <p>fail</p>;
    }
  };

  return (
    <div>
      <Link href={`/`}>
        <Button>Home</Button>
      </Link>
      {renderStatus()}
    </div>
  );
};

DlPage.getInitialProps = async ({ query }) => {
  let { id, finish } = query as any;

  if (finish && id) {
    await finishDownload(id);
    return { status: "completed", id };
  }

  if (id) {
    try {
      const status = await download(id);
      return { status, id };
    } catch (error) {
      return { status: "fail" };
    }
  } else return { status: "fail" };
};

export default DlPage;
