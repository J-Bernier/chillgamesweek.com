import {GameCatalogItem} from "../../model/GameCatalogItem";

type GameCatalogItemRepositoryInterface = {
  save: (user: GameCatalogItem) => Promise<boolean>;
  delete: (id: string) => Promise<void>;
  get: (id: string) => Promise<GameCatalogItem>;
}

export type {GameCatalogItemRepositoryInterface};
