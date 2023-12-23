import { Link, Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <Layout auth={auth}>
            <Head title="Welcome" />
        </Layout>
    );
}
