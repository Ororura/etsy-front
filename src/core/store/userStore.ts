import { Store } from '@tanstack/react-store';

type UserStore = {
  users: {
    user_id: number;
    hwid: string;
    pdfmaker: boolean;
    parser: boolean;
    sender: boolean;
    extra_parser: boolean;
  }[];
};

const userStore = new Store<UserStore>({
  users: [],
});

export { userStore };
