import { FC, useEffect } from "react";
import { CreateLog } from "../../components/createLog";
import { useSearchParams } from "react-router";
import { linkService } from "../../../services/api";

const Main: FC = () => {
  const [searchParams] = useSearchParams();
  const url = searchParams.get("name");

  useEffect(() => {
    const updateStatusOnLoad = async () => {
      if (url) {
        try {
          await linkService.updateStatus({ link: url, status: true });
        } catch (error) {
          console.error("Ошибка при обновлении статуса (загрузка):", error);
        }
      }
    };

    const handleBeforeUnload = () => {
      if (url) {
        try {
          const payload = JSON.stringify({ link: url, status: false });
          navigator.sendBeacon("/api/updateStatus", payload);
        } catch (error) {
          console.error("Ошибка при обновлении статуса (закрытие):", error);
        }
      }
    };

    // Отправляем статус true при загрузке
    updateStatusOnLoad();

    // Добавляем слушатель для закрытия страницы
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      // Удаляем слушатель
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [url]);

  return <>{url && <CreateLog url={url} />}</>;
};

export { Main };
