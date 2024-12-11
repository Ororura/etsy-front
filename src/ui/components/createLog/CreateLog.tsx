import { FC } from "react";
import { logService } from "../../../services/api/api";

type Props = {
  url: string;
};

const CreateLog: FC<Props> = ({ url }) => {
  const handlerCreateLog = async () => {
    const response = await logService.createLog({ link: url });
    console.log(response);
  };
  return (
    <div>
      <div onClick={handlerCreateLog}>Test</div>
    </div>
  );
};

export { CreateLog };
