import React, {useState} from "react";
import styles from './Game.module.scss';
import ScoreTable from "@/Components/ScoreTable/ScoreTable.jsx";
import NoTeamList from "@/Components/NoTeamList/NoTeamList.jsx";
import Modal from "@/Elements/Modal/Modal.jsx";
import {useForm} from "@inertiajs/react";

export default function Game({ game }) {
    const [modalOpen, setModalOpen] = useState(false);

    const team1 = game.players.filter(player => player.team_id === 1);
    const team2 = game.players.filter(player => player.team_id === 2);
    const noTeam = game.players.filter(player => player.team_id === null);

    const { data, setData, post, processing, errors, reset } = useForm();

    const openModal = (e) => {
        e.preventDefault();
        setModalOpen((prev) => !prev);
    }

    const deleteGame = (e) => {
        e.preventDefault();
        post(route('game.delete', [game.id]));
        setModalOpen(false);
    }

    return (
        <article className={`${styles.Game} row`}>
            <div className={'col-12 col-lg-3 mb-3 text-center text-lg-start'}>
                <a href={route('game.show', [game.id])}>
                    <h2>{game.score[1]} - {game.score[2]}</h2>
                </a>
                <h3>{game.place}</h3>
                <small>{game.date}</small>
            </div>
            <div className={'col-12 col-lg-9'}>
                <div className={`${styles.Table} row`}>
                    {noTeam.length >= 1 && (
                        <div className={`mb-3`}>
                            <NoTeamList players={noTeam}/>
                        </div>
                    )}
                    <div className={`col-6`}>
                        <ScoreTable team={team1}/>
                    </div>
                    <div className={`col-6`}>
                        <ScoreTable team={team2}/>
                    </div>
                </div>
            </div>
            <div className={'mt-5 row justify-content-center justify-content-lg-end gap-4'}>
                <a href={route('game.show', [game.id])} className={'col-5 col-lg-2'}>
                    <button >Edit</button>
                </a>
                <button onClick={openModal} className={'bg-danger border-danger col-5 col-lg-2'}>Delete</button>

                <Modal title={'Remove game'} open={modalOpen} handleOpen={openModal}>
                    <form onSubmit={deleteGame}>
                        <button className={'w-100 bg-danger border-danger col-5 col-lg-2'}>Delete</button>
                    </form>

                </Modal>

            </div>
        </article>
    );
}
