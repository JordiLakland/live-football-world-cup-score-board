import { ActiveGame, GameResult, Matchup } from "../tests/Scoreboard.test";

export default class Scoreboard {
    private activeGames: ActiveGame[] = [];

    startGame(matchup: Matchup, startTime?: number): void {
        // Method implementation here
    }

    updateScore(gameResult: GameResult): void {
        // Method implementation here
    }

    finishGame(matchup: Matchup): void {
        // Method implementation here
    }

    getSummary(): string[] {
        // Method implementation here
        return [];
    }
}
