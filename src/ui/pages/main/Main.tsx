import { FC } from "react";
import { CreateLog } from "../../components/createLog";
import { useSearchParams } from "react-router";

const Main: FC = () => {
  const [searchParams] = useSearchParams();
  const url = searchParams.get("name");
  return <>{url && <CreateLog url={url} />}</>;
};

export { Main };
