import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  Modal,
  ListItemIcon,
  CardMedia,
} from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import OpacityIcon from "@mui/icons-material/Opacity";
import CloudIcon from "@mui/icons-material/Cloud";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import SpaIcon from "@mui/icons-material/Spa";
import AddIcon from "@mui/icons-material/Add";

const boxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  p: 4,
};

const cardMediaStyle = {
  maxHeight: "350px",
  maxWidth: "60%",
  mb: 4,
};

const PlantDetails = ({ handleClose, id }) => {
  const plants = useSelector((state) => state.plantsReducer.plants);
  const plant = useMemo(() => plants.find((b) => b.id === id), [plants, id]);

  return (
    <Modal open={true} onClose={handleClose}>
      <Box sx={boxStyle}>
        <Typography variant="h6" textAlign={"center"}>
          {plant.name}
        </Typography>
        <List>
          <ListItem
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CardMedia
              sx={cardMediaStyle}
              component="img"
              image={plant.imageUrl}
              alt="plant image"
              // onError={onMediaFallback}
            />
          </ListItem>
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <WbSunnyIcon />
            </ListItemIcon>
            <ListItemText primary="LIGHT" secondary={plant.name} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <OpacityIcon />
            </ListItemIcon>
            <ListItemText primary="WATER" secondary={plant.water} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <CloudIcon />
            </ListItemIcon>
            <ListItemText primary="HUMIDITY" secondary={plant.humidity} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <ThermostatIcon />
            </ListItemIcon>
            <ListItemText primary="TEMPERATURE" secondary={plant.temperature} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <SpaIcon />
            </ListItemIcon>
            <ListItemText primary="FOOD" secondary={plant.food} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText
              primary="ADDITIONAL CARE"
              secondary={plant.additional_care}
            />
          </ListItem>
        </List>
      </Box>
    </Modal>
  );
};

export default PlantDetails;
