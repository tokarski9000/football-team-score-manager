import React from "react";
import styles from './Game.module.scss';
import {Link} from "@inertiajs/react";
import ScoreTable from "@/Components/ScoreTable/ScoreTable.jsx";
import NoTeamList from "@/Components/NoTeamList/NoTeamList.jsx";
export default function Game({ game }) {
    const team1 = game.players.filter(player => player.team_id === 1);
    const team2 = game.players.filter(player => player.team_id === 2);
    const noTeam = game.players.filter(player => player.team_id === null);
    const team_size = Math.max(team1.length, team2.length);
    return (
        <article className={`${styles.Game} row`}>
            <div className={'col-12 col-lg-3 mb-3 text-center text-lg-start'}>
                <h2>{game.score[1]} - {game.score[2]}</h2>
                <h3>{game.place}</h3>
                <small>{game.date}</small>
            </div>
            <div className={'col-12 col-lg-9'}>
                <div className={`${styles.Table} row`}>
                    { noTeam.length>2 && (
                        <div className={`mb-3`}>
                            <NoTeamList players={noTeam} />
                        </div>
                    )}
                    <div className={`col-6`}>
                        <ScoreTable team={team1} />
                    </div>
                    <div className={`col-6`}>
                        <ScoreTable team={team2} />
                    </div>
                </div>
            </div>
        </article>
    );
}
