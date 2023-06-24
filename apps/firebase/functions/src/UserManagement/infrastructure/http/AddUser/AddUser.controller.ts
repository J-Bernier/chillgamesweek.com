import * as functions from "firebase-functions";
import {addUserCreator} from "../../../application/usecases/AddUser/AddUser";
import {userRepositoryCreator} from "../../database/User/UserRepository";
import {createDb} from "../../../../common/infrastructure/createDb";


const db = createDb();
const userRepository = userRepositoryCreator({db});
const addUserUseCase = addUserCreator({userRepository});

const AddUserController = functions.https.onRequest(async (req, res) => {
  // TODO: validate input
  await addUserUseCase(req.body);
  res.json({
    acknowledged: true,
  });
});

export {AddUserController};
