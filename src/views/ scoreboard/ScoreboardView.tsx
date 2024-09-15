import GameManager from "./components/GameManager";
import Summary from "./components/Summary";

export default function ScoreboardView() {
    return (
        <div>
            <h1>Live Football World Cup Score Board</h1>
            <GameManager />
            <Summary />
        </div>
    );
}
