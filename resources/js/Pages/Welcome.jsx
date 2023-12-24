import { Link, Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function Welcome({ auth, games }) {
    console.log(games)

    return (
        <Layout auth={auth}>
            <Head title="Welcome" />
            <div className={`container`}>
                { games.map((game, gameIndex) => (
                    <details>
                        <summary>{game.date} - {game.place}</summary>
                        <table>
                            <thead>
                                <tr>
                                    {
                                        game.teams.map((team) => (
                                            <th>{team.name}</th>
                                        ))
                                    }
                                </tr>
                            </thead>
                            <tbody>
                            {
                                games[gameIndex].teams[0].map((player, playerIndex) => (
                                    <tr>
                                        <td>{player.first_name}</td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>

                    </details>
                ))}
            </div>
        </Layout>
    );
}
