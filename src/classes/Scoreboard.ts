import { ActiveGame, GameResult, Matchup } from "../tests/Scoreboard.test";

export default class Scoreboard {
    private activeGames: ActiveGame[] = [];

    startGame(matchup: Matchup, startTime?: number): void {
        this.validateMatchup(matchup);

        if (this.isGameInProgress(matchup)) {
            throw new Error("The game is already in progress");
        }

        const activeGame: ActiveGame = {
            ...matchup,
            homeScore: 0,
            awayScore: 0,
            startedAt: startTime ?? Date.now(),
        };

        this.activeGames.push(activeGame);
    }

    updateScore(gameResult: GameResult): void {
        this.validateScores(gameResult.homeScore, gameResult.awayScore);

        const gameToUpdate = this.findGame(gameResult);

        if (!gameToUpdate) {
            throw new Error("The game does not exist");
        }

        gameToUpdate.homeScore = gameResult.homeScore;
        gameToUpdate.awayScore = gameResult.awayScore;
    }

    finishGame(matchup: Matchup): void {
        const gameToFinish = this.findGame(matchup);

        if (!gameToFinish) {
            throw new Error("The game does not exist");
        }

        this.activeGames = this.activeGames.filter(
            game => game !== gameToFinish
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

    private findGame(matchup: Matchup): ActiveGame | undefined {
        return this.activeGames.find(
            game =>
                game.homeTeam === matchup.homeTeam &&
                game.awayTeam === matchup.awayTeam
        );
    }

    private isGameInProgress(matchup: Matchup): boolean {
        return !!this.findGame(matchup);
    }

    private validateMatchup(matchup: Matchup): void {
        if (matchup.homeTeam === "" || matchup.awayTeam === "") {
            throw new Error("Team names cannot be empty");
        }

        if (matchup.homeTeam === matchup.awayTeam) {
            throw new Error("Team names cannot be equal");
        }
    }

    private validateScores(homeScore: number, awayScore: number): void {
        if (homeScore < 0 || awayScore < 0) {
            throw new Error("The score cannot be negative");
        }
    }
}
