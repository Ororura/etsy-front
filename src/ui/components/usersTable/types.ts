type UserType = {
  user_id: number;
  hwid: string;
  pdfmaker: boolean;
  parser: boolean;
  sender: boolean;
  extra_parser: boolean;
};

// Определение для строк данных
type UserRowsType = UserType & { isNew?: boolean };

export type { UserType, UserRowsType };
