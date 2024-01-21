/* eslint-disable react/prop-types */
import { useLocation, useNavigate } from "react-router-dom";
import classes from "./style.module.scss";
import { Button } from "@mui/material";
import axios from "axios";

const MoreCard = ({ meal, refetch }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const deleteFavorite = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/favorites/${id}`);
      await refetch();
    } catch (error) {
      console.log(error);
    }
  };

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

      {pathname === "/favorites" && (
        <Button
          variant="outlined"
          size="small"
          color="error"
          onClick={() => {
            deleteFavorite(meal.id);
          }}
        >
          Remove from Favorite
        </Button>
      )}
    </div>
  );
};

export default MoreCard;
