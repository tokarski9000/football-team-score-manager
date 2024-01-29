import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Layout from '@/Layouts/Layout.jsx';
import InputError from '@/Elements/InputError/InputError.jsx';
import styles from './Game.module.scss';

export default function create({ auth, players }) {
  const [playersArray, setPlayersArray] = useState([]);
  const {
    data, setData, post, processing, errors, reset,
  } = useForm({
    place: '',
    date: '',
    players: [],
  });

  const playerHandler = (e) => {
    if (e.target.checked) {
      setPlayersArray([...playersArray, e.target.value]);
    } else {
      setPlayersArray(playersArray.filter((player) => player !== e.target.value));
    }
  };

  useEffect(() => {
    setData('players', playersArray);
  }, [playersArray]);

  const submit = (e) => {
    e.preventDefault();
    post(route('game.create'));
  };

  return (
    <Layout auth={auth}>
      <article>
        <header>Create a game</header>
        { auth.user ? (
          <form onSubmit={submit}>
            <label>
              <input
                id="place"
                type="text"
                name="place"
                placeholder="Place"
                value={data.place}
                autoComplete="place"
                onChange={(e) => setData('place', e.target.value)}
                aria-invalid={errors.place ? true : null}
              />
              <InputError>{errors.place}</InputError>
            </label>
            <label>
              <input
                id="date"
                type="date"
                name="date"
                value={data.date}
                placeholder="Date"
                autoComplete="date"
                onChange={(e) => setData('date', e.target.value)}
                aria-invalid={errors.date ? true : null}
              />
              <InputError>{errors.date}</InputError>
            </label>

            { players.map((player, index) => (
              <label className={styles.Player} key={index}>
                <input
                  id={`player-${index}`}
                  type="checkbox"
                  name={`player-${index}`}
                  value={player.id}
                  placeholder="Date"
                  autoComplete="date"
                  onChange={playerHandler}
                  aria-invalid={errors.players ? true : null}
                />
                {player.first_name}
                {' '}
                {player.last_name}
              </label>
            ))}
            <InputError>{errors.players}</InputError>

            <button type="submit">Create</button>
          </form>
        ) : null}
      </article>
    </Layout>
  );
}
