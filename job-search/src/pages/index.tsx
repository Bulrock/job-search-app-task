import Head from 'next/head';
import React from 'react';
import Header from '@/components/Header/Header';
import MainVacancySearch from '@/components/MainVacancySearch/MainVacancySearch';

export default function VacancySearch() {
  return (
    <>
      <Head>
        <title>Vacancy Search Page</title>
        <meta name="description" content="Vacancy Search Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <MainVacancySearch />
    </>
  );
}
