import Layout from "@/Layouts/Layout.jsx";
import {useForm} from "@inertiajs/react";
import GameEdit from "@/Components/Game/GameEdit.jsx";
import {useEffect, useState} from "react";

export default function create({ auth, game }) {
    const [playersArray, setPlayersArray] = useState([]);
    const { data, setData, post, processing, errors, reset } = useForm({
        place:"",
        date:"",
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
            )
    }

    return (
        <Layout auth={auth}>
            <div className={`container`}>
            { auth.user &&
               <GameEdit game={game} />
            }
            </div>
        </Layout>
    );
}
