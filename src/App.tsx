import {SnackbarProvider} from "./components/snackbar/snackbar-provider.tsx";
import {AppBar, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";
import GamePage from "./pages/game-page.tsx";

function App() {

  return (
    <>
      <SnackbarProvider>
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{flexGrow: 1, textAlign: 'center'}}>
              ComeON GAMEon
            </Typography>
          </Toolbar>
        </AppBar>
        <GamePage/>
      </SnackbarProvider>
    </>
  )
}

export default App
