import {Database} from "firebase-admin/database";
import {GameCatalogItem} from "../../../domain/model/GameCatalogItem";
import {GameCatalogItemRepositoryInterface} from "../../../domain/infrastructure/persistence/GameCatalogItemRepositoryInterface";

const GAME_CATALOG_ITEMS_REF = "gameCatalogItems";

type Dependencies = {
    db: Database;
};

const gameCatalogItemRepositoryCreator = ({
  db,
}: Dependencies): GameCatalogItemRepositoryInterface => ({
  save: async (gameCatalogItem: GameCatalogItem) => {
    const docRef = db.ref(`${GAME_CATALOG_ITEMS_REF}/${gameCatalogItem.id}`);
    await docRef.set(gameCatalogItem);
    return true;
  },
  delete: async (id: string) => {
    const docRef = db.ref(`${GAME_CATALOG_ITEMS_REF}/${id}`);
    await docRef.remove();
  },
  get: async (id: string) => {
    const docRef = db.ref(`${GAME_CATALOG_ITEMS_REF}/${id}`);
    const data = await docRef.get();
    return data.val();
  },
});

export {gameCatalogItemRepositoryCreator};

