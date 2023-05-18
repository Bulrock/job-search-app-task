import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import classes from './Header.module.css';
import logo from '../../../public/logo.svg';

export default function Header() {
  const router = useRouter();

  return (
    <header className={classes.headerWrapper}>
      <Image src={logo} alt="logo" />
      <div className={classes.header}>
        <div className={classes.links}>
          <Link legacyBehavior href="/">
            <a className={router.pathname == '/' ? classes.active : classes.notactive}>
              Поиск Вакансий
            </a>
          </Link>
          <Link legacyBehavior href="/favorites">
            <a className={router.pathname == '/favorites' ? classes.active : classes.notactive}>
              Избранное
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
}
