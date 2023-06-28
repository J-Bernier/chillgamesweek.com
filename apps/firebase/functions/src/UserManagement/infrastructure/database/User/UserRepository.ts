import {Database} from "firebase-admin/database";
import {UserRepositoryInterface} from "../../../domain/persistence/UserRepository.interface";
import {User} from "../../../domain/model/User";

const USERS_REF = "users";

type Dependencies = {
  db: Database;
}

const userRepositoryCreator = ({db}: Dependencies): UserRepositoryInterface => ({
  save: async (user: User) => {
    const docRef = db.ref(`${USERS_REF}/${user.id}`);
    await docRef.set(user);
    return true;
  },
  delete: async (id: string) => {
    const docRef = db.ref(`${USERS_REF}/${id}`);
    await docRef.remove();
  },
  get: async (id: string) => {
    const docRef = db.ref(`${USERS_REF}/${id}`);
    const data = await docRef.get();
    return data.val();
  },
});

export {userRepositoryCreator};
