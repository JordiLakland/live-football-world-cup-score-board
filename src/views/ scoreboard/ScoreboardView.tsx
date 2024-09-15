import { useState } from "react";

import GameManager from "./components/GameManager";
import { GameResult, Matchup } from "../../types/game";
import Scoreboard from "../../classes/Scoreboard";
import Summary from "./components/Summary";

export default function ScoreboardView() {
    const [scoreboard] = useState<Scoreboard>(new Scoreboard());
    const [, setUpdate] = useState<number>(0);

    // Trigger update to re-render the component
    const triggerUpdate = (): void => {
        setUpdate(prev => prev + 1);
    };

    const handleStartGame = (matchup: Matchup) => {
        scoreboard.startGame(matchup);
        triggerUpdate();
    };

    const handleUpdateScore = (gameResult: GameResult) => {
        scoreboard.updateScore(gameResult);
        triggerUpdate();
    };

    const handleFinishGame = (matchup: Matchup) => {
        scoreboard.finishGame(matchup);
        triggerUpdate();
    };

    return (
        <div>
            <h1>Live Football World Cup Score Board</h1>
            <GameManager
                gameResults={scoreboard.getGameResults()}
                onStartGame={handleStartGame}
                onUpdateScore={handleUpdateScore}
                onFinishGame={handleFinishGame}
            />
            <Summary summary={scoreboard.getSummary()} />
        </div>
    );
}
