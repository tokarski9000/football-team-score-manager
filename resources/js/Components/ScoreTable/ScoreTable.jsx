import { useContext } from 'react';
import style from './ScoreTable.module.scss';
import PlayerIcon from '@/Components/Icons/PlayerIcon.jsx';
import BallIcon from '@/Components/Icons/BallIcon.jsx';
import { AuthContext } from '@/Layouts/Layout.jsx';
import AddDeleteGoalForm from '@/Components/ScoreTable/AddDeleteGoalForm.jsx';

export default function ScoreTable({ team }) {
  const auth = useContext(AuthContext);

  return (
    <div className={`${style.ScoreTable}`}>
      <div className="row border-bottom pb-2">
        <h5 className="col-7 m-0">
          <PlayerIcon height={10} width={10} />
          {' '}
        </h5>
        <h5 className="col-5 m-0 text-center"><BallIcon height={10} width={10} /></h5>
      </div>
      <div className="row">
        {
                team.map((player, playerIndex) => (
                  <div key={playerIndex} className={`${style.Player} row border-bottom`}>
                    <div className="d-flex justify-content-start align-items-center col-7">
                      {player.first_name}
                      {' '}
                      {player.last_name}
                    </div>
                    <div className="d-flex justify-content-center justify-content-sm-center align-items-center col-5">
                      {player.goals}
                    </div>
                  </div>
                ))
            }
      </div>
    </div>
  );
}
