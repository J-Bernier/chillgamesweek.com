type UserRepositoryInterface = {
    startGame:(userId:string, gameId:string) => Promise<void>,
    updateGameStatus: (params: {
        userId: string;
        gameId: string;
        status: string;
        rank: number;
        points: number;
    }) => Promise<boolean>;
};

export type {UserRepositoryInterface};

