import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  RawAxiosRequestHeaders,
} from "axios";
import { MessageType } from "../../types";

const client = axios.create({
  baseURL: "http://62.60.237.82:8080",
});

const config: AxiosRequestConfig = {
  headers: {
    Accept: "application/json",
  } as RawAxiosRequestHeaders,
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

export { messageService };
