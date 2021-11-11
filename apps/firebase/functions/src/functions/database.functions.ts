// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
import * as functions from "firebase-functions";

import * as admin from "firebase-admin";

export const read = functions.https.onRequest((req, res) => {
    functions.logger.info("Invoking database-read");
    const database = admin.database();
    const id = req.query.id;
    if (!id) {
        res.status(400).json({ error: "No id !" });
        return;
    }
    return database
        .ref(id as string)
        .get()
        .then((val) => {
            res.json(val.toJSON());
        });
});

export const displayFull = functions.https.onRequest((req, res) => {
    functions.logger.info("Invoking database-displayFull");
    const database = admin.database();
    return database
        .ref()
        .get()
        .then((val) => {
            res.json(val.toJSON());
        });
});

export const insert = functions.https.onRequest((req, res) => {
    functions.logger.info("Invoking database-insert");
    const database = admin.database();
    const value = req.query.value;
    if (!value) {
        res.status(400).json({ error: "Needs a value query param !" });
        return;
    }

    const testDocumentsRef = database.ref(`test_documents/${value}`);
    return testDocumentsRef.set(true).then(() => {
        res.json({ inserted: value });
    });
});
