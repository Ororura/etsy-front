import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  RawAxiosRequestHeaders,
} from "axios";
import { MessageType } from "../../types";
import { LogType } from "../../types/types";

const client = axios.create({
  baseURL: import.meta.env.VITE_SERVER,
});

const config: AxiosRequestConfig = {
  headers: {
    Accept: "application/json",
  } as RawAxiosRequestHeaders,
};


const logService = {
  createLog: async (log: LogType) => {
    try {
      const response: AxiosResponse<LogType> = await client.post(
        "/logs/create",
        log,
        config
      );
      return response;
    } catch (e) {
      console.error(e);
    }
  },
};

const messageService = {
  getMessage: async (room: string) => {
    try {
      const response: AxiosResponse<MessageType[]> = await client.get(
        `/get-messages/${room}`
      );
      return response.data;
    } catch (e) {
      console.error(e);
    }
  },
  sendMessage: async (data: MessageType) => {
    try {
      const response: AxiosResponse = await client.post("/send", data, config);
      return response;
    } catch (e) {
      console.error(e);
    }
  },
};

export { messageService, logService };
