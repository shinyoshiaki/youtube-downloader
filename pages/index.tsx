import { NextPage, NextPageContext } from "next";
import { Button, Input } from "@material-ui/core";
import useInput from "../src/hooks/useInput";
import Link from "next/link";

type Props = {} | NextPageContext;

const IndexPage: NextPage<Props> = () => {
  const [target, settarget] = useInput();

  return (
    <div>
      <Input onChange={settarget} value={target} />
      <Link href={`/?id=${target}`}>
        <Button>get</Button>
      </Link>
      <a href="/static/com.oculus.vrshell-20190724-210551.mp4" download>
        Click to download
      </a>
    </div>
  );
};

IndexPage.getInitialProps = async ({ query }) => {
  const { id } = query;

  if (id) {
    console.log({ id });
  }

  return { query };
};

export default IndexPage;
