import * as functions from "firebase-functions";

import {createDb} from "../../../../common/infrastructure/createDb";
import {getUserCreator, GetUserRequest} from "../../../application/usecases/GetUser/GetUser";
import {userRepositoryCreator} from "../../database/User/UserRepository";


const db = createDb();
const userRepository = userRepositoryCreator({db});
const getUserUseCase = getUserCreator({userRepository});

const GetUserController = functions.https.onRequest(async (req, res) => {
  const query = req.query;
  const user = await getUserUseCase(query as GetUserRequest);
  res.json(user);
});

export {GetUserController};
