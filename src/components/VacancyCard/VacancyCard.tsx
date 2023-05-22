import { useEffect, useState } from 'react';
import Image from 'next/image';

import iconLocation from '../../../public/iconLocation.svg';
import iconStar from '../../../public/iconStar.svg';
import iconStarActive from '../../../public/iconStarActive.svg';
import defaultClasses from './VacancyCard.module.css';
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
  classes: { [key: string]: string | undefined };
}

export default function VacancyCard({
  title,
  salary,
  schedule,
  location,
  id,
  onFavoriteRemove,
  classes,
}: IVacancyCardProps) {
  const [active, setActive] = useState(false);
  const router = useRouter();
  const computedClasses = classes ? classes : defaultClasses;

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
    <div onClick={handleCardClick} className={computedClasses.cardWrapper}>
      <div className={computedClasses.leftSection}>
        <span className={computedClasses.title}>{title}</span>
        <div className={computedClasses.salaryScheduleWrapper}>
          <span className={computedClasses.salary}>{salary}</span>
          <span className={computedClasses.dot}>•</span>
          <span className={computedClasses.schedule}>{schedule}</span>
        </div>
        <div className={computedClasses.locationWrapper}>
          <Image src={iconLocation} alt={'logo location'} />
          <span className={computedClasses.location}>{location}</span>
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
