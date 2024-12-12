import { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MessageType } from "../../../types";
import { Message } from "../message";
import { useStompClient } from "react-stomp-hooks";
import { CreateLog } from "../createLog";

type Props = {
  url: string | null;
};

const SendMessage: FC<Props> = ({ url }) => {
  const { register, handleSubmit } = useForm<MessageType>();

  useEffect(() => {
    console.log(import.meta.env.VITE_SERVER);
  }, [url]);

  const stompClient = useStompClient();

  const handlerSendMessage: SubmitHandler<MessageType> = async (data) => {
    data.type = "WEB";
    if (url != null) {
      data.room = url;
    }
    const payload = JSON.stringify(data);
    if (stompClient) {
      stompClient.publish({ destination: `/app/send/${url}`, body: payload });
    }
  };

  return (
    <div>
      <h1>Номер комнаты: {url}</h1>
      {url && <CreateLog url={url} />}
      <form onSubmit={handleSubmit(handlerSendMessage)}>
        <input placeholder="Введите сообщение" {...register("content")} />
        <input type="submit" />
      </form>
      <Message room={url} />
    </div>
  );
};

export { SendMessage };
