import PlayersView from "./PlayersView.tsx";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";
import {Button, Card, Stack} from "@mui/material";
import Box from "@mui/material/Box";
import {useGetUsersListQuery} from "../services/users.service.ts";
import {Pagination, User} from "../services/types.ts";
import {EmojiEvents} from "@mui/icons-material";
import {PATH} from "../app-settings.ts";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

const positionIcons = {
  0: <EmojiEvents sx={{color: 'gold'}}/>,
  1: <EmojiEvents sx={{color: 'silver'}}/>,
  2: <EmojiEvents sx={{color: '#cd7f32'}}/>
};

const AllPlayersPage = () => {
  const navigate = useNavigate()
  const {data, isLoading} = useGetUsersListQuery({pageSize: 3})
  const mockTopUsers = data as Pagination<User>

  return (
    <>
      <Stack alignItems='center' justifyContent='center' spacing={2} sx={{mt:2}}>
        <Typography variant="h5" >Статистика текущей игры</Typography>
        <Button variant='outlined' onClick={() => navigate('/')} color='secondary'><SportsEsportsIcon/>играть</Button>
      </Stack>

      <Box sx={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2, mt:2}}>
        <Card sx={{p: 2, maxWidth: 250}}>
          <Typography variant='h6'>⭐️ TOP USERS</Typography>
          {!isLoading && mockTopUsers.items.map((u, i) => {
            return (
              <Box key={u.id} sx={{display: 'flex', gap: 1}}>
                {positionIcons[i] || <div>{u.position + 1}</div>}
                <Typography variant='body2'>{u.name}</Typography>
                <Typography variant='body2'>{u.surname}</Typography>
                <Typography variant='body2'>{u.rating}</Typography>
              </Box>
            )
          })}
          <Button sx={{mt:2}} color='warning' variant='outlined' fullWidth onClick={() => navigate(PATH.users)}>all users</Button>
        </Card>

        <Card sx={{p: 2, maxWidth: 400}}>
          <Typography variant='h6'>💡 INFO</Typography>
          <Typography variant='body2'>
            Первые 5 игроков с наибольшим рейтигом получат свой приз 🎁 в субботу на ComeON.
            Каждый день у каждого игрока есть 3 попытки 🎮, чтобы увеличить свой рейтинг (в зачет идет средний балл).
            Ждем тебя на ComeON! 🫶🏻
          </Typography>
        </Card>
      </Box>

      <PlayersView/>
    </>
  );
};

export default AllPlayersPage;
