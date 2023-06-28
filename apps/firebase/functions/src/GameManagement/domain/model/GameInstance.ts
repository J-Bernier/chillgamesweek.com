type Rank = number;

type PointsModifiers = {
  [rank: Rank]: number;
}

type Results = {
  [playerId: string]: Rank;
}

type GameStatus = "created" | "started" | "finished" | "canceled";

type GameInstance = {
  id: string;
  status: GameStatus;
  catalogId: string;
  players: {
    [playerId: string]: true;
  };
  pointsModifiers: PointsModifiers;
  scoreboard?: {
    [playerId: string]: Rank;
  },
  results?: Results
}

export type {GameInstance, GameStatus, Results};
