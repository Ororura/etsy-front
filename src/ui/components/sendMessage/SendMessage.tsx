import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MessageType } from "../../../types";
import { messageService } from "../../../services/api";
import { Message } from "../message";

const SendMessage: FC = () => {
  const { register, handleSubmit } = useForm<MessageType>();

  const handlerSendMessage: SubmitHandler<MessageType> = async (data) => {
    console.log(data.message);
    await messageService.sendMessage(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handlerSendMessage)}>
        <input placeholder="Введите сообщение" {...register("message")} />
        <input placeholder="Введите telegramId" {...register("telegramId")} />
        <input placeholder="Введите user" {...register("user")} />
        <input type="submit" />
      </form>
      <Message />
    </div>
  );
};

export { SendMessage };
