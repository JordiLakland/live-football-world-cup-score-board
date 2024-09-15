import { beforeEach, describe, expect, it } from "vitest";
import { GameResult, Matchup } from "../types/game";
import Scoreboard from "../classes/Scoreboard";

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

    it("should not start a game with empty team names", () => {
        const emptyMatchup: Matchup = {
            homeTeam: "",
            awayTeam: "",
        };
        expect(() => scoreboard.startGame(emptyMatchup)).toThrowError(
            "Team names cannot be empty"
        );

        const emptyAwayMatchup: Matchup = {
            homeTeam: "Argentina",
            awayTeam: "",
        };
        expect(() => scoreboard.startGame(emptyAwayMatchup)).toThrowError(
            "Team names cannot be empty"
        );

        const emptyHomeMatchup: Matchup = {
            homeTeam: "",
            awayTeam: "Australia",
        };
        expect(() => scoreboard.startGame(emptyHomeMatchup)).toThrowError(
            "Team names cannot be empty"
        );
    });

    it("should not start a game with duplicate team names", () => {
        const duplicateMatchup: Matchup = {
            homeTeam: "Argentina",
            awayTeam: "Argentina",
        };
        expect(() => scoreboard.startGame(duplicateMatchup)).toThrowError(
            "Team names cannot be equal"
        );
    });

    it("should not start a game that is already in progress", () => {
        const matchup: Matchup = {
            homeTeam: "Argentina",
            awayTeam: "Australia",
        };
        scoreboard.startGame(matchup);

        expect(() => scoreboard.startGame(matchup)).toThrowError(
            "The game is already in progress"
        );
    });

    it("should not update the score of a game that does not exist", () => {
        const gameResult: GameResult = createGameResult(
            "Argentina",
            "Australia",
            3,
            1
        );
        expect(() => scoreboard.updateScore(gameResult)).toThrowError(
            "The game does not exist"
        );
    });

    it("should not update the score with negative values", () => {
        const matchup: Matchup = {
            homeTeam: "Argentina",
            awayTeam: "Australia",
        };
        scoreboard.startGame(matchup);

        const homeNegativeGameResult: GameResult = createGameResult(
            "Argentina",
            "Australia",
            -3,
            1
        );
        expect(() =>
            scoreboard.updateScore(homeNegativeGameResult)
        ).toThrowError("The score cannot be negative");

        const awayNegativeGameResult: GameResult = createGameResult(
            "Argentina",
            "Australia",
            3,
            -1
        );
        expect(() =>
            scoreboard.updateScore(awayNegativeGameResult)
        ).toThrowError("The score cannot be negative");
    });

    it("should not finish a game that does not exist", () => {
        const matchup: Matchup = {
            homeTeam: "Argentina",
            awayTeam: "Australia",
        };
        expect(() => scoreboard.finishGame(matchup)).toThrowError(
            "The game does not exist"
        );
    });
});
