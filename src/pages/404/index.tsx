import Head from 'next/head';

import Custom404 from '../../components/Custom404/Custom404';

export default function Custom404Page() {
  return (
    <>
      <Head>
        <title>{'Job Search - Страница не найдена - 404'}</title>
        <meta name="description" content={'Job Search - Страница не найдена - 404'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Custom404 />
    </>
  );
}
