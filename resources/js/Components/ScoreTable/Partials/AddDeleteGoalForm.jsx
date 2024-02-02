import { useForm } from '@inertiajs/react';
import { useContext } from 'react';
import { GameEditContext } from '@/Components/Game/GameEdit.jsx';

export default function AddDeleteGoalForm({ player }) {
  const { post } = useForm();
  const game = useContext(GameEditContext);

  const handleGoal = (e, player_id, method) => {
    e.preventDefault();
    post(
      route(`goal.${method}`, [game.id, { player_id }]),
      {
        onSuccess: () => {
          const element = document.getElementById(`player-${player_id}-add-goal`);
          element.scrollIntoView({
            block: "center",
            behavior: "instant"
          });
        },
      }
    );
  };

  const form = (actionFunc, actionText, bgColor, method) => (
    <form
      id={`player-${player.id}-add-goal`}
      onSubmit={(e) => actionFunc(e, player.id, method)}
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
        {player.goals > 0 && form(handleGoal, '-', 'bg-danger', 'destroy') }
      </span>
      <span className="col-6 text-center mx-auto">
        {player.goals}
      </span>
      <span className="col-3 text-center">
        {form(handleGoal, '+', 'bg-success', 'create')}
      </span>
    </div>
  );
}
