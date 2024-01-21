import axios from "axios";
import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { callAPI } from "../../domain/api";

import classes from "./style.module.scss";

import Navbar from "../../components/Navbar";
import MoreCard from "../../components/MoreCard";
import Navigation from "../../components/Navigation";

const Favorite = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchFavorite();
  }, []);

  const fetchFavorite = async () => {
    try {
      const res = await axios.get("http://localhost:3000/favorites");

      const modifiedResponse = res.data?.map(async (item) => {
        const responseByName = await callAPI(
          `/search.php?s=${item.name}`,
          "GET"
        );
        const { idMeal, strMealThumb, strMeal } = responseByName.meals[0];
        return {
          id: idMeal,
          name: strMeal,
          thumb: strMealThumb,
        };
      });

      const finalResponse = await Promise.all(modifiedResponse);
      setData(finalResponse);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.container}>
      <Navbar />
      <div style={{ paddingBottom: "10px" }}>
        <Navigation active={"favorites"} />
      </div>
      <Grid container spacing={9} style={{ padding: "8% 5%" }}>
        {data?.map((item, index) => {
          return (
            <Grid item xs={6} md={3} key={index}>
              <MoreCard meal={item} refetch={fetchFavorite} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Favorite;
