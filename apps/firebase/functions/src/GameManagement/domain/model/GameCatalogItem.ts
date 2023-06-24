type GameCatalogCategory = string;

type GameCatalogItem = {
  id: string;
  name: string;
  description: string;
  pictureUrl?: string;
  minPlayers: number;
  maxPlayers: number;
  category: GameCatalogCategory;
}

type GameCatalog = {
  id: string;
  name: string;
  games: {
    [gameId: string]: GameCatalogItem;
  }
}

export type {GameCatalog, GameCatalogItem};
