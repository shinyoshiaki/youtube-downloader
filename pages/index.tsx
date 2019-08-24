import { NextPage } from "next";
import { Button, Input } from "@material-ui/core";
import useInput from "../src/hooks/useInput";
// import Link from "next/link";

type Props = {};

const IndexPage: NextPage<Props> = () => {
  const [target, settarget] = useInput();

  return (
    <div>
      <Input onChange={settarget} value={target} placeholder="video id" />
      <a href={`/dl?id=${target}`}>
        <Button>get</Button>
      </a>
    </div>
  );
};

export default IndexPage;
