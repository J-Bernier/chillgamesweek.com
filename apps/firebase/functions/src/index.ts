import * as admin from "firebase-admin";
admin.initializeApp(); // TODO: move that somewhere else ?

import {AddGameToCatalogController} from "./GameManagement/infrastructure/http/AddGameToCatalog/AddGameToCatalog.controller";
import {FinishGameController} from "./GameManagement/infrastructure/http/FinishGame/FinishGame.controller";
import {StartGameController} from "./GameManagement/infrastructure/http/StartGame/StartGame.controller";
import {AddUserController} from "./UserManagement/infrastructure/http/AddUser/AddUser.controller";
import {DeleteUserController} from "./UserManagement/infrastructure/http/DeleteUser/DeleteUser.controller";
import {GetUserController} from "./UserManagement/infrastructure/http/GetUser/GetUser.controller";

exports.user = {
  add: AddUserController,
  delete: DeleteUserController,
  get: GetUserController,
};

exports.game = {
  start: StartGameController,
  finish: FinishGameController,
  addGameToCatalog: AddGameToCatalogController,
};
