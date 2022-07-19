// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const USERS_REF = "users";
const GROUPS_REF = "groups";

export const formatUserLastName = functions.database
    .ref(`/${USERS_REF}/{username}/lastName`)
    .onWrite((snap) => {
        let lastName = snap.after.val() as string;
        if (lastName === null) {
            return;
        }
        return snap.after.ref.set(lastName.toUpperCase());
    });

export const updateGroup = functions.database
    .ref(`/${USERS_REF}/{username}/group`)
    .onWrite(async (snap, context) => {
        const previousGroupName = snap.before.exists()
            ? (snap.before.val() as string)
            : null;
        const newGroupName = snap.after.exists()
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
                .ref(
                    `/${GROUPS_REF}/${previousGroupName}/${USERS_REF}/${username}`
                )
                .remove();
        }

        // Update new group
        if (newGroupName) {
            await admin
                .database()
                .ref(`/${GROUPS_REF}/${newGroupName}/${USERS_REF}/${username}`)
                .set(true);
        }

        // Remove group if no users are in it
        // Note : This workload should be processed by a separate trigger on the /${GROUPS_REF}/{groupId}/${USERS_REF} ref
        const groupUsers = await admin
            .database()
            .ref(`/${GROUPS_REF}/${newGroupName}/${USERS_REF}`)
            .get();

        if (Object.keys(groupUsers).length === 0) {
            await admin
                .database()
                .ref(`/${GROUPS_REF}/${newGroupName}`)
                .remove();
        }
    });
