import Modal from "@/Elements/Modal/Modal.jsx";
import {AuthContext} from "@/Layouts/Layout.jsx";
import {useContext, useState} from "react";
import {useForm} from "@inertiajs/react";

export default function EditButtons({ game }) {
    const [modalOpen, setModalOpen] = useState(false);

    const auth = useContext(AuthContext);

    const { post, patch } = useForm();

    const openModal = (e) => {
        e.preventDefault();
        setModalOpen((prev) => !prev);
    }

    const resetTeams = (e) => {
        e.preventDefault();
        patch(route('playerGame.reset', [game.id]));
    }
    const deleteGame = (e) => {
        e.preventDefault();
        post(route('game.delete', [game.id]));
        setModalOpen(false);
    }

    return (
        <>{
            auth.user && (
                <div
                    className={'mt-5 row justify-content-center justify-content-lg-end gap-4 d-flex'}>
                    <form onSubmit={resetTeams} className={``}>
                        <button
                            className={'bg-primary border-primary'}>Reset teams
                        </button>
                    </form>
                    <button onClick={openModal}
                            className={'bg-danger border-danger'}>Delete game
                    </button>
                    <a href={route('game.edit', game.id)}>Edit</a>
                    <Modal title={'Remove game'} open={modalOpen}
                           handleOpen={openModal}>
                        <p className={'mb-5'}>Are you sure you want to delete this game?</p>
                        <form onSubmit={deleteGame}>
                            <button
                                className={'w-100 bg-danger border-danger'}>Delete game
                            </button>
                        </form>
                    </Modal>
                </div>
            )
        }</>
    )
}
