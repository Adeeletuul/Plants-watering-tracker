import React from "react";
import { ListItem, ListItemText, Divider, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteWateringLog } from "../../store/watering/wateringActions";

const WateringLogItem = ({ id, wateringLog, wateringDate, checkedPlants }) => {
  const moment = require("moment");

  const plants = useSelector((state) => state.plantsReducer.plants);

  const renderPlantInfo = (checkedPlant, index) => {
    const plantInfo = plants.find((plant) => plant.id === checkedPlant);
    console.log(plantInfo);
    if (plantInfo) {
      return plantInfo.name;
      return <ListItemText key={checkedPlant}> {plantInfo.name} </ListItemText>;
    } else {
      return null;
    }
  };

  const dispatch = useDispatch();

  const handleClickDelete = () => {
    dispatch(deleteWateringLog(wateringLog));
  };

  const dateItemStyle = {
    maxWidth: "120px",
  };

  const listItemTextStyle = {
    display: "flex",
    flexDirection: "row",
  };

  return (
    <>
      <ListItem display="flex" flexDirection="row">
        <ListItemText
          primary={moment(wateringDate).format("DD/MM/YYYY")}
          style={dateItemStyle}
        />
        <Divider orientation="vertical" flexItem sx={{ marginRight: "20px" }} />
        <ListItemText
          secondary={checkedPlants.map(renderPlantInfo).join(" | ")}
          style={listItemTextStyle}
        />
        <IconButton aria-label="delete" size="large" color="primary">
          <DeleteIcon onClick={handleClickDelete} />
        </IconButton>
      </ListItem>
      <Divider />
    </>
  );
};

export default WateringLogItem;
