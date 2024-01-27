import {useContext} from "react";
import {AuthContext} from "@/Layouts/Layout.jsx";
import {useForm} from "@inertiajs/react";
import {GameContext} from "@/Components/Game/Game.jsx";

export default function NoTeamList ({players}) {
    const auth = useContext(AuthContext);
    const game = useContext(GameContext);

    console.log('game',game)
    const {post, processing, errors, reset} = useForm();
    const createTeams = (e) => {
        e.preventDefault();
        post(route('playerGame.create', [game.id, {
            game_id: game.id,
            players: players,
        }]));
    }

    return (
    <div className={`mx-auto`}>
        <h5 className={`mb-0`}>No Team List</h5>
        <ol>
            {players.map((player, playerIndex) => (<li key={playerIndex}>{player.first_name} {player.last_name}</li>))}
        </ol>
        {auth.user &&
        <form onSubmit={createTeams}>
            <button type="submit" className={`btn btn-primary`} disabled={processing}>Create Teams</button>
        </form>
        }
    </div>)
}
