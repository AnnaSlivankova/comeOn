import {SnackbarProvider} from "./components/snackbar/snackbar-provider.tsx";
import {AppBar, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";
import GamePage from "./pages/game-page.tsx";
import {Provider} from "react-redux";
import {store} from "./services/store.ts";
import {API_URL} from "./app-settings.ts";

function App() {
  console.log(API_URL)
  return (
    <Provider store={store}>
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
    </Provider>
  )
}

export default App
