import { AppError } from "@/domain/common/AppError";
import { Result } from "@/domain/common/Result";

export abstract class UseCase<In, Out> {
  protected abstract run(input: In): Promise<Out>;

  async execute(input: In): Promise<Result<Out>> {
    try {
      const data = await this.run(input);
      return Result.success(data);
    } catch (error: unknown) {
      if (error instanceof AppError) {
        return Result.failure(error);
      }

      const message = error instanceof Error ? error.message : "Unknown error";
      return Result.failure(AppError.unknownError(message, error));
    }
  }
}
