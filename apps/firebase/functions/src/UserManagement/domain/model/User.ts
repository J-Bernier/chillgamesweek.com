type User = {
  id: string;
  firstName: string;
  lastName: string;
  pseudo: string;
  email: string;
  birthDate?: string;
  teams: {
    [teamName: string]: boolean;
  };
  games: {
    [gameId: string]: boolean;
  }
}

export type {User};
