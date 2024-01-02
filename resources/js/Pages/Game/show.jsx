import Layout from "@/Layouts/Layout.jsx";
import {useForm} from "@inertiajs/react";
import InputError from "@/Elements/InputError/InputError.jsx";
import {useEffect, useState} from "react";
import styles from './Game.module.scss';
import Game from "@/Components/Game/Game.jsx";

export default function create({ auth, game }) {
    const [playersArray, setPlayersArray] = useState([]);
    const { data, setData, post, processing, errors, reset } = useForm({
        place:"",
        date:"",
        players: [],
    });

    const playerHandler = (e) => {
        if(e.target.checked) {
            setPlayersArray( [...playersArray, e.target.value])
        } else {
            setPlayersArray(playersArray.filter(player => player !== e.target.value));
        }
    }

    useEffect(() => {
        setData('players', playersArray);
    }, [playersArray]);


    const submit = (e) => {
        e.preventDefault();
        post(route('game.create'));
    }
    console.log(game)

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
               <Game game={game} />
            }
            </div>
        </Layout>
    );
}
