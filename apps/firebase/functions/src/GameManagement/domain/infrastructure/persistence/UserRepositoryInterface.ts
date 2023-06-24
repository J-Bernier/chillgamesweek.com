
type UserRepositoryInterface = {
  addGame: (userId: string, gameId: string) => Promise<boolean>;
}

export type {UserRepositoryInterface};
