import {randomUUID} from "crypto";
import {UseCase} from "../../../../common/domain/model/UseCase";
import {GameInstanceRepositoryInterface} from "../../../domain/infrastructure/persistence/GameInstanceRepositoryInterface";
import {UserRepositoryInterface} from "../../../domain/infrastructure/persistence/UserRepositoryInterface";
import {GameInstance} from "../../../domain/model/GameInstance";

type StartGameRequest = Omit<GameInstance, "scoreboard" | "id">;
type StartGameResponse = string;
type StartGameUseCase = UseCase<StartGameRequest, StartGameResponse>;

type StartGameDependencies = {
    gameInstanceRepository: GameInstanceRepositoryInterface;
    userRepository: UserRepositoryInterface;
};

const startGameCreator =
    ({gameInstanceRepository, userRepository}: StartGameDependencies): StartGameUseCase =>
      async (request: StartGameRequest) => {
        const gameToCreate = request;

        const id = randomUUID();

        await gameInstanceRepository.save({
          ...gameToCreate,
          id,
        });

        for (const userId of Object.keys(gameToCreate.players)) {
          await userRepository.addGame(userId, id);
        }

        return id;
      };

export type {StartGameRequest, StartGameResponse, StartGameUseCase};
export {startGameCreator};

