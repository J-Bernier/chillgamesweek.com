// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {DB_TEAMS_REF, DB_USERS_REF} from "../const/const";

/**
 * Updates the last name of a user on write
 */
export const formatUserLastName = functions.database
    .ref(`/${DB_USERS_REF}/{username}/lastName`)
    .onUpdate(async (snap) => {
      const lastName = snap.after.val() as string;
      if (lastName === null) {
        return;
      }
      return await snap.after.ref.set(lastName.toUpperCase());
    });

/**
 * Updates a team's list of users (or creates the team) whenever a user has a new team
 */
export const addTeam = functions.database
    .ref(`/${DB_USERS_REF}/{username}/teams/{teamName}`)
    .onCreate(async (_snap, context) => {
      const {username, teamName} = context.params as {[option: string]: string};
      console.log("test");

      return await admin
          .database()
          .ref(`/${DB_TEAMS_REF}/${teamName}/${DB_USERS_REF}/${username}`)
          .set(true);
    });

/**
 * Updates a team's list of users (and potentially delete the team) whenever a user leaves a new team
 */
export const removeTeam = functions.database
    .ref(`/${DB_USERS_REF}/{username}/teams/{teamName}`)
    .onDelete(async (_snap, context) => {
      const {username, teamName} = context.params as {[option: string]: string};

      await admin
          .database()
          .ref(`/${DB_TEAMS_REF}/${teamName}/${DB_USERS_REF}/${username}`)
          .remove();

      // Delete team if empty
      const teamUsers = await admin
          .database()
          .ref(`/${DB_TEAMS_REF}/${teamName}/${DB_USERS_REF}`)
          .get();

      if (Object.keys(teamUsers).length === 0) {
        return await admin
            .database()
            .ref(`/${DB_TEAMS_REF}/${teamName}`)
            .remove();
      }
    });

