import {Database} from "firebase-admin/database";

import {UserRepositoryInterface} from "../../../domain/infrastructure/persistence/UserRepositoryInterface";

const USERS_REF = "users";

type Dependencies = {
    db: Database;
};

const userRepositoryCreator = ({
  db,
}: Dependencies): UserRepositoryInterface => ({
  startGame: async (userId, gameId) => {
    const inGameStatus = db.ref(`${USERS_REF}/${userId}/inGame`);
    await inGameStatus.set(true);
    const gamesRef = db.ref(`${USERS_REF}/${userId}/games`);
    if (!(await gamesRef.get()).exists()) {
      await gamesRef.set({
        [gameId]: {
          status: "started",
        },
      });
    }
  },
  updateGameStatus: async ({
    userId,
    gameId,
    status,
    rank,
    points,
  }) => {
    const inGameStatus = db.ref(`${USERS_REF}/${userId}/inGame`);
    await inGameStatus.set(false);
    const gamesRef = db.ref(`${USERS_REF}/${userId}/games`);
    if (!(await gamesRef.get()).exists()) {
      await gamesRef.set({
        [gameId]: {
          status,
          rank,
          points,
        },
      });
      return true;
    }
    const docRef = db.ref(`${USERS_REF}/${userId}/games/${gameId}`);
    await docRef.set({
      status,
      rank,
      points,
    });
    return true;
  },
});

export {userRepositoryCreator};

