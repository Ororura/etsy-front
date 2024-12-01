import { FC, useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const Message: FC = () => {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to socket server.");
    });

    socket.on("new_message", (data: { message: string }) => {
      console.log("New message received:", data.message);
      setMessages((prevMessages) => [...prevMessages, data.message]);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server.");
    });

    return () => {
      socket.off("new_message");
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return (
    <div>
      <h2>Новое сообщение:</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export { Message };
