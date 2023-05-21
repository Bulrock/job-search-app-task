import Link from 'next/link';
import classes from './Custom404.module.css';
import ButtonStandart from '../Buttons/Button/ButtonStandart';

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
            color={'#3B7CD3'}
            text="Вернуться к поиску вакансий"
            option="default"
          />
        </a>
      </Link>
    </main>
  );
}
