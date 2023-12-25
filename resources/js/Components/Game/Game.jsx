import React from "react";
import styles from './Game.module.scss';
export default function Game({ game }) {
    const team1 = game.players.filter(player => player.team_id === 1);
    const team2 = game.players.filter(player => player.team_id === 2);
    const noTeam = game.players.filter(player => player.team_id === null);
    const team_size = Math.max(team1.length, team2.length);

    return (
        <details className={styles.Game}>
            <summary>
                {game.is_finished ?
                    <h2>{game.score[1]} - {game.score[2]}</h2>
                    : <h2>TBD</h2>
                }
                <h3>{game.place}</h3>
                <small>{game.date}</small>
                <button><Link href={route('edit')}>Edit</Link></button>
            </summary>
            {
                noTeam.length > 0 &&
                <div>
                    <h4>Players without team</h4>
                    <ul>
                        {noTeam.map((player, playerIndex) => (
                            <li key={playerIndex}>{player.first_name}</li>
                        ))}
                    </ul>
                </div>
            }
            <table>
                <thead>
                <tr>
                    {
                        game.teams.map((team, teamIndex) => (
                            <React.Fragment key={teamIndex}>
                                <th>{team.name}</th>
                                <th>Goals</th>
                            </React.Fragment>
                        ))
                    }
                </tr>
                </thead>
                <tbody>
                {
                    [...Array(team_size).keys()].map((index) => (
                        <tr key={index}>
                             <td>{team1[index].first_name}</td>
                             <td>{team1[index].goals}</td>
                             <td>{team2[index].first_name}</td>
                             <td>{team2[index].goals}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </details>
    )
}
