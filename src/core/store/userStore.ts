import { Store } from '@tanstack/react-store';

type UserStore = {
  user_id: number;
  hwid: string;
  pdfmaker: boolean;
  parser: boolean;
  sender: boolean;
  extra_parser: boolean;
};

type UserRowsType = UserStore & { isNew?: boolean };

const userStore = new Store({
  users: [] as UserRowsType[],
});

export { userStore };
