// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
import * as functions from "firebase-functions";

import * as admin from "firebase-admin";

import { User } from "../entities/user.entity";

const USER_REF = "users";

export const create = functions.https.onRequest((req, res) => {
    functions.logger.info("Invoking user-create", {
        providedData: req.body,
    });
    const newUser = req.body as User;
    if (Object.keys(newUser).length === 0 || !newUser.username) {
        res.status(400).json({
            error: "Needs a body with at least a username !",
        });
        return;
    }

    const database = admin.database();

    const testDocumentsRef = database.ref(USER_REF);
    return testDocumentsRef
        .child(newUser.username)
        .set(newUser)
        .then(() => {
            res.json({ inserted: newUser });
        });
});
