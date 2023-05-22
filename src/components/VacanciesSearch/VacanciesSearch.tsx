import { useEffect, useState } from 'react';

import Form from '@/components/Form/Form';
import SearchBar from '@/components/SearchBar/SearchBar';
import VacancyCard from '../VacancyCard/VacancyCard';
import VacanciesNavigation from '../Pagination/VacanciesNavigation';
import { LoaderRequest } from '../LoaderRequest/LoaderRequest';
import vacanciesService from '@/services/vacanciesService';
import authService from '@/services/authService';
import { INITIAL_FORM_QUERY, INITIAL_SEARCH_QUERY } from '@/constants/initialFormQuery';
import classes from './VacanciesSearch.module.css';
import cardClasses from '../VacancyCard/VacancyCard.module.css';
import { IVacancy } from '@/types/vacancies';
import { IFormQuery, ISearchQuery } from '@/types/formQuery';

export default function VacanciesSearch() {
  const [page, setPage] = useState(1);
  const [vacancies, setVacancies] = useState<IVacancy[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(false);
  const [formQuery, setFormQuery] = useState<IFormQuery>(INITIAL_FORM_QUERY);
  const [searchQuery, setSearchQuery] = useState<ISearchQuery>(INITIAL_SEARCH_QUERY);

  function handleFormSubmit(formQuery: IFormQuery) {
    setPage(1);
    setFormQuery(formQuery);
  }

  function handleSearchSubmit(searchQuery: ISearchQuery) {
    setPage(1);
    setSearchQuery(searchQuery);
  }

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const expirationDate = localStorage.getItem('ttl');
    const { industryKey: catalogKey, slaryFrom, slaryTo } = formQuery;
    const { keyword } = searchQuery;

    if (!token || Date.now() / 1000 >= Number(expirationDate)) {
      authService().then(() => {
        setIsLoading(true);
        vacanciesService({
          page,
          payment_from: slaryFrom,
          payment_to: slaryTo,
          catalogues: catalogKey,
          keyword,
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
            setError(true);
          });
      });
    } else {
      setIsLoading(true);
      vacanciesService({
        page,
        payment_from: slaryFrom,
        payment_to: slaryTo,
        catalogues: catalogKey,
        keyword,
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
          setError(true);
        });
    }
  }, [formQuery, page, searchQuery]);

  const renderVacancies = () => {
    if (error) {
      return (
        <span className={classes.error}>Упс, не удалось загрузить вакансии! Попробуйте снова</span>
      );
    }

    if (isLoading) {
      return <LoaderRequest />;
    } else {
      return vacancies?.map((vacancy) => (
        <VacancyCard
          key={vacancy.id}
          title={vacancy.profession}
          salary={`з/п от ${vacancy.payment_from} ${vacancy.currency}`}
          schedule={vacancy.type_of_work.title}
          location={vacancy.town.title}
          id={vacancy.id}
          classes={cardClasses}
        />
      ));
    }
  };

  return (
    <div className={classes.mainWrapper}>
      <Form onFormSubmit={handleFormSubmit} />
      <div className={classes.responseRequestWrapper}>
        <SearchBar onSearchSubmit={handleSearchSubmit} />
        {renderVacancies()}
        <VacanciesNavigation page={page} onPageChange={setPage} total={total} />
      </div>
    </div>
  );
}
