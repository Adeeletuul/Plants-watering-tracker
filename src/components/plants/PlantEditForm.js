import React, { useMemo, useState, useEffect } from "react";
import {
  Button,
  Grid,
  Typography,
  TextField,
  Modal,
  Box,
  CardMedia,
  Fab,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteImage,
  editImage,
  editPlant,
  readPlants,
} from "../../store/plants/plantsActions";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FALLBACK_IMAGE from "../../assets/images/fallback_image.webp";

const PlantEditForm = ({ id, handleClose }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readPlants(plant.id));
  }, []);

  const [mouseEnter, setMouseEnter] = useState(false);

  const plants = useSelector((state) => state.plantsReducer.plants);
  const plant = useMemo(() => plants.find((b) => b.id === id), [plants, id]);

  const handleSubmit = (event) => {
    const form = new FormData(event.target);
    event.preventDefault();

    let data = {
      ...plant,
      name: form.get("name"),
      water: form.get("water"),
      light: form.get("light"),
      humidity: form.get("humidity"),
      temperature: form.get("temperature"),
      food: form.get("food"),
      additional_care: form.get("additional care"),
    };

    dispatch(editPlant(data));
    handleClose();
  };

  const handleImageSubmit = (selectedImage) => {
    dispatch(editImage(plant, selectedImage));
  };

  const handleClickEdit = (e) => {
    const selectedImage = e.target.files[0];
    dispatch(deleteImage(plant.id));
    dispatch(editImage(plant, selectedImage));
  };

  const handleClickDelete = () => {
    dispatch(deleteImage(plant.id));
  };

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

  const gridItemStyle = {
    minWidth: "500px",
  };

  const buttonStyle = {
    mt: 4,
  };

  const gridStyle = {
    flexDirection: "column",
    alignItems: "center",
  };

  const deleteButtonStyle = {
    margin: 0,
    marginLeft: "10px",
  };

  const editButtonStyle = {
    display: "none",
  };

  return (
    <>
      <Modal open={true} onClose={handleClose}>
        <Box sx={boxStyle}>
          <form onSubmit={handleSubmit}>
            <Grid container style={gridStyle}>
              <Grid item>
                <Typography variant="h6">Edit plant</Typography>
              </Grid>
              <Grid
                item
                onMouseEnter={() => setMouseEnter(true)}
                onMouseLeave={() => setMouseEnter(false)}
              >
                {plant.imageUrl && (
                  <>
                    <CardMedia
                      sx={cardMediaStyle}
                      component="img"
                      image={plant.imageUrl || FALLBACK_IMAGE}
                      alt="plant image"
                    />
                    {mouseEnter && (
                      <div
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.25)",
                          width: "55%",
                          height: "350px",
                          position: "absolute",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <input
                          accept="image/*"
                          id="contained-button-file"
                          type="file"
                          style={editButtonStyle}
                          onChange={handleClickEdit}
                        />
                        <label htmlFor="contained-button-file">
                          <Fab size="medium" aria-label="edit" component="span">
                            <EditIcon />
                          </Fab>
                        </label>
                        <Fab
                          aria-label="delete"
                          style={deleteButtonStyle}
                          onClick={handleClickDelete}
                          size="medium"
                        >
                          <DeleteIcon />
                        </Fab>
                      </div>
                    )}
                  </>
                )}
                {!plant.imageUrl && (
                  <>
                    <input
                      accept="image/*"
                      id="select-image"
                      type="file"
                      onChange={(e) => handleImageSubmit(e.target.files[0])}
                    />
                    <label htmlFor="select-image"></label>
                  </>
                )}
              </Grid>
              <Grid item sx={gridItemStyle}>
                <TextField
                  required
                  id="name"
                  name="name"
                  label="NAME"
                  fullWidth
                  defaultValue={plant.name}
                />
              </Grid>
              <Grid item sx={gridItemStyle}>
                <TextField
                  required
                  id="water"
                  name="water"
                  label="WATER"
                  fullWidth
                  multiline
                  maxRows={5}
                  defaultValue={plant.water}
                />
              </Grid>
              <Grid item sx={gridItemStyle}>
                <TextField
                  id="light"
                  name="light"
                  label="LIGHT"
                  fullWidth
                  multiline
                  maxRows={5}
                  defaultValue={plant.light}
                />
              </Grid>
              <Grid item sx={gridItemStyle}>
                <TextField
                  id="humidity"
                  name="humidity"
                  label="HUMIDITY"
                  fullWidth
                  multiline
                  maxRows={5}
                  defaultValue={plant.humidity}
                />
              </Grid>
              <Grid item sx={gridItemStyle}>
                <TextField
                  id="temperature"
                  name="temperature"
                  label="TEMPERATURE"
                  fullWidth
                  multiline
                  maxRows={5}
                />
              </Grid>
              <Grid item sx={gridItemStyle}>
                <TextField
                  id="food"
                  name="food"
                  label="FOOD"
                  fullWidth
                  multiline
                  maxRows={5}
                  defaultValue={plant.food}
                />
              </Grid>
              <Grid item sx={gridItemStyle}>
                <TextField
                  id="additional care"
                  name="additional care"
                  label="ADDITIONAL CARE"
                  fullWidth
                  multiline
                  maxRows={5}
                  defaultValue={plant.additional_care}
                />
              </Grid>
              <Button variant="outlined" type="submit" sx={buttonStyle}>
                Submit
              </Button>
            </Grid>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default PlantEditForm;
