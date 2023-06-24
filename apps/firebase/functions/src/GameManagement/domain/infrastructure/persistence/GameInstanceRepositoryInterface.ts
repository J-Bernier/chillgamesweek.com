import {GameInstance} from "../../model/GameInstance";

type GameInstanceRepositoryInterface = {
  save: (gameInstance: GameInstance) => Promise<boolean>;
  delete: (id: string) => Promise<void>;
  get: (id: string) => Promise<GameInstance>;
}

export type {GameInstanceRepositoryInterface};
