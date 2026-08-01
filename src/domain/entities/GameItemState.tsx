import { GameItem } from "./GameItem";

export type GameItemState = {
  item: GameItem;
  level: number;
  progress: number;
  fillRateMs: number;
  gain: number;
  unlocked?: boolean;
  upgradeCost: number;
};

export function createGameItemState(item: GameItem): GameItemState {
  return {
    item: item,
    level: 1,
    progress: 0,
    fillRateMs: item.baseFillRateMs,
    gain: item.baseGain,
    unlocked: item.unlockAmount === undefined || item.unlockAmount <= 0,
    upgradeCost: item.baseUpgradeCost,
  };
}
