import { useState } from "react";

import { Matchup } from "../../../types/game";

interface StartGameProps {
    onStartGame: (matchup: Matchup) => void;
}

export default function StartGame(props: StartGameProps) {
    const { onStartGame } = props;

    const [homeTeam, setHomeTeam] = useState<string>("");
    const [awayTeam, setAwayTeam] = useState<string>("");

    const handleStartGame = () => {
        const matchup: Matchup = {
            homeTeam,
            awayTeam,
        };
        onStartGame(matchup);
        setHomeTeam("");
        setAwayTeam("");
    };

    return (
        <>
            <div>
                <label>Home Team</label>
                <input
                    type="text"
                    value={homeTeam}
                    onChange={e => setHomeTeam(e.target.value)}
                />
            </div>
            <div>
                <label>Away Team</label>
                <input
                    type="text"
                    value={awayTeam}
                    onChange={e => setAwayTeam(e.target.value)}
                />
            </div>
            <button onClick={handleStartGame}>Start Game</button>
        </>
    );
}
