import { useEffect, useState } from "react";
import axios from "axios";

import classes from "./style.module.scss";

import { callAPI } from "../../domain/api";
import { Typography } from "@mui/material";

import Navbar from "../../components/Navbar";
import DetailCard from "../../components/DetailCard";
import MoreCard from "../../components/MoreCard";
import { useSearchParams } from "react-router-dom";
import Navigation from "../../components/Navigation";

const Home = () => {
  const [searchParams] = useSearchParams();

  const [meals, setMeals] = useState([]);
  const [moreMeals, setMoreMeals] = useState([]);
  const [activeCategory, setActiveCategory] = useState(
    searchParams.get("menu") || "Beef"
  );

  useEffect(() => {
    fetchMeals();
  }, []);

  useEffect(() => {
    setActiveCategory(searchParams.get("menu"));
  }, [searchParams]);

  useEffect(() => {
    fetchMeals();
  }, [activeCategory]);

  const fetchMeals = async () => {
    try {
      const response = await callAPI(`/filter.php?c=${activeCategory}`, "GET");
      const meals = response.meals?.slice(0, 10);
      const moreMeals = response.meals?.slice(11, 20).map((item) => {
        return {
          name: item.strMeal,
          thumb: item.strMealThumb,
        };
      });

      const allMealFetch = meals?.map((item) => {
        const endpoint = axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item.idMeal}`
        );
        return endpoint;
      });

      const allMealDetails = await Promise.all(allMealFetch).then(
        (response) => {
          return response?.map((item) => {
            const response = item.data.meals[0];

            return {
              id: response.idMeal,
              name: response.strMeal,
              instruction: response.strInstructions,
              thumb: response.strMealThumb,
              ingredient1: response.strIngredient1,
              ingredient2: response.strIngredient2,
              ingredient3: response.strIngredient3,
              ingredient4: response.strIngredient4,
              measure1: response.strMeasure1,
              measure2: response.strMeasure2,
              measure3: response.strMeasure3,
              measure4: response.strMeasure4,
            };
          });
        }
      );

      setMeals(allMealDetails);
      setMoreMeals(moreMeals);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.container}>
      <Navbar />
      <Navigation active={activeCategory} />

      <div className={classes.cardContainer}>
        {meals?.map((meal, index) => {
          return <DetailCard key={index} meal={meal} param={meal?.name} />;
        })}
      </div>

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

export default Home;
