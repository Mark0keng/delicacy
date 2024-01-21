/* eslint-disable react/prop-types */
import { Button, Typography } from "@mui/material";
import classes from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const DetailCard = ({ meal, param }) => {
  const [favorite, setFavorite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFavorite();
  }, [meal, favorite]);

  const postFavorite = async (data) => {
    try {
      await axios.post(`http://localhost:3000/favorites`, data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFavorite = async () => {
    try {
      const res = await axios
        .get(`http://localhost:3000/favorites`)
        .then((response) => {
          return response;
        });

      const finalRes = res?.data?.filter((item) => {
        return item.id == meal.id;
      });

      finalRes.length !== 0 ? setFavorite(true) : setFavorite(false);
    } catch (error) {
      console.log(error);
    }
  };

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
        <img src={meal?.thumb} alt="" className={classes.thumbImage} />
      </div>
      <div className={classes.foodName}>{meal?.name}</div>
      <Typography
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: "8",
          WebkitBoxOrient: "vertical",
          fontSize: "14px",
          fontWeight: "400",
        }}
      >
        {meal?.instruction}
      </Typography>
      {/* <div className={classes.foodDesc}>{meal?.instruction}</div> */}
      <h3 className={classes.textIngredients}>Ingredients</h3>
      <div className={classes.recipeContainer}>
        <div className={classes.ingredientsContainer}>
          <div className={classes.iconContainer}>
            <img src="" alt="icon" className={classes.icon} />
          </div>
          <div>
            <p className={classes.ingredient}>{meal?.ingredient1}</p>
            <p className={classes.measure}>{meal?.measure1}</p>
          </div>
        </div>
        <div className={classes.ingredientsContainer}>
          <div className={classes.iconContainer}>
            <img src="" alt="icon" className={classes.icon} />
          </div>
          <div>
            <p className={classes.ingredient}>{meal?.ingredient2}</p>
            <p className={classes.measure}>{meal?.measure2}</p>
          </div>
        </div>
        <div className={classes.ingredientsContainer}>
          <div className={classes.iconContainer}>
            <img src="" alt="icon" className={classes.icon} />
          </div>
          <div>
            <p className={classes.ingredient}>{meal?.ingredient3}</p>
            <p className={classes.measure}>{meal?.measure3}</p>
          </div>
        </div>
        <div className={classes.ingredientsContainer}>
          <div className={classes.iconContainer}>
            <img src="" alt="icon" className={classes.icon} />
          </div>
          <div>
            <p className={classes.ingredient}>{meal?.ingredient4}</p>
            <p className={classes.measure}>{meal?.measure4}</p>
          </div>
        </div>
      </div>

      <div className={classes.actionContainer}>
        {param && (
          <Button
            variant="outlined"
            onClick={() => {
              navigate(`/recipe/${meal?.name}`);
            }}
          >
            Detail
          </Button>
        )}

        {favorite && (
          <Button
            variant="outlined"
            onClick={() => {
              deleteFavorite(meal?.id);
              setFavorite(false);
            }}
            color="error"
          >
            Remove from Favorite
          </Button>
        )}

        {!favorite && (
          <Button
            variant="outlined"
            onClick={() => {
              postFavorite({
                id: meal?.id,
                name: meal?.name,
                thumb: meal?.thumb,
              });
              setFavorite(true);
            }}
          >
            Add to Favorite
          </Button>
        )}
      </div>
    </div>
  );
};

export default DetailCard;
