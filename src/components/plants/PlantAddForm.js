import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Grid,
  Typography,
  TextField,
  Container,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { useDispatch } from "react-redux";
import { createPlant } from "../../store/plants/plantsActions";
import { useNavigate } from "react-router-dom";

const PlantAddForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.target);

    let data = {
      name: form.get("name"),
      water: form.get("water"),
      light: form.get("light"),
      humidity: form.get("humidity"),
      temperature: form.get("temperature"),
      food: form.get("food"),
      additional_care: form.get("additional care"),
    };
    await dispatch(createPlant(data, selectedImage));

    navigate("/plants");
  };

  const gridContainerStyle = {
    alignItems: "center",
    flexDirection: "column",
    spacing: 3,
  };

  const gridItemStyle = {
    width: "500px",
    pl: 0,
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Grid container sx={gridContainerStyle}>
          <Grid item>
            <Typography variant="h6">Add new plant</Typography>
          </Grid>
          <Grid item sx={gridItemStyle}>
            <TextField required id="name" name="name" label="NAME" fullWidth />
          </Grid>
          <Grid item sx={gridItemStyle}>
            <TextField
              required
              id="water"
              name="water"
              label="WATER"
              fullWidth
              placeholder="How many times plant needs watering"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">in a month</InputAdornment>
                ),
              }}
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
            />
          </Grid>
          <Grid item p={4}>
            <input
              accept="image/*"
              id="select-image"
              type="file"
              onChange={(e) => setSelectedImage(e.target.files[0])}
            />
            <label htmlFor="select-image"></label>
            {imageUrl && selectedImage && (
              <Box mt={2} textAlign="center">
                <div>Image Preview:</div>
                <img src={imageUrl} alt={selectedImage.name} height="300px" />
              </Box>
            )}
          </Grid>
          <Button variant="outlined" type="submit">
            Submit
          </Button>
        </Grid>
      </form>
    </Container>
  );
};

export default PlantAddForm;
