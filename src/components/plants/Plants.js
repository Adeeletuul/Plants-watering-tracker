// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid, Container, Fab } from "@mui/material";
import Plant from "./Plant";
import PlantDetails from "./PlantDetails";
import { readPlants } from "../../store/plants/plantsActions";
import PlantEditForm from "./PlantEditForm";
import AddIcon from "@mui/icons-material/Add";

const Plants = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readPlants());
  }, []);

  const plants = useSelector((state) => state.plantsReducer.plants);
  const [plantOpen, setPlantOpen] = useState(null);
  const [plantEdit, setPlantEdit] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (plantOpen) {
      setPlantOpen((prevPlantOpen) =>
        plants.find((plant) => plant.id === prevPlantOpen.id)
      );
    }
    if (plantEdit) {
      setPlantEdit((prevPlantEdit) =>
        plants.find((plant) => plant.id === prevPlantEdit.id)
      );
    }
  }, [plants]);

  const handleClickAdd = () => {
    navigate("/addPlant");
  };

  const fabStyle = {
    margin: 0,
    top: "auto",
    right: 40,
    bottom: 40,
    left: "auto",
    position: "fixed",
  };

  return (
    <Container>
      <Grid container>
        {plants.map((plant) => (
          <Plant
            key={plant.name}
            id={plant.id}
            handleOpen={(plant) => setPlantOpen(plant)}
            handleEdit={(plant) => setPlantEdit(plant)}
          />
        ))}
      </Grid>
      <Fab
        color="primary"
        aria-label="add"
        sx={fabStyle}
        onClick={handleClickAdd}
      >
        <AddIcon />
      </Fab>

      {!!plantOpen && (
        <PlantDetails
          plant={plantOpen}
          id={plantOpen.id}
          handleClose={() => setPlantOpen(null)}
        />
      )}
      {!!plantEdit && (
        <PlantEditForm
          plant={plantEdit}
          id={plantEdit.id}
          handleClose={() => setPlantEdit(null)}
        />
      )}
    </Container>
  );
};

export default Plants;
