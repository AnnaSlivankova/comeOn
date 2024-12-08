import {createBrowserRouter, Navigate, Outlet, RouteObject, RouterProvider, useNavigate} from "react-router-dom";
import {PATH} from "./app-settings.ts";
import {AppBar, Button, LinearProgress, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";
import GamePage from "./pages/game-page.tsx";
import AllPlayersPage from "./pages/all-players-page.tsx";
import NotFoundPage from "./pages/not-found-page.tsx";
import {LoginPage} from "./pages/login-page.tsx";
import {useLogoutMutation, useMeQuery} from "./services/auth.service.ts";
import Box from "@mui/material/Box";
import {useSnackbar} from "./components/snackbar/snackbar-provider.tsx";
import AllUsersPage from "./pages/all-users-page.tsx";
import {Snowfall} from "./components/snowfall";
// import {QuizPage} from "./pages/quiz";

const privateRoutes: RouteObject[] = [
  {
    path: PATH.index,
    element: <GamePage/>,
  },
  // {
  //   path: PATH.index,
  //   element: <QuizPage/>,
  // },
  // {
  //   path: PATH.quiz,
  //   element: <QuizPage/>,
  // }
]

const AppLayout = () => {
  const navigate = useNavigate()
  const {showSnackbar} = useSnackbar();
  const [logout] = useLogoutMutation()

  const logoutHandler = async () => {
    const res = await logout()
    if (res.error) return;

    localStorage.removeItem('token')
    showSnackbar(`Ты вышел из аккаунта! 🖐🏻`, "success");
    navigate(PATH.login)
  }

  return (
    <>
      <Snowfall/>
      <AppBar position="sticky">
        <Toolbar>
          {/*<Button color="error" variant="contained" onClick={() => navigate(PATH.index)}>home</Button>*/}
          <Typography variant="h6" component="div" sx={{flexGrow: 1, textAlign: 'center'}}>
            ComeON
          </Typography>
          <Button color="warning" variant="contained" onClick={() => navigate(PATH.login)} sx={{mr: 1}}>login</Button>
          <Button color="secondary" onClick={logoutHandler} variant="contained">logout</Button>
          {/*<Button color="secondary" onClick={() => navigate('/')} variant="contained">Играть</Button>*/}
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
    path: PATH.index,
    element: <AppLayout/>,
    errorElement: <Navigate to={PATH.not_found}/>,
    children: [
      {
        element: <PrivateRoutes/>,
        children: privateRoutes,
      },
      {
        path: PATH.players,
        element: <AllPlayersPage/>,
      },
      {
        path: PATH.users,
        element: <AllUsersPage/>,
      },
      {
        path: PATH.not_found,
        element: <NotFoundPage/>,
      },
      {
        path: PATH.login,
        element: <LoginPage/>,
      },
    ],
  },
])

export function Router() {
  return <RouterProvider router={router}/>
}

function PrivateRoutes() {
  const {data, isError, isLoading} = useMeQuery()

  if (isLoading) {
    return (
      <Box sx={{width: '100%'}}>
        <LinearProgress color="secondary"/>
      </Box>
    )
  }

  if (isError) {
    return <Navigate to={PATH.login}/>;
  }

  return data ? <Outlet/> : <Navigate to={PATH.login}/>
}