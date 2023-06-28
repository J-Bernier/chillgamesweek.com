import {User} from "../model/User";

type UserRepositoryInterface = {
  save: (user: User) => Promise<boolean>;
  delete: (id: string) => Promise<void>;
  get: (id: string) => Promise<User>;
}

export type {UserRepositoryInterface};
