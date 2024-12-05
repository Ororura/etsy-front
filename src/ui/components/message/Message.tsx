import { FC, useEffect, useState } from "react";
import { useSubscription } from "react-stomp-hooks";
import { messageService } from "../../../services/api";
import { MessageType } from "../../../types";

type Props = {
  room: string | null;
};

const Message: FC<Props> = ({ room }) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  useEffect(() => {
    (async () => {
      if (room) {
        const response = await messageService.getMessage(room);
        if (response) {
          setMessages(response);
        }
      }
    })();
  }, [room]);
	
  useSubscription(`/topic/message/${room}`, (message) => {
    const response: MessageType = JSON.parse(message.body);
    setMessages([...messages, response]);
  });

  return (
    <div>
      <h2>Новое сообщение:</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            <p style={{ fontWeight: "bold" }}>{message.sender}</p>
            <span>{message.content}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { Message };
