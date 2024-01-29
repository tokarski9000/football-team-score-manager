export default function PlayerNameWithLink({player}) {
  return (
    <a href={route('player.show', player.id)} className="text-decoration-none">
      {player.first_name}
      {' '}
      {player.last_name}
    </a>
  );
}
