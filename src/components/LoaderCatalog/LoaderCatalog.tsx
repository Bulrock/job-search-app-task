import classes from './LoaderCatalog.module.css';

function LoaderCatalog() {
  return (
    <div className={classes['lds-ellipsis']}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default LoaderCatalog;
