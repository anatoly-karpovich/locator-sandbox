import { useCallback } from "react";
import { Button } from "@mui/material";
import { useSnackbar, type SnackbarKey } from "notistack";
import { HttpError } from "../api";

const DEFAULT_FALLBACK = "Oops! Something went wrong";

export function useErrorSnackbar() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return useCallback(
    (err: unknown, fallback = DEFAULT_FALLBACK) => {
      let message = fallback;
      if (err instanceof HttpError) {
        if (err.status >= 500) {
          message = "Server error. Please try again.";
        } else if (fallback === DEFAULT_FALLBACK) {
          message = err.body || fallback;
        }
      } else if (err instanceof Error && err.message) {
        message = err.message;
      }

      return enqueueSnackbar(message, {
        variant: "error",
        action: (snackbarId: SnackbarKey) => (
          <Button color="inherit" size="small" onClick={() => closeSnackbar(snackbarId)}>
            Close
          </Button>
        ),
      });
    },
    [closeSnackbar, enqueueSnackbar]
  );
}
