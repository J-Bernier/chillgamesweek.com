type User = {
  id: string;
  firstName: string;
  lastName: string;
  pseudo: string;
  email: string;
  birthDate?: string;
  teams: {
      [teamName: string]: string;
  };
}

export type {User};
