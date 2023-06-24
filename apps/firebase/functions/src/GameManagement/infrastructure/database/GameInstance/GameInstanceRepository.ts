import {Database} from "firebase-admin/database";
import {GameInstance} from "../../../domain/model/GameInstance";
import {GameInstanceRepositoryInterface} from "../../../domain/infrastructure/persistence/GameInstanceRepositoryInterface";

const GAME_INSTANCES_REF = "gameInstances";

type Dependencies = {
  db: Database;
}

const gameInstanceRepositoryCreator = ({db}: Dependencies): GameInstanceRepositoryInterface => ({
  save: async (gameInstance: GameInstance) => {
    const docRef = db.ref(`${GAME_INSTANCES_REF}/${gameInstance.id}`);
    await docRef.set(gameInstance);
    return true;
  },
  delete: async (id: string) => {
    const docRef = db.ref(`${GAME_INSTANCES_REF}/${id}`);
    await docRef.remove();
  },
  get: async (id: string) => {
    const docRef = db.ref(`${GAME_INSTANCES_REF}/${id}`);
    const data = await docRef.get();
    return data.val();
  },
});

export {gameInstanceRepositoryCreator};
