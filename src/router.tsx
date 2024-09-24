import {createBrowserRouter, Navigate, Outlet, RouterProvider} from "react-router-dom";
import {PATH} from "./app-settings.ts";
import {AppBar, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";
import NotFoundPage from "./pages/not-found-page.tsx";
import GamePage from "./pages/game-page.tsx";
import AllPlayersPage from "./pages/all-players-page.tsx";

const AppLayout = () => {
  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{flexGrow: 1, textAlign: 'center'}}>
            ComeON GAMEon
          </Typography>
        </Toolbar>
      </AppBar>

      <main>
        <Outlet/>
      </main>

    </>
  )
}

const router = createBrowserRouter([
  {
    element: <AppLayout/>,
    errorElement: <Navigate to={PATH.not_found}/>,
    children: [
      {
        path: PATH.index,
        element: <GamePage/>,
      },
      {
        path: PATH.players,
        // element: <h3 style={{textAlign: 'center'}}>top users</h3>,
        element: <AllPlayersPage/>,
      },
      {
        path: PATH.not_found,
        element: <NotFoundPage/>,
      },
    ],
  },
])

export function Router() {
  return <RouterProvider router={router}/>
}