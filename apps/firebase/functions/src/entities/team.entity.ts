export interface Team {
    // Name of the team, acts as the id
    name: string;

    // List of users in the team
    users: {
        [username: string]: true;
    };
}

