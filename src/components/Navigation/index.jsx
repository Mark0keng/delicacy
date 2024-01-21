/* eslint-disable react/prop-types */
import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { callAPI } from "../../domain/api";
import { useNavigate } from "react-router-dom";

const Navigation = ({ active }) => {
  const [activeMenu, setActiveMenu] = useState("Beef");
  const [menu, setMenu] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMenu();
  }, []);

  useEffect(() => {
    active ? setActiveMenu(active) : setActiveMenu("Beef");
  }, [active]);

  const fetchMenu = async () => {
    try {
      const response = await callAPI(`/categories.php`, "GET");

      const modifiedData = response?.categories?.map((item) => {
        return {
          name: item.strCategory,
        };
      });

      setMenu(modifiedData.slice(0, 6));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container spacing={2} paddingLeft={7} paddingBottom={3}>
      {menu?.map((item, index) => {
        return (
          <Grid item xs={"auto"} key={index} style={{}}>
            <Typography
              variant="h6"
              gutterBottom
              style={{
                cursor: "pointer",
                color: activeMenu === item.name ? "#404040" : "#969696",
              }}
              onClick={() => {
                navigate({ pathname: "/", search: `?menu=${item.name}` });
              }}
            >
              {item.name}
            </Typography>
          </Grid>
        );
      })}
      <Grid item xs={1} style={{}}>
        <Typography
          variant="h6"
          gutterBottom
          style={{
            cursor: "pointer",
            color: activeMenu === "favorites" ? "#404040" : "#969696",
          }}
          onClick={() => {
            navigate("/favorites");
          }}
        >
          Favorites
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Navigation;
