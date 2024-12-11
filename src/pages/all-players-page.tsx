import PlayersView from "./PlayersView.tsx";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";
import {Button, Card, CircularProgress, Stack} from "@mui/material";
import Box from "@mui/material/Box";
import {useGetUsersListQuery} from "../services/users.service.ts";
import {Pagination, RightAnswers, User} from "../services/types.ts";
import {EmojiEvents} from "@mui/icons-material";
import {PATH} from "../app-settings.ts";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import {useGetRightAnswersQuery} from "../services/quiz.service.ts";

type PositionKey = 0 | 1 | 2;
const positionIcons: Record<PositionKey, JSX.Element> = {
  0: <EmojiEvents sx={{color: 'gold'}}/>,
  1: <EmojiEvents sx={{color: 'silver'}}/>,
  2: <EmojiEvents sx={{color: '#cd7f32'}}/>
};

const AllPlayersPage = () => {
  const navigate = useNavigate()
  const {data, isLoading} = useGetUsersListQuery({pageSize: 3})
  const mockTopUsers = data as Pagination<User>
  const {data: raData, isLoading: isAnswersLoading} = useGetRightAnswersQuery()
  if (isAnswersLoading) {
    return <CircularProgress/>
  }
  const rightAnswers = raData as RightAnswers[]


  return (
    <>
      <Stack alignItems='center' justifyContent='center' spacing={2} sx={{mt: 2}}>
        <Typography variant="h5">Статистика текущей игры</Typography>
        <Button variant='outlined' onClick={() => navigate('/')} color='secondary'><SportsEsportsIcon/>играть</Button>
      </Stack>

      <Box sx={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2, mt: 2}}>
        <Card sx={{p: 2, maxWidth: 250}}>
          <Typography variant='h6'>⭐️ TOP USERS</Typography>
          {!isLoading && mockTopUsers.items.map((u, i) => {
            return (
              <Box key={u.id} sx={{display: 'flex', gap: 1}}>
                {positionIcons[i as PositionKey] || <div>{u.position + 1}</div>}
                <Typography variant='body2'>{u.name}</Typography>
                <Typography variant='body2'>{u.surname}</Typography>
                <Typography variant='body2'>{u.rating}</Typography>
              </Box>
            )
          })}
          <Button sx={{mt: 2}} color='warning' variant='outlined' fullWidth onClick={() => navigate(PATH.users)}>all
            users</Button>
        </Card>

        <Card sx={{p: 2, maxWidth: 400}}>
          <Typography variant='h6'>💡 INFO</Typography>
          {/*<Typography variant='body2'>*/}
          {/*  Первые 5 игроков с наибольшим рейтигом получат свой приз 🎁 в субботу на ComeON.*/}
          {/*  Каждый день у каждого игрока есть 3 попытки 🎮, чтобы увеличить свой рейтинг (в зачет идет средний балл).*/}
          {/*  Ждем тебя на ComeON! 🫶🏻*/}
          {/*</Typography>*/}
          <Typography variant='body2'>
            Первые 3 игрока с наибольшим рейтигом получат свой приз 🎁 21-го декабря субботу на ComeON.
            Ждем тебя на ComeON! 🫶🏻
          </Typography>
        </Card>

        <Card sx={{p: 2, maxWidth: 400}}>
          <Typography variant='h6'>💬 ОТВЕТЫ ПРОШЛОГО КРУГА</Typography>
          {rightAnswers && rightAnswers.map(a => (
            <div key={a.position} style={{display: 'flex', gap: '10px'}}>
              <Typography variant='body2'>{a.position}</Typography>
              <Typography variant='body2'>{a.question}</Typography>
              <Typography variant='body2' style={{textDecoration: 'underline'}}>{a.answer}</Typography>
            </div>
          ))}

        </Card>
      </Box>

      <PlayersView/>
    </>
  );
};

export default AllPlayersPage;
