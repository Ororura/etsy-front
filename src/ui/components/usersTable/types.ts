type UserType = {
  user_id: number;
  hwid: string;
  pdfmaker: boolean;
  parser: boolean;
  sender: boolean;
  extra_parser: boolean;
	subito: boolean;
};

type UserRowsType = UserType & { isNew?: boolean };

type DeleteUserType = {
  user_id: number;
};

type CreateUserType = {
  telegram_id: number;
};

type UpdateChance = {
  chance: number;
};

export type { UserType, UserRowsType, DeleteUserType, CreateUserType, UpdateChance };
