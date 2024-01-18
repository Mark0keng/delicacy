import { useNavigate, useParams } from "react-router-dom";
import DetailCard from "../../components/DetailCard";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { callAPI } from "../../domain/api";

import classes from "./style.module.scss";
import { Grid, Typography } from "@mui/material";
import MoreCard from "../../components/MoreCard";

const Detail = () => {
  const { name } = useParams();
  const [meal, setMeal] = useState([]);
  const [moreMeals, setMoreMeals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMeal();
  }, []);

  const fetchMeal = async () => {
    try {
      const fetchDetail = await callAPI(`/search.php?s=${name}`, "GET");

      const resultDetail = fetchDetail?.meals?.map((item) => {
        return {
          id: item.idMeal,
          name: item.strMeal,
          category: item.strCategory,
          instruction: item.strInstructions,
          thumb: item.strMealThumb,
          ingredient1: item.strIngredient1,
          ingredient2: item.strIngredient2,
          ingredient3: item.strIngredient3,
          ingredient4: item.strIngredient4,
          measure1: item.strMeasure1,
          measure2: item.strMeasure2,
          measure3: item.strMeasure3,
          measure4: item.strMeasure4,
        };
      });

      const fetchMore = await callAPI(
        `/filter.php?c=${resultDetail[0].category}`,
        "GET"
      );
      const resultMore = fetchMore?.meals?.map((item) => {
        return {
          name: item.strMeal,
          thumb: item.strMealThumb,
        };
      });

      // console.log(modifiedData[0].category);
      setMoreMeals(resultMore);
      setMeal(resultDetail[0]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={classes.container}>
      <Navbar />

      <DetailCard meal={meal} />

      <Typography
        variant="h6"
        gutterBottom
        style={{
          cursor: "pointer",
          lineHeight: "5",
          fontSize: "24px",
          fontWeight: 700,
          color: "#404040",
        }}
      >
        More Recipes
      </Typography>

      <div className={classes.moreCardContainer}>
        {moreMeals?.map((meal, index) => {
          return <MoreCard meal={meal} key={index} />;
        })}
      </div>
    </div>
  );
};

export default Detail;
