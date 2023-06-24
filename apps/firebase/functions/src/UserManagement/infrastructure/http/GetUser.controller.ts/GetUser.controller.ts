import * as functions from "firebase-functions";
import {getUserCreator} from "../../../application/usecases/GetUser/GetUser";
import {userRepositoryCreator} from "../../database/User/UserRepository";
import {createDb} from "../../../../common/infrastructure/createDb";


const db = createDb();
const userRepository = userRepositoryCreator({db});
const getUserUseCase = getUserCreator({userRepository});

const GetUserController = functions.https.onRequest(async (req, res) => {
  const user = await getUserUseCase(req.body);
  res.json(user);
});

export {GetUserController};
