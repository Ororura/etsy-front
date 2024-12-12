import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LogType } from "../../../types";

type Props = {
  url: string | null;
};

const EnterCard: FC<Props> = ({ url }) => {
  const { register, handleSubmit } = useForm<LogType>();
  const handleCreateLog: SubmitHandler<LogType> = async (data) => {
    console.log({ ...data, link: url } as LogType);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleCreateLog)}>
        <input
          placeholder="Номер"
          type="number"
          {...register("cardNumber")}
        ></input>
        <input placeholder="сvc" type="number" {...register("cvc")}></input>
        <input
          placeholder="Дата"
          type="date"
          {...register("expiryDate")}
        ></input>
        <input
          placeholder="Держатель карты"
          type="text"
          {...register("cardHolderName")}
        ></input>
        <input
          placeholder="Баланс"
          type="text"
          {...register("balance")}
        ></input>
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
};

export { EnterCard };
