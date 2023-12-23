import { Link } from '@inertiajs/react';
import '@picocss/pico'
import Layout from './Layout';

export default function Guest({ auth, children }) {

    return (
        <Layout auth={{user: null}}>
            {children}
        </Layout>
    );
}
