import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';

import vacancyDetailsService from '@/services/vacancyDetailsService';
import authService from '@/services/authService';
import { stringifySalary } from '@/services/stringifySalary';
import { VACANCY_DETAILS_ERROR, VACANCY_ERROR } from '@/constants/text';
import { IVacancy } from '@/types/vacancies';
import VacancyCard from '../VacancyCard/VacancyCard';
import { LoaderRequest } from '../LoaderRequest/LoaderRequest';
import classes from './VacancyDetails.module.css';
import cardClasses from './VacancyCard.module.css';

interface IVacancyDetailsProps {
  vacancyId: number;
}

export default function VacancyDetails({ vacancyId }: IVacancyDetailsProps) {
  const [vacancy, setVacancy] = useState<IVacancy | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const expirationDate = localStorage.getItem('ttl');
    const id = Number(window.location.pathname.split('/').pop());

    if (!token || Date.now() / 1000 >= Number(expirationDate)) {
      authService().then(() => {
        vacancyDetailsService({
          id: vacancyId || id,
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
        id: vacancyId || id,
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
  }, [vacancyId]);

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
              salary={stringifySalary(vacancy.payment_from, vacancy.payment_to, vacancy.currency)}
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
              <span className={classes.error}>{VACANCY_DETAILS_ERROR}</span>
            )}
          </>
        ) : (
          <span className={classes.error}>{VACANCY_ERROR}</span>
        )}
      </div>
    </div>
  );
}
