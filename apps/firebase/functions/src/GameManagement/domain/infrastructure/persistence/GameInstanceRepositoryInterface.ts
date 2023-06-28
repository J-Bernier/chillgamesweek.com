import {GameInstance, Results} from "../../model/GameInstance";

type GameInstanceRepositoryInterface = {
  save: (gameInstance: GameInstance) => Promise<boolean>;
  delete: (id: string) => Promise<void>;
  get: (id: string) => Promise<GameInstance>;
  finish: (id: string, results: Results) => Promise<void>;
}

export type {GameInstanceRepositoryInterface};
