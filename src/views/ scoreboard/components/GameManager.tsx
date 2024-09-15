import { GameResult, Matchup } from "../../../types/game";
import StartGame from "./StartGame";
import UpdateGame from "./UpdateGame";

interface GameManagerProps {
    gameResults: GameResult[];
    onStartGame: (matchup: Matchup) => void;
    onUpdateScore: (gameResult: GameResult) => void;
    onFinishGame: (matchup: Matchup) => void;
}

export default function GameManager(props: GameManagerProps) {
    return (
        <div>
            <h2>Game Manager</h2>
            <StartGame onStartGame={props.onStartGame} />
            <UpdateGame
                gameResults={props.gameResults}
                onUpdateScore={props.onUpdateScore}
                onFinishGame={props.onFinishGame}
            />
        </div>
    );
}
