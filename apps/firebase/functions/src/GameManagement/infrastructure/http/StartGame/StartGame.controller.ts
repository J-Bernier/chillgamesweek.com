import * as functions from "firebase-functions";

import {createDb} from "../../../../common/infrastructure/createDb";
import {startGameCreator} from "../../../application/usecases/StartGame/StartGame";
import {gameInstanceRepositoryCreator} from "../../database/GameInstance/GameInstanceRepository";
import {userRepositoryCreator} from "../../database/UserRepository/UserRepository";


const db = createDb();
const userRepository = userRepositoryCreator({db});
const gameInstanceRepository = gameInstanceRepositoryCreator({db});
const startGameUseCase = startGameCreator({gameInstanceRepository, userRepository});

const StartGameController = functions.https.onRequest(async (req, res) => {
  // TODO: validate input
  const gameId = await startGameUseCase(req.body);
  res.json({
    gameId,
  });
});

export {StartGameController};
