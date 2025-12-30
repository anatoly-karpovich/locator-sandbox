import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { SnackbarProvider } from "notistack";
import HomePage from "./pages/HomePage";
import TrainingRunPage from "./pages/TrainingRunPage";

const theme = createTheme({
  palette: {
    background: {
      default: "#f5f5f5",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3} autoHideDuration={5000} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/training-run/:trainingRunId" element={<TrainingRunPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
