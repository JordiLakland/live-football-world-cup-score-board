import { beforeEach, describe, expect, it } from "vitest";
import Scoreboard from "../classes/Scoreboard";

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

const createGameResult = (
    homeTeam: string,
    awayTeam: string,
    homeScore: number,
    awayScore: number
): GameResult => ({
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
});

// Tests
describe("Scoreboard", () => {
    let scoreboard: Scoreboard;

    beforeEach(() => {
        scoreboard = new Scoreboard();
    });

    it("should start a game", () => {
        const matchup: Matchup = {
            homeTeam: "Argentina",
            awayTeam: "Australia",
        };
        scoreboard.startGame(matchup);
        const summary = scoreboard.getSummary();

        expect(summary).toContain("Argentina 0 - Australia 0");
    });

    it("should update the score", () => {
        const matchup: Matchup = {
            homeTeam: "Argentina",
            awayTeam: "Australia",
        };
        scoreboard.startGame(matchup);

        const gameResult: GameResult = createGameResult(
            "Argentina",
            "Australia",
            3,
            1
        );
        scoreboard.updateScore(gameResult);

        const summary = scoreboard.getSummary();
        expect(summary).toContain("Argentina 3 - Australia 1");
    });

    it("should finish a game", () => {
        // Prevent testing start dates from being the same due to Vitest's fast execution
        const startTime = Date.now();
        const firstMatchup: Matchup = {
            homeTeam: "Argentina",
            awayTeam: "Australia",
        };
        const secondMatchup: Matchup = {
            homeTeam: "Uruguay",
            awayTeam: "Italy",
        };

        scoreboard.startGame(firstMatchup, startTime);
        scoreboard.startGame(secondMatchup, startTime + 1000);

        let summary = scoreboard.getSummary();
        expect(summary).toContain("Argentina 0 - Australia 0");

        scoreboard.finishGame(firstMatchup);

        summary = scoreboard.getSummary();
        expect(summary).not.toContain("Argentina 0 - Australia 0");
        expect(summary).toContain("Uruguay 0 - Italy 0");
    });

    it("should return a summary", () => {
        const startTime = Date.now();

        const matchResults = [
            createGameResult("Argentina", "Australia", 3, 1),
            createGameResult("Uruguay", "Italy", 6, 6),
            createGameResult("Germany", "France", 2, 2),
            createGameResult("Spain", "Brazil", 10, 2),
            createGameResult("Mexico", "Canada", 0, 5),
        ];

        scoreboard.startGame(
            { homeTeam: "Argentina", awayTeam: "Australia" },
            startTime
        );
        scoreboard.updateScore(matchResults[0]);

        scoreboard.startGame(
            { homeTeam: "Uruguay", awayTeam: "Italy" },
            startTime + 1000
        );
        scoreboard.updateScore(matchResults[1]);

        scoreboard.startGame(
            { homeTeam: "Germany", awayTeam: "France" },
            startTime + 2000
        );
        scoreboard.updateScore(matchResults[2]);

        scoreboard.startGame(
            { homeTeam: "Spain", awayTeam: "Brazil" },
            startTime + 3000
        );
        scoreboard.updateScore(matchResults[3]);

        scoreboard.startGame(
            { homeTeam: "Mexico", awayTeam: "Canada" },
            startTime + 4000
        );
        scoreboard.updateScore(matchResults[4]);

        const summary = scoreboard.getSummary();

        const expectedSummary = [
            "Uruguay 6 - Italy 6",
            "Spain 10 - Brazil 2",
            "Mexico 0 - Canada 5",
            "Argentina 3 - Australia 1",
            "Germany 2 - France 2",
        ];

        expect(summary).toEqual(expectedSummary);
    });
});
