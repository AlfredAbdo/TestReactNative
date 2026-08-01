import { GameItemState } from "../entities/GameItemState";
import { GameRepository } from "../entities/GameRepository";
import { UseCase } from "./base/UseCase";

export class GetGameStateUseCase extends UseCase<void, GameItemState[]> {
  private repo: GameRepository;

  constructor(repo: GameRepository) {
    super();
    this.repo = repo;
  }

  protected async run(): Promise<GameItemState[]> {
    return await this.repo.getGameState();
  }
}
