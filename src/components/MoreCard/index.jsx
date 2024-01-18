/* eslint-disable react/prop-types */
import { useLocation, useNavigate } from "react-router-dom";
import classes from "./style.module.scss";
import { Button } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";

const MoreCard = ({ meal }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  console.log(pathname);

  // useEffect(() => {
  //   deleteFavorite();
  // }, [meal]);

  const deleteFavorite = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/favorites/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.card}>
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
            navigate(0);
          }}
        >
          Remove from Favorite
        </Button>
      )}
    </div>
  );
};

export default MoreCard;
