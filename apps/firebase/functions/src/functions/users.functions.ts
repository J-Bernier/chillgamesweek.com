// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const USER_REF = "users";

export const formatUserLastName = functions.database
    .ref(`/${USER_REF}/{username}/lastName`)
    .onWrite((snap) => {
        let lastName = snap.after.val() as string;
        if (lastName === null) {
            return;
        }
        return snap.after.ref.set(lastName.toUpperCase());
    });

export const updateGroup = functions.database
    .ref(`/${USER_REF}/{username}/group`)
    .onWrite(async (snap, context) => {
        let previousGroupName = snap.before.exists()
            ? (snap.before.val() as string)
            : null;
        let newGroupName = snap.after.exists()
            ? (snap.after.val() as string)
            : null;
        const username = context.params.username as string;

        // No change
        if (previousGroupName === newGroupName) {
            return;
        }

        // Update previous group
        if (previousGroupName) {
            await admin
                .database()
                .ref(`/groups/${previousGroupName}/users/${username}`)
                .remove();
        }

        // Update new group
        if (newGroupName) {
            await admin
                .database()
                .ref(`/groups/${newGroupName}/users/${username}`)
                .set(true);
        }

        // Remove group if no users are in it
        const groupUsers = await admin
            .database()
            .ref(`/groups/${newGroupName}/users`)
            .get();

        if (Object.keys(groupUsers).length === 0) {
            await admin.database().ref(`/groups/${newGroupName}`).remove();
        }
    });
