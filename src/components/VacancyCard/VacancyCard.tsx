import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import favouriteService from '@/services/favoriteService';
import favoriteInitialService from '@/services/favoriteInitialService';
import iconLocation from '../../../public/iconLocation.svg';
import iconStar from '../../../public/iconStar.svg';
import iconStarActive from '../../../public/iconStarActive.svg';
import defaultClasses from './VacancyCard.module.css';
import Link from 'next/link';

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
    router.push('/vacancy/[vacancyId]', `/vacancy/${id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className={computedClasses.cardWrapper}
      data-elem={`vacancy-${id}`}
    >
      <div className={computedClasses.leftSection}>
        <Link href={`/vacancy/${id}`}>
          <span className={computedClasses.title}>{title}</span>
        </Link>
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
        data-elem={`vacancy-${id}-shortlist-button`}
        src={active ? iconStarActive : iconStar}
        alt={'logo star'}
      />
    </div>
  );
}
