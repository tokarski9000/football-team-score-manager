import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Layout from '@/Layouts/Layout.jsx';
import GameEdit from '@/Components/Game/GameEdit.jsx';

export default function create({ auth, game }) {
  const [playersArray, setPlayersArray] = useState([]);
  const {
    data, setData, post, processing, errors, reset,
  } = useForm({
    place: '',
    dateTime: '',
    players: [],
  });

  useEffect(() => {
    setData('players', playersArray);
  }, [playersArray]);

  if (!game) {
    return (
      <Layout auth={auth}>
        <h2>No game found</h2>
      </Layout>
    );
  }

  return (
    <Layout auth={auth}>
      { auth.user ? <GameEdit game={game} /> : null}
    </Layout>
  );
}
