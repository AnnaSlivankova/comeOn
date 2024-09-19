import React, {createContext, useContext, useState, useCallback} from "react";
import GlobalSnackbar from "./snackbar.tsx";

interface SnackbarContextProps {
  showSnackbar: (msg: string, severity?: "success" | "error" | "info" | "warning") => void;
  closeSnackbar: () => void;
}

const SnackbarContext = createContext<SnackbarContextProps | undefined>(undefined);

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = useCallback((msg: string, severity: "success" | "error" | "info" | "warning" = "success") => {
    setSnackbar({open: true, message: msg, severity});
  }, []);

  const closeSnackbar = () => {
    setSnackbar((prev) => ({...prev, open: false}));
  };

  return (
    <SnackbarContext.Provider value={{showSnackbar, closeSnackbar}}>
      {children}
      <GlobalSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={closeSnackbar}
      />
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = (): SnackbarContextProps => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};
