import { useSearchParams } from "react-router";
import { EnterCard } from "../../components/enterCard";
import { SendMessage } from "../../components/sendMessage";
import { FC } from "react";

const Support: FC = () => {
  const [searchParams] = useSearchParams();
  const url = searchParams.get("name");
  return (
    <>
      <EnterCard url={url} />
      <SendMessage url={url} />
    </>
  );
};

export { Support };
