import {SnackbarProvider} from "./components/snackbar/snackbar-provider.tsx";
import {Provider} from "react-redux";
import {store} from "./services/store.ts";
import {API_URL} from "./app-settings.ts";
import {Router} from "./router.tsx";

function App() {
  console.log(API_URL)
  return (
    <Provider store={store}>
      <SnackbarProvider>
        <Router/>
      </SnackbarProvider>
    </Provider>
  )
}

export default App
