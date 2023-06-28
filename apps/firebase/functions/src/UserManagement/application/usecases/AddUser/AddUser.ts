import {UseCase} from "../../../../common/domain/model/UseCase";
import {User} from "../../../domain/model/User";
import {UserRepositoryInterface} from "../../../domain/persistence/UserRepository.interface";

type AddUserRequest = User;
type AddUserResponse = boolean;
type AddUserUseCase = UseCase<AddUserRequest, AddUserResponse>;

type AddUserDependencies = {
  userRepository: UserRepositoryInterface;
};

const addUserCreator = ({userRepository}: AddUserDependencies): AddUserUseCase => async (request: AddUserRequest) => {
  const userToAdd = request;

  await userRepository.save({
    ...userToAdd,
    inGame: false,
    games: {},
  });

  return true;
};


export type {AddUserRequest, AddUserResponse, AddUserUseCase};
export {addUserCreator};
