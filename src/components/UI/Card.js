import classes from './Card.module.css';

const Card = (props) => {
  return (
    <div className={classes.outer}>
      <div className={classes.inner}>{props.children}</div>;
    </div>
  );
};

export default Card;
