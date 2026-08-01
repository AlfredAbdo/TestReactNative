import { GameItemState } from "./GameItemState";

export interface GameRepository {
  getGameState(): Promise<GameItemState[]>;
}
