import ArrowLeftRightIcon from "@/Components/Icons/ArrowLeftRight.jsx";
import {GameEditContext} from "@/Components/Game/GameEdit.jsx";
import {useForm} from "@inertiajs/react";
import {useContext} from "react";

export default function ChangeTeamForm({player}) {
  const game = useContext(GameEditContext);
  const { patch } = useForm();
  const formId = `player-${player.id}-change-team`;
  const handleChangeTeam = (e, playerId) => {
    e.preventDefault();
    patch(route('playerGame.changeTeam', [game.id, { player_id: playerId}]),
      {
        onSuccess: () => {
          const element = document.getElementById(formId);
          element.scrollIntoView({
            block: "center",
            behavior: "instant"
          });
        },
      }
    );
  }

  return (
    <form
      onSubmit={(e) => handleChangeTeam(e, player.id)}
      className={'mb-0 me-1'}
      id={formId}
    >
      <button
        className={'bg-secondary border-0 d-flex justify-content-center align-items-center mt-0 mb-0 p-1'}
        type={"submit"}>
        <ArrowLeftRightIcon/>
      </button>
    </form>
  )
}
