import Head from 'next/head';
import Header from '@/components/Header/Header';
import VacanciesSearch from '@/components/VacanciesSearch/VacanciesSearch';

export default function VacancySearchPage() {
  return (
    <>
      <Head>
        <title>Vacancy Search Page</title>
        <meta name="description" content="Vacancy Search Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <VacanciesSearch />
    </>
  );
}
