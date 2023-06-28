import * as admin from "firebase-admin";
import {Database} from "firebase-admin/database";

const createDb = (): Database => {
  const db = admin.database();
  return db;
};

export {createDb};
