import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';

import VacancyCard from '../VacancyCard/VacancyCard';
import { LoaderRequest } from '../LoaderRequest/LoaderRequest';
import vacancyDetailsService from '@/services/vacancyDetailsService';
import authService from '@/services/authService';
import { VACANCY_DETAILS } from '@/constants/vacancyDetails';
import { IVacancy } from '@/types/vacancies';
import classes from './VacancyDetails.module.css';
import cardClasses from './VacancyCard.module.css';

export default function VacancyDetails() {
  const [vacancy, setVacancy] = useState<IVacancy | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const expirationDate = localStorage.getItem('ttl');
    const id = Number(window.location.pathname.split('/').pop());

    if (!token || Date.now() / 1000 >= Number(expirationDate)) {
      authService().then(() => {
        setIsLoading(true);
        vacancyDetailsService({
          id: id,
        })
          .then((data) => {
            setIsLoading(false);
            setVacancy(data);
          })
          .catch(() => {
            setIsLoading(false);
            setVacancy(null);
          });
      });
    } else {
      setIsLoading(true);
      vacancyDetailsService({
        id: id,
      })
        .then((data) => {
          setIsLoading(false);
          setVacancy(data);
        })
        .catch(() => {
          setIsLoading(false);
          setVacancy(null);
        });
    }
  }, []);

  return (
    <div className={classes.mainWrapper}>
      <div className={classes.responseRequestWrapper}>
        {isLoading ? (
          <LoaderRequest />
        ) : vacancy ? (
          <>
            <VacancyCard
              key={vacancy.id}
              title={vacancy.profession}
              salary={`з/п от ${vacancy.payment_from} ${vacancy.currency}`}
              schedule={vacancy.type_of_work?.title}
              location={vacancy.town?.title}
              id={vacancy.id}
              classes={cardClasses}
            />
            {vacancy.vacancyRichText ? (
              <div
                className={classes.content}
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(vacancy.vacancyRichText) }}
              ></div>
            ) : (
              <div
                className={classes.content}
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(VACANCY_DETAILS) }}
              ></div>
            )}
          </>
        ) : (
          <span className={classes.error}>
            Упс, не удалось загрузить вакансию! Попробуйте снова
          </span>
        )}
      </div>
    </div>
  );
}
