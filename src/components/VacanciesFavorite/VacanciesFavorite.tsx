import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import vacancyFavoritesService from '@/services/vacanciesFavoritesService';
import authService from '@/services/authService';
import { VACANCIES_FAVORITE_ERROR, VACANCIES_FAVORITE_ABSENT } from '@/constants/text';
import { IVacancy } from '@/types/vacancies';
import VacancyCard from '../VacancyCard/VacancyCard';
import ButtonStandart from '../Buttons/Button/ButtonStandart';
import { LoaderRequest } from '../LoaderRequest/LoaderRequest';
import VacanciesNavigation from '../Pagination/VacanciesNavigation';
import iconNothing from '../../../public/iconNothing.svg';
import classes from './VacanciesFavorite.module.css';
import cardClasses from '../VacancyCard/VacancyCard.module.css';

export default function VacanciesFavorite() {
  const [vacancies, setVacancies] = useState<IVacancy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const pagesAmount = Math.ceil(favoriteIds.length / 4);

  useEffect(() => {
    setFavoriteIds(JSON.parse(localStorage.getItem('favorites') || '[]'));
  }, []);

  const refreshFavorites = useCallback(() => {
    const token = localStorage.getItem('access_token');
    const expirationDate = localStorage.getItem('ttl');

    if (!token || Date.now() / 1000 >= Number(expirationDate)) {
      setIsLoading(true);
      authService().then(() => {
        vacancyFavoritesService(page)
          .then((data) => {
            setIsLoading(false);
            setVacancies(data);
          })
          .catch(() => {
            setError(true);
            setIsLoading(false);
            setVacancies([]);
          });
      });
    } else {
      setIsLoading(true);
      vacancyFavoritesService(page)
        .then((data) => {
          setIsLoading(false);
          setVacancies(data);
        })
        .catch(() => {
          setError(true);
          setIsLoading(false);
          setVacancies([]);
        });
    }
  }, [page]);

  useEffect(() => {
    if (page > pagesAmount) {
      setPage(pagesAmount - 1);
      return;
    }
    refreshFavorites();
  }, [page, favoriteIds, refreshFavorites, pagesAmount]);

  const handleFavoriteRemove = () => {
    setFavoriteIds(JSON.parse(localStorage.getItem('favorites') || '[]'));
  };

  if (error) {
    return (
      <div className={classes.mainWrapper}>
        <div className={classes.responseWrapper}>
          <span className={classes.error}>{VACANCIES_FAVORITE_ERROR}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.mainWrapper}>
      <div className={classes.responseWrapper}>
        {isLoading ? (
          <LoaderRequest />
        ) : vacancies && vacancies?.length !== 0 && !error ? (
          vacancies.map((vacancy) => (
            <VacancyCard
              key={vacancy.id}
              title={vacancy.profession}
              salary={`з/п от ${vacancy.payment_from} ${vacancy.currency}`}
              schedule={vacancy.type_of_work.title}
              location={vacancy.town.title}
              id={vacancy.id}
              onFavoriteRemove={handleFavoriteRemove}
              classes={cardClasses}
            />
          ))
        ) : (
          <div className={classes.vacanciesAbsentWrapper}>
            <Image width={240} src={iconNothing} alt="no vacancies" priority />
            <span className={classes.absentTitle}>{VACANCIES_FAVORITE_ABSENT}</span>
            <Link legacyBehavior href="/">
              <a>
                <ButtonStandart
                  height={42}
                  width={164}
                  color={'#3B7CD3'}
                  text="Поиск Вакансий"
                  option="light"
                  setDataElem={false}
                />
              </a>
            </Link>
          </div>
        )}
        {vacancies ? (
          <VacanciesNavigation total={pagesAmount} onPageChange={setPage} page={page} />
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
