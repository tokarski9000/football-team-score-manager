import React, {createContext, useState} from 'react';
import styles from './Game.module.scss';
import NoTeamList from '@/Components/NoTeamList/NoTeamList.jsx';
import EditButtons from '@/Components/Game/EditButtons.jsx';
import ScoreTableEdit from '@/Components/ScoreTable/ScoreTableEdit.jsx';

export const GameEditContext = createContext({
  gameContext: null,
  setGameContext: () => {},
});

export const LoadingStateContext = createContext({
  loading: false,
  setLoading: () => {},
});

export default function GameEdit({ game }) {
  const [gameContext, setGameContext] = useState(game);
  const gameContextProvider = { gameContext, setGameContext };

  const [loading, setLoading] = useState(false);
  const loadingContext = { loading, setLoading };

  const team1 = game.players.filter((player) => player.team_id === 1);
  const team2 = game.players.filter((player) => player.team_id === 2);
  const noTeam = game.players.filter((player) => player.team_id === null);

  return (
    <GameEditContext.Provider value={gameContextProvider}>
      <LoadingStateContext.Provider value={loadingContext}>
      <article className={`${styles.Game} row`}>
        <div className="col-12 mb-5 text-center">
          <a href={route('game.show', [game.id])}>
            <h2>
              {gameContext.score[1]}
              {' '}
              -
              {' '}
              {gameContext.score[2]}
            </h2>
          </a>
          <h3>{game.place}</h3>
          <small>{game.date_time}</small>
        </div>
        <div className="col-12">
          <div className={`${styles.Table} row`}>
            {noTeam.length >= 1 && (
            <div className="mb-3">
              <NoTeamList players={noTeam} />
            </div>
            )}
            <div className="col-12 col-lg-5">
              <ScoreTableEdit team={team1} />
            </div>
            <div className="mb-5 mb-lg-0 col-lg-1 mx-4"></div>
            <div className="col-12 col-lg-5">
              <ScoreTableEdit team={team2} />
            </div>
          </div>
          <EditButtons game={game} />
        </div>
      </article>
      </LoadingStateContext.Provider>
    </GameEditContext.Provider>
  );
}
