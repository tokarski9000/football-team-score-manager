import {useForm} from "@inertiajs/react";
import {useContext} from "react";
import style from './AddDeleteGoalForm.module.scss';
import {GameEditContext} from "@/Components/Game/GameEdit.jsx";
export default function AddDeleteGoalForm({player}) {
    const { post } = useForm();
    const game = useContext(GameEditContext);

    const addGoal = (e, player_id) => {
        e.preventDefault();
        post(route(`goal.create`,[game.id, {
            player_id: player_id,
            game_id: game.id,
        }]));
    }

    const deleteGoal = (e, player_id) => {
        e.preventDefault();
        post(route('goal.destroy',[game.id, {
            player_id: player_id,
            game_id: game.id,
        }]));
    }

    const form = (actionFunc, actionText) => (
        <form
            onSubmit={(e) => actionFunc(e, player.id)}
            className={`${style.AddDeleteGoalForm} mb-0 text-center`}
        >
            <button
                className={'d-flex justify-content-center align-items-center mt-0 mb-0 p-0 mx-auto'}
                type={'submit'}>
                {actionText}
            </button>
        </form>
    );

    return (
        <div className={'row w-100 align-items-center pe-2'}>
            <span className={'col-3 text-center'}>
                {player.goals > 0 && form(deleteGoal, '-') }
            </span>
            <span className={'col-6 text-center mx-auto'}>
                {player.goals}
            </span>
            <span className={'col-3 text-center'}>
                {form(addGoal, '+')}
            </span>
        </div>
    );
}
