/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import classes from "./style.module.scss";

const MoreCard = ({ meal }) => {
  const navigate = useNavigate();

  return (
    <div
      className={classes.card}
      onClick={() => {
        navigate(`/recipe/${meal.name}`);
      }}
    >
      <div className={classes.thumbContainer}>
        <img src={meal?.thumb} alt="thumb-meal" className={classes.thumb} />
      </div>
      <h5 className={classes.name}>{meal?.name}</h5>
    </div>
  );
};

export default MoreCard;
