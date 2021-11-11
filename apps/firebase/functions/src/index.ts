import * as DatabaseFunctions from "./functions/database.functions";
import * as RandomFunctions from "./functions/random.functions";
import * as UserFunctions from "./functions/users.functions";

import * as admin from "firebase-admin";
admin.initializeApp();

exports.database = DatabaseFunctions;
exports.random = RandomFunctions;
exports.user = UserFunctions;
