import { useState } from 'react';
import Image from 'next/image';

import iconLocation from '../../../public/iconLocation.svg';
import iconStar from '../../../public/iconStar.svg';
import iconStarActive from '../../../public/iconStarActive.svg';
import classes from './VacancyCard.module.css';

interface IVacancyCardProps {
  title: string;
  salary: string;
  schedule: string;
  location: string;
}

export default function VacancyCard({ title, salary, schedule, location }: IVacancyCardProps) {
  const [active, setActive] = useState(false);

  const handleFavoriteClick = () => {
    setActive(!active);
  };

  return (
    <div className={classes.cardWrapper}>
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
