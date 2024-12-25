import { useContext, useState } from 'react';
import { useForm } from '@inertiajs/react';
import Modal from '@/Elements/Modal/Modal.jsx';
import { AuthContext } from '@/Layouts/Layout.jsx';

export default function EditButtons({ game }) {
  const [modalOpen, setModalOpen] = useState(false);

  const auth = useContext(AuthContext);

  const { patch, submit } = useForm();

  const openModal = (e) => {
    e.preventDefault();
    setModalOpen((prev) => !prev);
  };

  const resetTeams = (e) => {
    e.preventDefault();
    patch(route('playerGame.reset', [game.id]));
  };
  const deleteGame = (e) => {
    e.preventDefault();
    submit('delete', route('game.delete', [game.id]));
    setModalOpen(false);
  };

  return (
    <>
      {
        auth.user ? (
          <div
            className="mt-5 row justify-content-center justify-content-lg-end gap-4 d-flex"
          >
            <div className="col-lg-3">
              <form onSubmit={resetTeams} className="mb-0 pb-0">
                <button
                  className="bg-primary border-primary"
                >
                  Reset teams
                </button>
              </form>
            </div>
            <div className="col-lg-3">
              <a
                className="btn btn-primary"
                href={route('game.edit', game.id)}
              >
                <button>Edit Game</button>
              </a>
            </div>
            <div className="col-lg-3">
              <button
                onClick={openModal}
                className="bg-danger border-danger"
              >
                Delete game
              </button>
            </div>
            <Modal
              title="Remove game"
              open={modalOpen}
              handleOpen={openModal}
            >
              <p className="mb-5">Are you sure you want to delete this game?</p>
              <form onSubmit={deleteGame}>
                <button
                  className="w-100 bg-danger border-danger"
                >
                  Delete game
                </button>
              </form>
            </Modal>
          </div>
        ) : null
        }
    </>
  );
}
