import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deletePlant } from "../../store/plants/plantsActions";
import Raindrop, { days } from "../watering/Raindrop";
import moment from "moment";
import FALLBACK_IMAGE from "../../assets/images/fallback_image.webp";

const Plant = ({ id, handleOpen, handleEdit }) => {
  const plants = useSelector((state) => state.plantsReducer.plants);
  const plant = useMemo(() => plants.find((b) => b.id === id), [plants, id]);

  const handleClickOpen = () => {
    handleOpen(plant);
  };

  const handleClickEdit = () => {
    handleEdit(plant);
  };

  const dispatch = useDispatch();

  const handleClickDelete = () => {
    dispatch(deletePlant(plant));
  };

  const nextWaterDay = moment(plant.lastWater).add(days[plant.water], "days");

  const cardStyle = {
    width: "300px",
    height: "550px",
    display: "flex",
    flexDirection: "column",
  };

  const cardMediaStyle = {
    maxHeight: "350px",
  };

  const cardContentStyle = {
    flexGrow: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={cardStyle}>
        <CardMedia
          sx={cardMediaStyle}
          component="img"
          image={plant.imageUrl || FALLBACK_IMAGE}
          alt="plant image"
        />
        <CardContent sx={cardContentStyle}>
          <div>
            <Typography gutterBottom variant="Subtitle1" component="h2">
              {plant.name}
            </Typography>
            <Typography variant="body2" component="p">
              Next watering time:{nextWaterDay.format("DD/MM/YYYY")}
            </Typography>
          </div>
          <Raindrop
            plant={plant}
            frequency={plant.water}
            nextWaterDay={nextWaterDay}
          />
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          <Button size="small" onClick={handleClickOpen}>
            View
          </Button>
          <Button size="small" onClick={handleClickEdit}>
            Edit
          </Button>
          <IconButton
            aria-label="delete"
            size="large"
            color="primary"
            onClick={handleClickDelete}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Plant;
