export interface Group {
    // Name of the group, acts as the id
    name: string;

    // List of users in the group
    users: {
        [username: string]: true;
    };
}
