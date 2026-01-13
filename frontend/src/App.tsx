import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import HomePage from "./pages/HomePage";
import TrainingRunPage from "./pages/playwright/TrainingRunPage";
import PlaygroundPage from "./pages/playwright/PlaygroundPage";
import PlaywrightTrainingsPage from "./pages/playwright/PlaywrightTrainingsPage";
import { AppProvider } from "./providers/AppProvider/AppProvider";
import { APP_ROUTES } from "./constants/routes";
import { ScrollToTop } from "./components/routing/ScrollToTop";
import { AppLayout } from "./components/layout/AppLayout";

function App() {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={5000} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
      <AppProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route element={<AppLayout />}>
              <Route path={APP_ROUTES.HOME} element={<HomePage />} />
              <Route path={APP_ROUTES.PLAYWRIGHT_PLAYGROUND} element={<PlaygroundPage />} />
              <Route path={APP_ROUTES.PLAYWRIGHT_TRAINING_RUN(":trainingRunId")} element={<TrainingRunPage />} />
              <Route path={APP_ROUTES.PLAYWRIGHT_TRAININGS} element={<PlaywrightTrainingsPage />} />
              {/* <Route path={APP_ROUTES.PLAYWRIGHT_CHALLENGES} element={<ChallengesPage />} />
            <Route path={APP_ROUTES.PLAYWRIGHT_CUSTOM} element={<CustomTrainingPage />} /> */}
              <Route path="*" element={<Navigate to={APP_ROUTES.HOME} />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </SnackbarProvider>
  );
}

export default App;
