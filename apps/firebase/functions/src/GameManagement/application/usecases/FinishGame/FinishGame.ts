import {UseCase} from "../../../../common/domain/model/UseCase";
import {GameInstanceRepositoryInterface} from "../../../domain/infrastructure/persistence/GameInstanceRepositoryInterface";
import {UserRepositoryInterface} from "../../../domain/infrastructure/persistence/UserRepositoryInterface";
import {GameInstance} from "../../../domain/model/GameInstance";

type FinishGameRequest = Pick<GameInstance, "scoreboard" | "id">;
type FinishGameResponse = void;
type FinishGameUseCase = UseCase<FinishGameRequest, FinishGameResponse>;

type FinishGameDependencies = {
    gameInstanceRepository: GameInstanceRepositoryInterface;
    userRepository: UserRepositoryInterface;
};

const finishGameCreator =
    ({
      gameInstanceRepository,
      userRepository,
    }: FinishGameDependencies): FinishGameUseCase =>
      async (request: FinishGameRequest) => {
        const {scoreboard, id} = request;

        if (!scoreboard) {
          throw new Error("no scoreboard !");
        }

        await gameInstanceRepository.finish(id, scoreboard);

        const {players, pointsModifiers} = await gameInstanceRepository.get(
            id
        );

        for (const userId of Object.keys(players)) {
          await userRepository.updateGameStatus({
            userId,
            gameId: id,
            status: "finished",
            rank: scoreboard[userId],
            points: pointsModifiers[scoreboard[userId]],
          });
        }
      };

export type {FinishGameRequest, FinishGameResponse, FinishGameUseCase};
export {finishGameCreator};

