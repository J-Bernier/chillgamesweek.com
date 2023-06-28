import {randomUUID} from "crypto";
import {UseCase} from "../../../../common/domain/model/UseCase";
import {GameCatalogItemRepositoryInterface} from "../../../domain/infrastructure/persistence/GameCatalogItemRepositoryInterface";
import {GameCatalogItem} from "../../../domain/model/GameCatalogItem";

type AddGameToCatalogRequest = Omit<GameCatalogItem, "id">;
type AddGameToCatalogResponse = string;
type AddGameToCatalogUseCase = UseCase<AddGameToCatalogRequest, AddGameToCatalogResponse>;

type AddGameToCatalogDependencies = {
    gameCatalogItemRepository: GameCatalogItemRepositoryInterface;
};

const addGameToCatalogCreator =
    ({gameCatalogItemRepository}: AddGameToCatalogDependencies): AddGameToCatalogUseCase =>
      async (request: AddGameToCatalogRequest) => {
        const catalogItemToCreate = request;

        const id = randomUUID();

        await gameCatalogItemRepository.save({
          ...catalogItemToCreate,
          id,
        });

        return id;
      };

export type {AddGameToCatalogRequest, AddGameToCatalogResponse, AddGameToCatalogUseCase};
export {addGameToCatalogCreator};

