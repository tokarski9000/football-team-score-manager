import Layout from "@/Layouts/Layout.jsx";
import {useState} from "react";
import {useForm} from "@inertiajs/react";
import InputError from "@/Elements/InputError/InputError.jsx";

export default function Show({auth, player, games}) {
    const { data, setData, patch, processing, errors, reset } = useForm({
        first_name: player.first_name,
        last_name: player.last_name,
        nick_name: player.nick_name,
    });

    const updatePlayer = (e) => {
        e.preventDefault();
        patch(route('player.update', [player.id]));
    }

    return (
        <Layout auth={auth}>
            <article>
                <header>{player.first_name} {player.last_name}</header>
                <form onSubmit={updatePlayer}>
                    <label>
                        <input
                            id="first_name"
                            type="text"
                            name="first_name"
                            placeholder='First name'
                            value={data.first_name}
                            autoComplete="first_name"
                            onChange={(e) => setData('first_name', e.target.value)}
                            aria-invalid={errors.first_name ? true : null}
                        />
                        <InputError>{errors.first_name}</InputError>
                    </label>
                    <label>
                        <input
                            id="last_name"
                            type="text"
                            name="last_name"
                            placeholder='Last name'
                            value={data.last_name}
                            autoComplete="last_name"
                            onChange={(e) => setData('last_name', e.target.value)}
                            aria-invalid={errors.last_name ? true : null}
                        />
                        <InputError>{errors.last_name}</InputError>
                    </label>
                    <label>
                        <input
                            id="nick_name"
                            type="text"
                            name="nick_name"
                            placeholder='Nickname'
                            value={data.nick_name}
                            autoComplete="nick_name"
                            onChange={(e) => setData('nick_name', e.target.value)}
                            aria-invalid={errors.nick_name ? true : null}
                        />
                        <InputError>{errors.nick_name}</InputError>
                    </label>
                    <button type="submit" className={`btn btn-primary`} disabled={processing}>Update Player</button>
                </form>
                <footer>
                    <h2>Games</h2>
                    <ul>
                        {games.map((game, gameIndex) => <li>
                            <a href={route('game.show', [game.id])}>
                                {game.place}
                            </a>
                            <small>{game.date}</small>
                        </li>)}
                    </ul>
                </footer>
            </article>
        </Layout>
    )
}
