export default function NoTeamList ({players}) {
    return (
    <div className={`mx-auto`}>
        <h5 className={`mb-0`}>No Team List</h5>
        <ol>
            {players.map((player, playerIndex) => (<li key={playerIndex}>{player.first_name} {player.last_name}</li>))}
        </ol>
    </div>)
}
