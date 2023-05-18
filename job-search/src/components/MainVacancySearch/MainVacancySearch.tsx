import Form from '@/components/Form/Form';
import SearchBar from '@/components/SearchBar/SearchBar';
import VacancyCard from '../VacancyCard/VacancyCard';
import classes from './MainVacancySearch.module.css';

export default function MainVacancySearch() {
  return (
    <div className={classes.mainWrapper}>
      <Form />
      <div className={classes.responseRequestWrapper}>
        <SearchBar />
        <VacancyCard
          title={'Менеджер-дизайнер'}
          salary={'з/п от 70000 rub'}
          schedule={'Полный рабочий день'}
          location={'Новый Уренгой'}
        />
      </div>
    </div>
  );
}
