import { Head } from '@inertiajs/react';
import React from 'react';
import Layout from '@/Layouts/Layout';
import Game from '@/Components/Game/Game.jsx';

export default function Welcome({ auth, games }) {
  return (
    <Layout auth={auth}>
      <Head title="Podwórkowa liga szóstek" />
      { games.map((game, gameIndex) => (
        <Game key={gameIndex} game={game} />
      ))}
    </Layout>
  );
}
