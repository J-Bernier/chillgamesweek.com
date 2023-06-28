import {UseCase} from "../../../../common/domain/model/UseCase";
import {User} from "../../../domain/model/User";
import {UserRepositoryInterface} from "../../../domain/persistence/UserRepository.interface";

type GetUserRequest = {
    userId: string;
};
type GetUserResponse = User;
type GetUserUseCase = UseCase<GetUserRequest, GetUserResponse>;

type GetUserDependencies = {
  userRepository: UserRepositoryInterface;
};


const getUserCreator =
    ({userRepository}: GetUserDependencies): GetUserUseCase =>
      async (request: GetUserRequest) => {
        const {userId} = request;

        return await userRepository.get(userId);
      };


export type {GetUserRequest, GetUserResponse, GetUserUseCase};
export {getUserCreator};
