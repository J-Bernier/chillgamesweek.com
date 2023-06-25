type User = {
  id: string;
  firstName: string;
  lastName: string;
  pseudo: string;
  email: string;
  birthDate?: string;
  inGame: boolean;
  teams: {
    [teamName: string]: boolean;
  };
  games: {
    [gameId: string]: {
      status: string;
      rank: number | undefined;
      points: number | undefined;
    };
  }
}

export type {User};
