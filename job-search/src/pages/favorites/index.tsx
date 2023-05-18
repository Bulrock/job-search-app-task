import Header from '@/components/Header/Header';
import Head from 'next/head';

export default function Favorites() {
  return (
    <>
      <Head>
        <title>Favorites</title>
        <meta name="description" content="Favorites" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
    </>
  );
}
