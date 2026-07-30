import { GameItem } from "./GameItem";

export type GameItemState = {
  item: GameItem;
  progress: number;
  //...
  unlocked?: boolean;
  //...
};

export function createGameItemState(item: GameItem): GameItemState {
  return {
    item: item,
    progress: 0,
    unlocked: item.unlockAmount === undefined || item.unlockAmount <= 0,
  };
}
