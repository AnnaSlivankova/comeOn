import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface GlobalSnackbarProps {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
  onClose: () => void;
}

const GlobalSnackbar: React.FC<GlobalSnackbarProps> = ({open, message, severity, onClose}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{vertical: "top", horizontal: "right"}}
    >
      <Alert onClose={onClose} severity={severity} sx={{width: "100%"}}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;