import Form from '@/components/Form/Form';
import SearchBar from '@/components/SearchBar/SearchBar';
import classes from './MainVacancySearch.module.css';

export default function MainVacancySearch() {
  return (
    <div className={classes.mainWrapper}>
      <Form />
      <SearchBar />
    </div>
  );
}
