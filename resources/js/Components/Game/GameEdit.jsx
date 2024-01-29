import React, { createContext } from 'react';
import styles from './Game.module.scss';
import NoTeamList from '@/Components/NoTeamList/NoTeamList.jsx';
import EditButtons from '@/Components/Game/EditButtons.jsx';
import ScoreTableEdit from '@/Components/ScoreTable/ScoreTableEdit.jsx';

export const GameEditContext = createContext({ game: null });

export default function GameEdit({ game }) {
  const team1 = game.players.filter((player) => player.team_id === 1);
  const team2 = game.players.filter((player) => player.team_id === 2);
  const noTeam = game.players.filter((player) => player.team_id === null);

  return (
    <GameEditContext.Provider value={game}>
      <article className={`${styles.Game} row`}>
        <div className="col-12 col-lg-3 mb-3 text-center text-lg-start">
          <a href={route('game.show', [game.id])}>
            <h2>
              {game.score[1]}
              {' '}
              -
              {' '}
              {game.score[2]}
            </h2>
          </a>
          <h3>{game.place}</h3>
          <small>{game.date}</small>
        </div>
        <div className="col-12 col-lg-9">
          <div className={`${styles.Table} row`}>
            {noTeam.length >= 1 && (
            <div className="mb-3">
              <NoTeamList players={noTeam} />
            </div>
            )}
            <div className="col-12 col-lg-6">
              <ScoreTableEdit team={team1} />
            </div>
            <div className="col-12 col-lg-6">
              <ScoreTableEdit team={team2} />
            </div>
          </div>
          <EditButtons game={game} />
        </div>
      </article>
    </GameEditContext.Provider>
  );
}
