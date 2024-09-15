export interface Matchup {
    homeTeam: string;
    awayTeam: string;
}

export interface Score {
    homeScore: number;
    awayScore: number;
}

export interface GameResult extends Matchup, Score {}

export interface ActiveGame extends GameResult {
    startedAt: number;
}
