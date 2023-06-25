import * as functions from "firebase-functions";

import {createDb} from "../../../../common/infrastructure/createDb";
import {finishGameCreator} from "../../../application/usecases/FinishGame/FinishGame";
import {gameInstanceRepositoryCreator} from "../../database/GameInstance/GameInstanceRepository";
import {userRepositoryCreator} from "../../database/UserRepository/UserRepository";


const db = createDb();
const userRepository = userRepositoryCreator({db});
const gameInstanceRepository = gameInstanceRepositoryCreator({db});
const finishGameUseCase = finishGameCreator({gameInstanceRepository, userRepository});

const FinishGameController = functions.https.onRequest(async (req, res) => {
  // TODO: validate input
  await finishGameUseCase(req.body);
  res.json({
    acknowledged: true,
  });
});

export {FinishGameController};
