import { GameResult, Matchup } from "../../../types/game";

interface UpdateGammeProps {
    gameResults: GameResult[];
    onUpdateScore: (gameResult: GameResult) => void;
    onFinishGame: (matchup: Matchup) => void;
}

export default function UpdateGame(props: UpdateGammeProps) {
    const { gameResults, onUpdateScore, onFinishGame } = props;

    const handleUpdateScore = (
        gameResult: GameResult,
        team: "home" | "away"
    ) => {
        if (team === "home") {
            onUpdateScore({
                ...gameResult,
                homeScore: gameResult.homeScore + 1,
            });
            return;
        }

        onUpdateScore({
            ...gameResult,
            awayScore: gameResult.awayScore + 1,
        });
    };

    const handleFinishGame = (gameResult: GameResult) => {
        const matchup: Matchup = {
            homeTeam: gameResult.homeTeam,
            awayTeam: gameResult.awayTeam,
        };
        onFinishGame(matchup);
    };

    return (
        <>
            {gameResults.length === 0 ? (
                <p>No games in progress</p>
            ) : (
                <div>
                    {gameResults.map((game, index) => (
                        <div key={index}>
                            {`${game.homeTeam} ${game.homeScore} - ${game.awayTeam} ${game.awayScore}`}
                            <button
                                onClick={() => handleUpdateScore(game, "home")}
                            >
                                Add Home Score
                            </button>
                            <button
                                onClick={() => handleUpdateScore(game, "away")}
                            >
                                Add Away Score
                            </button>
                            <button onClick={() => handleFinishGame(game)}>
                                Finish Game
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
