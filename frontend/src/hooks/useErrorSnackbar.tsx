import { useCallback } from "react";
import { Button } from "@mui/material";
import { useSnackbar, type SnackbarKey } from "notistack";
import { HttpError } from "../api";

export function useErrorSnackbar() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return useCallback(
    (err: unknown, fallback = "Something went wrong") => {
      let message = fallback;
      if (err instanceof HttpError) {
        message = err.body || fallback;
        if (err.status >= 500) {
          message = "Server error. Please try again.";
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
