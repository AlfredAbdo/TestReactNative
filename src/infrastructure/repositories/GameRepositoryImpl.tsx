import { GameItem } from "@/domain/entities/GameItem";
import { createGameItemState, GameItemState } from "@/domain/entities/GameItemState";
import { GameRepository } from "@/domain/entities/GameRepository";

export default class GameRepositoryImpl implements GameRepository {
  async getGameState(): Promise<GameItemState[]> {
    return items.map((item) => {
      return createGameItemState(item);
    });
  }
}

const items: GameItem[] = [
  {
    id: "0",
    title: "Item 0",
    description: "Testing very fast interval (to be removed)",
    baseFillRateMs: 100,
    baseGain: 0.5,
  },
  {
    id: "1",
    title: "Item 1",
    description: "Item 1 description",
    baseFillRateMs: 2 * 1_000,
    baseGain: 10.0,
  },
  {
    id: "2",
    title: "Item 2",
    description: "Item 2 description",
    baseFillRateMs: 5 * 1_000,
    baseGain: 90.0,
    unlockAmount: 100.0,
  },
  {
    id: "3",
    title: "Item 3",
    description: "Item 3 description",
    baseFillRateMs: 30 * 1_000,
    baseGain: 500.0,
    unlockAmount: 500.0,
  },
  {
    id: "4",
    title: "Item 4",
    description: "Item 4 description",
    baseFillRateMs: 2 * 60 * 1_000,
    baseGain: 2_000.0,
    unlockAmount: 3_000.0,
  },
  {
    id: "5",
    title: "Item 5",
    description: "Item 5 description",
    baseFillRateMs: 10 * 60 * 1_000,
    baseGain: 10_000.0,
    unlockAmount: 20_000.0,
  },
];
