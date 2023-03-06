import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { readWateringLogs } from "../../store/watering/wateringActions";
import { List, Fab, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import WateringLogItem from "./WateringLogItem";
import { readPlants } from "../../store/plants/plantsActions";

const WateringLogs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(readWateringLogs());
    dispatch(readPlants());
  }, []);

  const wateringLogs = useSelector(
    (state) => state.wateringReducer.wateringLogs
  );

  const navigate = useNavigate();

  const handleClickAdd = () => {
    navigate("/addWatering");
  };

  const fabStyle = {
    margin: 0,
    top: "auto",
    right: 40,
    bottom: 40,
    left: "auto",
    position: "fixed",
  };

  const listStyle = {
    width: "100%",
    bgcolor: "background.paper",
    height: "800px",
    overflowY: "scroll",
  };

  return (
    <Container>
      <List sx={listStyle}>
        {wateringLogs.map((wateringLog, index) => (
          <WateringLogItem
            key={index}
            id={wateringLog.id}
            wateringDate={wateringLog.date.toDate()}
            checkedPlants={wateringLog.checkedPlants || []}
            wateringLog={wateringLog}
          />
        ))}
      </List>
      <Fab color="primary" aria-label="add" sx={fabStyle}>
        <AddIcon onClick={handleClickAdd} />
      </Fab>
    </Container>
  );
};

export default WateringLogs;
