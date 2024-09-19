import {SnackbarProvider} from "./components/snackbar/snackbar-provider.tsx";
import {AppBar, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";
import GamePage from "./pages/game-page.tsx";
import Box from "@mui/material/Box";

function App() {

  return (
    <>
      <SnackbarProvider>
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{flexGrow: 1, textAlign: 'center'}}>
              Come-On GAME time
            </Typography>
          </Toolbar>
        </AppBar>
        {/*<Box sx={{mt: 8, p: 2}}>*/}
          <GamePage/>
        {/*</Box>*/}
      </SnackbarProvider>
    </>
  )
}

export default App
