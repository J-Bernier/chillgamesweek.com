import * as functions from "firebase-functions";

import * as admin from "firebase-admin";

export const read = functions.https.onRequest((req, res) => {
  functions.logger.info("Invoking database-read");
  const database = admin.database();
  const {id} = req.query;
  if (!id) {
    res.status(400).json({error: "No id !"});
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
  const key = req.query.key as string;
  const value = req.query.value as string;
  if (!value || !key) {
    res.status(400).json({error: "Needs a key and value query params !"});
    return;
  }

  const docRef = database.ref(key);
  return docRef.set(value).then(() => {
    res.json({
      inserted: {
        [key]: value,
      },
    });
  });
});

