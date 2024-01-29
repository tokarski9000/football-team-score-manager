import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import React from "react";
import Game from "@/Components/Game/Game.jsx";
export default function Welcome({ auth, games }) {
    return (
        <Layout auth={auth}>
            <Head title="Podwórkowa liga szóstek" />
            <div className={`container`}>
                { games.map((game, gameIndex) => (
                    <Game key={gameIndex} game={game} />
                ))}
            </div>
        </Layout>
    );
}
