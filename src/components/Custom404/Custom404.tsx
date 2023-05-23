import Link from 'next/link';

import ButtonStandart from '../Buttons/Button/ButtonStandart';
import classes from './Custom404.module.css';

export default function Custom404() {
  return (
    <main className={classes.main}>
      <div className={classes.headers}>
        <h1 className={classes.errorCode}>404</h1>
        <h2 className={classes.errorMessage}>Страница не найдена</h2>
      </div>
      <Link legacyBehavior href="/">
        <a>
          <ButtonStandart
            height={42}
            width={250}
            color={''}
            text="Вернуться к поиску вакансий"
            option="default"
            setDataElem={false}
          />
        </a>
      </Link>
    </main>
  );
}
