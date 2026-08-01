import { GameRepository } from "@/domain/entities/GameRepository";
import { GetGameStateUseCase } from "@/domain/usecases/GetGameItemsUseCase";
import GameRepositoryImpl from "@/infrastructure/repositories/GameRepositoryImpl";

const gameRepository: GameRepository = new GameRepositoryImpl();

export const getGameStateUseCase = new GetGameStateUseCase(gameRepository);
