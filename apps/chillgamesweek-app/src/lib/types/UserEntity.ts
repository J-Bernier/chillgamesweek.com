export interface UserEntity {
  // First name of the user
  firstName: string;

  // Last name of the user
  lastName: string;

  // Connexion email
  email?: string;

  // Birthdate, format should be DD-MM-YYYY
  birthDate?: string;

  // teams
  teams?: {
      [team: string]: string;
  };
}

