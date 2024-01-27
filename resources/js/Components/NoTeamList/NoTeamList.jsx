import {useContext} from "react";
import {AuthContext} from "@/Layouts/Layout.jsx";
import {useForm} from "@inertiajs/react";
import {GameEditContext} from "@/Components/Game/GameEdit.jsx";
import InputError from "@/Elements/InputError/InputError.jsx";

export default function NoTeamList ({players}) {
    const auth = useContext(AuthContext);
    const game = useContext(GameEditContext);

    const {post, processing, errors, reset} = useForm();
    const createTeams = (e) => {
        e.preventDefault();
        post(route('playerGame.create', [game.id, {
            players: players,
        }]));
    }

    return (
    <div className={`mx-auto`}>
        <h5 className={`mb-0`}>No Team List</h5>
        <ol>
            {players.map((player, playerIndex) => (<li key={playerIndex}>{player.first_name} {player.last_name}</li>))}
        </ol>
        {(auth.user && game.id) &&
        <form onSubmit={createTeams}>
            <button type="submit" className={`btn btn-primary`} disabled={processing}>Create Teams</button>
            <InputError>{errors.players}</InputError>
        </form>
        }
    </div>)
}
