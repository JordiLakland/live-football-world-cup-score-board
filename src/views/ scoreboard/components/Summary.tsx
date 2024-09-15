interface SummaryProps {
    summary: string[];
}

export default function Summary(props: SummaryProps) {
    const { summary } = props;

    return (
        <div>
            <h2>Summary</h2>
            {summary.length === 0 ? (
                <p>No active games</p>
            ) : (
                <div>
                    {summary.map((game, index) => (
                        <p key={index}>{game}</p>
                    ))}
                </div>
            )}
        </div>
    );
}
