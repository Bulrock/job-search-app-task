import { useEffect, useState } from 'react';
import Image from 'next/image';

import iconLocation from '../../../public/iconLocation.svg';
import iconStar from '../../../public/iconStar.svg';
import iconStarActive from '../../../public/iconStarActive.svg';
import classes from './VacancyCard.module.css';
import favouriteService from '@/services/favoriteService';
import favoriteInitialService from '@/services/favoriteInitialService';
import { useRouter } from 'next/router';

interface IVacancyCardProps {
  title: string;
  salary: string;
  schedule: string;
  location: string;
  id: number;
  onFavoriteRemove?: () => void;
}

export default function VacancyCard({
  title,
  salary,
  schedule,
  location,
  id,
  onFavoriteRemove,
}: IVacancyCardProps) {
  const [active, setActive] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setActive(favoriteInitialService(id));
  }, [id]);

  const handleFavoriteClick = (event: React.MouseEvent<HTMLImageElement>) => {
    event.stopPropagation();
    setActive(!favouriteService(id));
    if (onFavoriteRemove) {
      onFavoriteRemove();
    }
  };

  const handleCardClick = () => {
    router.push(`/vacancy/${id}`);
  };

  return (
    <div onClick={handleCardClick} className={classes.cardWrapper}>
      <div className={classes.leftSection}>
        <span className={classes.title}>{title}</span>
        <div className={classes.salaryScheduleWrapper}>
          <span className={classes.salary}>{salary}</span>
          <span className={classes.dot}>•</span>
          <span className={classes.schedule}>{schedule}</span>
        </div>
        <div className={classes.locationWrapper}>
          <Image src={iconLocation} alt={'logo location'} />
          <span className={classes.location}>{location}</span>
        </div>
      </div>
      <Image
        onClick={handleFavoriteClick}
        src={active ? iconStarActive : iconStar}
        alt={'logo star'}
      />
    </div>
  );
}