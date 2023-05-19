import Form from '@/components/Form/Form';
import SearchBar from '@/components/SearchBar/SearchBar';
import VacancyCard from '../VacancyCard/VacancyCard';
import classes from './MainVacancySearch.module.css';
import { useEffect, useState } from 'react';
import vacanciesInitialService from '@/services/vacanciesInitialService';
import authService from '@/services/authService';
import { IVacancy } from '@/types/vacancies';

export default function MainVacancySearch() {
  const [page, setPage] = useState('0');
  const [vacancies, setVacancies] = useState<IVacancy[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const expirationDate = localStorage.getItem('ttl');

    if (!token || Date.now() / 1000 >= Number(expirationDate)) {
      authService().then(() => {
        vacanciesInitialService(page)
          .then((data) => {
            setIsLoading(false);
            setVacancies(data);
          })
          .catch(() => {
            setIsLoading(false);
            setVacancies(null);
          });
      });
    } else {
      vacanciesInitialService(page)
        .then((data) => {
          setIsLoading(false);
          setVacancies(data);
        })
        .catch(() => {
          setIsLoading(false);
          setVacancies(null);
        });
    }
  }, [page]);

  return (
    <div className={classes.mainWrapper}>
      <Form />
      <div className={classes.responseRequestWrapper}>
        <SearchBar />
        {vacancies?.map((vacancy) => (
          <VacancyCard
            key={vacancy.id}
            title={vacancy.profession}
            salary={`з/п от ${vacancy.payment_from} ${vacancy.currency}`}
            schedule={vacancy.type_of_work.title}
            location={vacancy.town.title}
            id={vacancy.id}
          />
        ))}
      </div>
    </div>
  );
}
