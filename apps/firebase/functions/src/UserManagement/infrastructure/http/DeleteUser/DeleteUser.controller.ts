import * as functions from "firebase-functions";
import {deleteUserCreator} from "../../../application/usecases/DeleteUser/DeleteUser";
import {userRepositoryCreator} from "../../database/User/UserRepository";
import {createDb} from "../../../../common/infrastructure/createDb";


const db = createDb();
const userRepository = userRepositoryCreator({db});
const deleteUserUseCase = deleteUserCreator({userRepository});

const DeleteUserController = functions.https.onRequest(async (req, res) => {
  await deleteUserUseCase(req.body);
  res.json({
    acknowledged: true,
  });
});

export {DeleteUserController};
