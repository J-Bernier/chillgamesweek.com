import {Database} from "firebase-admin/database";
import {UserRepositoryInterface} from "../../../domain/infrastructure/persistence/UserRepositoryInterface";

const USERS_REF = "users";

type Dependencies = {
  db: Database;
}

const userRepositoryCreator = ({db}: Dependencies): UserRepositoryInterface => ({
  addGame: async (userId: string, gameId: string) => {
    const docRef = db.ref(`${USERS_REF}/${userId}/games/${gameId}`);
    await docRef.set(true);
    return true;
  },
});

export {userRepositoryCreator};
