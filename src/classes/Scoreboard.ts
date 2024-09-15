import { ActiveGame, GameResult, Matchup } from "../tests/Scoreboard.test";

export default class Scoreboard {
    private activeGames: ActiveGame[] = [];

    startGame(matchup: Matchup, startTime?: number): void {
        const activeGame: ActiveGame = {
            ...matchup,
            homeScore: 0,
            awayScore: 0,
            startedAt: startTime ?? Date.now(),
        };

        this.activeGames.push(activeGame);
    }

    updateScore(gameResult: GameResult): void {
        const gameToUpdate = this.activeGames.find(
            game =>
                game.homeTeam === gameResult.homeTeam &&
                game.awayTeam === gameResult.awayTeam
        );

        if (gameToUpdate) {
            gameToUpdate.homeScore = gameResult.homeScore;
            gameToUpdate.awayScore = gameResult.awayScore;
        }
    }

    finishGame(matchup: Matchup): void {
        this.activeGames = this.activeGames.filter(
            game =>
                game.homeTeam !== matchup.homeTeam &&
                game.awayTeam !== matchup.awayTeam
        );
    }

    getSummary(): string[] {
        const sortedActiveGames = this.activeGames.sort((a, b) => {
            const totalScoreA = a.homeScore + a.awayScore;
            const totalScoreB = b.homeScore + b.awayScore;

            if (totalScoreA === totalScoreB) {
                return a.startedAt - b.startedAt;
            }

            return totalScoreB - totalScoreA;
        });

        return sortedActiveGames.map(
            game =>
                `${game.homeTeam} ${game.homeScore} - ${game.awayTeam} ${game.awayScore}`
        );
    }
}
