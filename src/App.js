import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Header from "./components/Header";
import WateringLogs from "./components/watering/WateringLogs";
import Plants from "./components/plants/Plants";
import PlantAddForm from "./components/plants/PlantAddForm";
import WateringForm from "./components/watering/WateringForm";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./CustomTheme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div>
          <Header>
            <main style={{ marginTop: 64, flex: 1, height: "100vh" }}>
              <Routes>
                <Route path="/" />
                <Route path="/plants" element={<Plants />} />
                <Route path="/addPlant" element={<PlantAddForm />} />
                <Route path="/addWatering" element={<WateringForm />} />
                <Route path="/wateringLogs" element={<WateringLogs />} />
              </Routes>
            </main>
          </Header>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
