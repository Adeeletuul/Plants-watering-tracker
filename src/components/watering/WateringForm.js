import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Typography,
  List,
  TextField,
  Container,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createWateringLog } from "../../store/watering/wateringActions";
import { readPlants } from "../../store/plants/plantsActions";
import WateringFormItem from "./WateringFormItem";
import moment from "moment";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";

const WateringForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const plants = useSelector((state) => state.plantsReducer.plants);

  useEffect(() => {
    dispatch(readPlants());
  }, []);

  const [checked, setChecked] = useState([]);

  const handleToggle = (id) => () => {
    const currentIndex = checked.indexOf(id);
    console.log(currentIndex);

    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const [dateValue, setDateValue] = React.useState(moment(new Date()));

  const handleSubmit = (event) => {
    event.preventDefault();
    let data = {
      date: new Date(dateValue),
      checkedPlants: checked,
    };
    dispatch(createWateringLog(data));
    navigate("/wateringLogs");
  };

  const gridContainerStyle = {
    alignItems: "center",
    flexDirection: "column",
  };

  const listStyle = {
    width: "100%",
    maxWidth: 400,
    bgcolor: "background.paper",
    height: "370px",
    overflowY: "scroll",
  };

  const divStyle = {
    display: "flex",
    flexDirection: "row",
    marginBottom: "40px",
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Grid container sx={gridContainerStyle}>
          <Grid item>
            <Typography variant="h6">Add New Watering</Typography>
          </Grid>
          <div style={divStyle}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <StaticDatePicker
                orientation="landscape"
                openTo="day"
                value={dateValue}
                onChange={(newValue) => {
                  setDateValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <List dense sx={listStyle}>
              {plants.map((plant) => (
                <WateringFormItem
                  key={plant.name}
                  id={plant.id}
                  name={plant.name}
                  imageUrl={plant.imageUrl}
                  handleToggle={handleToggle}
                  checked={checked}
                />
              ))}
            </List>
          </div>
          <Button variant="outlined" type="submit">
            Submit
          </Button>
        </Grid>
      </form>
    </Container>
  );
};

export default WateringForm;
