import {useContext, useState} from 'react';
import {
  GameEditContext,
  LoadingStateContext
} from '@/Components/Game/GameEdit.jsx';
import axios from "axios";
import Loading from "@/Elements/Loading/Loading.jsx";

export default function AddDeleteGoalForm({ player }) {
  const { gameContext,setGameContext } = useContext(GameEditContext);
  const { loading, setLoading } = useContext(LoadingStateContext);
  const [ goals, setGoals ] = useState(player.goals);

  const handleGoal = (e, player_id, method) => {
    e.preventDefault();
    if(loading === true) return;

    setLoading(true);

    axios.post(route(`goal.${method}`, [gameContext.id, { player_id }])).then(() => {
      if (method === 'create') {
        setGoals(goals + 1);
        setGameContext((prev) => {
          const updatedGame = {...prev};
          updatedGame.score[player.team_id]++;

          return updatedGame;
        })
      } else {
        setGoals(goals - 1);
        setGameContext((prev) => {
          const updatedGame = {...prev};
          updatedGame.score[player.team_id]--;

          return updatedGame;
        })
      }
      setLoading(false);
    });
  };

  const form = (actionFunc, actionText, bgColor, method) => (
    <form
      id={`player-${player.id}-add-goal`}
      onSubmit={(e) => actionFunc(e, player.id, method)}
      className={`mb-0 text-center`}
    >
      <button
        disabled={loading}
        className={`${bgColor} border-0 d-flex justify-content-center align-items-center mt-0 mb-0 p-0 mx-auto`}
        type="submit"
      >
        {
          loading ? <Loading /> : actionText
        }
      </button>
    </form>
  );

  return (
    <div className="row w-100 align-items-center pe-2">
      <span className="col-3 text-center">
        {goals > 0 && form(handleGoal, '-', 'bg-danger', 'destroy') }
      </span>
      <span className="col-6 text-center mx-auto">
        {goals}
      </span>
      <span className="col-3 text-center">
        {form(handleGoal, '+', 'bg-success', 'create')}
      </span>
    </div>
  );
}
