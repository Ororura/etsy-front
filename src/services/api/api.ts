import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  RawAxiosRequestHeaders,
} from "axios";
import { MessageType } from "../../types";

const client = axios.create({
  baseURL: "http://localhost:8080",
});

const config: AxiosRequestConfig = {
  headers: {
    Accept: "application/json",
  } as RawAxiosRequestHeaders,
};

const messageService = {
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
