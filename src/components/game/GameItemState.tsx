import { GameItem } from "./GameItem";

export type GameItemState = {
  item: GameItem;
  progress: number;
};

export function createGameItemState(item: GameItem): GameItemState {
  return {
    item: item,
    progress: 0,
  };
}
