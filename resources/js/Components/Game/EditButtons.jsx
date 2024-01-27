import Modal from "@/Elements/Modal/Modal.jsx";
import {AuthContext} from "@/Layouts/Layout.jsx";
import {useContext, useState} from "react";
import {useForm} from "@inertiajs/react";

export default function EditButtons({ game }) {
    const [modalOpen, setModalOpen] = useState(false);

    const auth = useContext(AuthContext);

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
        <>{
            auth.user && (
                <div
                    className={'mt-5 row justify-content-center justify-content-lg-end gap-4'}>
                    <a href={route('game.show', [game.id])}
                       className={'col-5 col-lg-2'}>
                        <button>Edit</button>
                    </a>
                    <button onClick={openModal}
                            className={'bg-danger border-danger col-5 col-lg-2'}>Delete
                    </button>

                    <Modal title={'Remove game'} open={modalOpen}
                           handleOpen={openModal}>
                        <form onSubmit={deleteGame}>
                            <button
                                className={'w-100 bg-danger border-danger col-5 col-lg-2'}>Delete
                            </button>
                        </form>

                    </Modal>
                </div>
            )
        }</>
    )
}
