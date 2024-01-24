import style from './ScoreTable.module.scss';
import PlayerIcon from "@/Components/Icons/PlayerIcon.jsx";
import BallIcon from "@/Components/Icons/BallIcon.jsx";
import {useForm} from "@inertiajs/react";

export default function ScoreTable({ team }) {
    const { data, setData, post, processing, errors, reset } = useForm({});

    return (
        <div className={`${style.ScoreTable}`}>
            <div className={`row border-bottom pb-2`}>
                <h5 className={`col-8 m-0`}><PlayerIcon height={10} width={10} /> </h5>
                <h5 className={`col-4 m-0`}><BallIcon height={10} width={10} /></h5>
            </div>
            <div className={`row`}>
            {
                team.map((player, playerIndex) => (
                    <div key={playerIndex} className={`${style.Player} row border-bottom`}>
                        <div className={`d-flex justify-content-start align-items-center col-8`}>{player.first_name} {player.last_name}</div>
                        <div className={`d-flex justify-content-center justify-content-sm-start align-items-center col-4`}>
                            {player.goals}
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
    )
}
