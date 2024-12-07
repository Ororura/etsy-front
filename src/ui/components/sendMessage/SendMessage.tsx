import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MessageType } from "../../../types";
import { Message } from "../message";
import { useStompClient } from "react-stomp-hooks";

const SendMessage: FC = () => {
  const { register, handleSubmit } = useForm<MessageType>();
  const [room, setRoom] = useState<string | null>(null);
  const stompClient = useStompClient();

  const handlerSendMessage: SubmitHandler<MessageType> = async (data) => {
    data.type = "WEB";
		data.sender = "USER";
		
    if (room != null) {
      data.room = room;
    }
    const payload = JSON.stringify(data);
    if (stompClient) {
      stompClient.publish({ destination: `/app/send/${room}`, body: payload });
    }
  };

  return (
    <div>
      <h1>Номер комнаты: {room}</h1>
      <input
        type="number"
        placeholder="Введите номер комнаты"
        onChange={(e) => {
          setRoom(e.currentTarget.value);
        }}
      />
      <form onSubmit={handleSubmit(handlerSendMessage)}>
        <input placeholder="Введите сообщение" {...register("content")} />
        <input placeholder="Введите отправителя" {...register("sender")} />
        <input type="submit" />
      </form>
      <Message room={room} />
    </div>
  );
};

export { SendMessage };
