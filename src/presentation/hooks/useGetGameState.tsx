import { GetGameStateUseCase } from "@/domain/usecases/GetGameItemsUseCase";
import { useState } from "react";

export const useGetGameState = (getGameItemsUseCase: GetGameStateUseCase) => {
  const [loading, setLoading] = useState(false);

  const getGameItems = async () => {
    setLoading(true);
    const result = await getGameItemsUseCase.execute();
    setLoading(false);
    return result;
  };

  return { getGameItems, loading };
};
