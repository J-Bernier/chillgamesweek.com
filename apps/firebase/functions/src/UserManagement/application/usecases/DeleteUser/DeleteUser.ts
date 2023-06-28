import {UseCase} from "../../../../common/domain/model/UseCase";
import {UserRepositoryInterface} from "../../../domain/persistence/UserRepository.interface";

type DeleteUserRequest = {
    userId: string;
};
type DeleteUserResponse = boolean;
type DeleteUserUseCase = UseCase<DeleteUserRequest, DeleteUserResponse>;

type DeleteUserDependencies = {
    userRepository: UserRepositoryInterface;
};

const deleteUserCreator =
    ({userRepository}: DeleteUserDependencies): DeleteUserUseCase =>
      async (request: DeleteUserRequest) => {
        const {userId} = request;

        await userRepository.delete(userId);

        return true;
      };

export type {DeleteUserRequest, DeleteUserResponse, DeleteUserUseCase};
export {deleteUserCreator};

