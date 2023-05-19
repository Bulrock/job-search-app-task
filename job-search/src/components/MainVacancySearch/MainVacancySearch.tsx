import { useEffect, useState } from 'react';

import Form from '@/components/Form/Form';
import SearchBar from '@/components/SearchBar/SearchBar';
import VacancyCard from '../VacancyCard/VacancyCard';
import VacanciesNavigation from '../Pagination/VacanciesNavigation';
import { LoaderRequest } from '../LoaderRequest/LoaderRequest';
import vacanciesService from '@/services/vacanciesService';
import authService from '@/services/authService';
import { INITIAL_FORM_QUERY } from '@/constants/initialFormQuery';
import classes from './MainVacancySearch.module.css';
import { IVacancy } from '@/types/vacancies';
import { IFormQuery } from '@/types/formQuery';

export default function MainVacancySearch() {
  const [page, setPage] = useState(0);
  const [vacancies, setVacancies] = useState<IVacancy[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [formQuery, setFormQuery] = useState<IFormQuery>(INITIAL_FORM_QUERY);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const expirationDate = localStorage.getItem('ttl');
    const { catalogKey, slaryFrom, slaryTo } = formQuery;

    if (!token || Date.now() / 1000 >= Number(expirationDate)) {
      authService().then(() => {
        setIsLoading(true);
        vacanciesService({
          page,
          payment_from: slaryFrom,
          payment_to: slaryTo,
          catalogues: catalogKey,
          keyword: '',
        })
          .then((data) => {
            setIsLoading(false);
            setVacancies(data);
            setTotal(Number(localStorage.getItem('total')));
          })
          .catch(() => {
            setIsLoading(false);
            setVacancies(null);
            setTotal(1);
          });
      });
    } else {
      setIsLoading(true);
      vacanciesService({
        page,
        payment_from: slaryFrom,
        payment_to: slaryTo,
        catalogues: catalogKey,
        keyword: '',
      })
        .then((data) => {
          setIsLoading(false);
          setVacancies(data);
          setTotal(Number(localStorage.getItem('total')));
        })
        .catch(() => {
          setIsLoading(false);
          setVacancies(null);
          setTotal(1);
        });
    }
  }, [formQuery, page]);

  return (
    <div className={classes.mainWrapper}>
      <Form onFilterSubmit={setFormQuery} />
      <div className={classes.responseRequestWrapper}>
        <SearchBar />
        {isLoading ? (
          <LoaderRequest />
        ) : (
          vacancies?.map((vacancy) => (
            <VacancyCard
              key={vacancy.id}
              title={vacancy.profession}
              salary={`з/п от ${vacancy.payment_from} ${vacancy.currency}`}
              schedule={vacancy.type_of_work.title}
              location={vacancy.town.title}
              id={vacancy.id}
            />
          ))
        )}
        <VacanciesNavigation onPageChange={setPage} total={total} />
      </div>
    </div>
  );
}
