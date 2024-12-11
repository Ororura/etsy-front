type MessageType = {
  content: string;
  type: string;
  sender: string;
  room: string;
  url: string | null;
};

type LogType = {
  link: string;
};

export type { MessageType, LogType };
