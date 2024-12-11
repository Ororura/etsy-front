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

type UpdateLink = {
  link?: string;
  status: boolean;
};

export type { MessageType, LogType, UpdateLink };
