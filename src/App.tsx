import ScoreboardView from "./views/ scoreboard/ScoreboardView";

import styles from "./App.module.css";

export default function App() {
    return (
        <div className={styles.container}>
            <ScoreboardView />
        </div>
    );
}
