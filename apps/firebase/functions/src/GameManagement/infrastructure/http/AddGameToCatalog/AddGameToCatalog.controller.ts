import * as functions from "firebase-functions";
import {addGameToCatalogCreator} from "../../../application/usecases/AddGameToCatalog/AddGameToCatalog";
import {createDb} from "../../../../common/infrastructure/createDb";
import {gameCatalogItemRepositoryCreator} from "../../database/GameCatalogItem/GameCatalogItemRepository";


const db = createDb();
const gameCatalogItemRepository = gameCatalogItemRepositoryCreator({db});
const addGameToCatalogUseCase = addGameToCatalogCreator({gameCatalogItemRepository});

const AddGameToCatalogController = functions.https.onRequest(async (req, res) => {
  // TODO: validate input
  const catalogId = await addGameToCatalogUseCase(req.body);
  res.json({
    catalogId,
  });
});

export {AddGameToCatalogController};
