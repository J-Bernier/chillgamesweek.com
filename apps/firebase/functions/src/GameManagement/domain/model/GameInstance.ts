type PointsModifiers = {
  [rank: number]: number;
}

type GameInstance = {
  id: string;
  catalogId: string;
  players: {
    [playerId: string]: true;
  };
  pointsModifiers: PointsModifiers;
  scoreboard?: {
    [playerId: string]: number;
  }
}

export type {GameInstance};
