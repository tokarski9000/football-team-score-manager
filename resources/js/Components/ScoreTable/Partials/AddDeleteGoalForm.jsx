import { useForm } from '@inertiajs/react';
import { useContext } from 'react';
import { GameEditContext } from '@/Components/Game/GameEdit.jsx';

export default function AddDeleteGoalForm({ player }) {
  const { post } = useForm();
  const game = useContext(GameEditContext);

  const addGoal = (e, player_id) => {
    e.preventDefault();
    post(route('goal.create', [game.id, {
      player_id,
    }]));
  };

  const deleteGoal = (e, player_id) => {
    e.preventDefault();
    post(route('goal.destroy', [game.id, {
      player_id,
    }]));
  };

  const form = (actionFunc, actionText, bgColor) => (
    <form
      onSubmit={(e) => actionFunc(e, player.id)}
      className={`mb-0 text-center`}
    >
      <button
        className={`${bgColor} border-0 d-flex justify-content-center align-items-center mt-0 mb-0 p-0 mx-auto`}
        type="submit"
      >
        {actionText}
      </button>
    </form>
  );

  return (
    <div className="row w-100 align-items-center pe-2">
      <span className="col-3 text-center">
        {player.goals > 0 && form(deleteGoal, '-', 'bg-danger') }
      </span>
      <span className="col-6 text-center mx-auto">
        {player.goals}
      </span>
      <span className="col-3 text-center">
        {form(addGoal, '+', 'bg-success')}
      </span>
    </div>
  );
}
