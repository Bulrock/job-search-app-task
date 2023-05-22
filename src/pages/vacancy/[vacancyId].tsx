import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header/Header';
import VacancyDetails from '@/components/VacancyDetails/VacancyDetails';

export default function VacancyPage() {
  const router = useRouter();
  const [id, setId] = useState<number>(Number(router.query.vacancyId));

  useEffect(() => {
    setId(Number(router.query.vacancyId));
  }, [id, router.query.vacancyId]);

  return (
    <>
      <Head>
        <title>{`Vacancy Page: ${id ? id : ''}`}</title>
        <meta name="description" content="Vacancy Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="./favicon.ico" />
      </Head>
      <Header />
      <VacancyDetails vacancyId={id} />
    </>
  );
}
