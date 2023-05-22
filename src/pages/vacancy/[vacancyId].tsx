import Head from 'next/head';
// import { useRouter } from 'next/router';
import Header from '@/components/Header/Header';
import VacancyDetails from '@/components/VacancyDetails/VacancyDetails';

export default function VacancyPage() {
  // const router = useRouter();

  return (
    <>
      <Head>
        <title>Vacancy Page</title>
        <meta name="description" content="Vacancy Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="./favicon.ico" />
      </Head>
      <Header />
      <VacancyDetails />
    </>
  );
}

// vacancyId={Number(router.query.vacancyId)}
