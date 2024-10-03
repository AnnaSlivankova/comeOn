import PlayersView from "./PlayersView.tsx";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import {useNavigate} from "react-router-dom";
import {Button, Card} from "@mui/material";
import Box from "@mui/material/Box";
// import {EmojiEvents} from "@mui/icons-material";
//
// type MockUser = {
//   id: string
//   position: number
//   name: string
//   surname: string
//   rating: number
// }
// const mockTopUsers: MockUser[] = [
//   {id: '0', name: 'Jessica', surname: 'Jones', rating: 230, position: 0},
//   {id: '1', name: 'Emily', surname: 'Johnson', rating: 225, position: 1},
//   {id: '2', name: 'Michael', surname: 'Smith', rating: 200, position: 2},
//   {id: '3', name: 'Sarah', surname: 'Brown', rating: 199, position: 3},
//   {id: '4', name: 'David', surname: 'Williams', rating: 150, position: 4},
// ]
//
// const positionIcons = {
//   0: <EmojiEvents sx={{ color: 'gold' }} />,
//   1: <EmojiEvents sx={{ color: 'silver' }} />,
//   2: <EmojiEvents sx={{ color: '#cd7f32' }} />
// };

const AllPlayersPage = () => {
  const navigate = useNavigate()
  return (
    <>
      <Typography variant="h5" sx={{textAlign: 'center', padding: '20px'}}>
        Players List
        <Button sx={{marginLeft: '30px', gap: '10px'}} variant='outlined' onClick={() => navigate('/')}>
          <HomeIcon/>
          home
        </Button>
      </Typography>

      <Box sx={{display:'flex', justifyContent:'center'}}>
      {/*<Box sx={{maxWidth: 600, margin: '0 auto'}}>*/}
        <Card sx={{p:2, maxWidth: 400}}>
          <Typography variant='h6'>💡 INFO</Typography>
          <Typography variant='body2'>
            Первые 5 игроков с наибольшим рейтигом получат свой приз 🎁 в эту субботу на ComeON.
            Ты можешь играть 🎮 неограниченное количество раз, но в зачет пойдут результаты только первых трех игр (их
            средний балл).
            Ждем тебя на ComeON в эту субботу 5 октября в 12:00! 🫶🏻
          </Typography>
        </Card>

        {/*<Card sx={{p:2, maxWidth: 250}}>*/}
        {/*  <Typography variant='h6'>⭐️ TOP PLAYERS</Typography>*/}
        {/*  {mockTopUsers.map(u => {*/}

        {/*    return (*/}
        {/*      <Box key={u.id} sx={{display:'flex', gap: 1}}>*/}
        {/*        {positionIcons[u.position] ||  <div>{u.position+1}</div>}*/}
        {/*        <Typography variant='body2'>{u.name}</Typography>*/}
        {/*        <Typography variant='body2'>{u.surname}</Typography>*/}
        {/*        <Typography variant='body2'>{u.rating}</Typography>*/}
        {/*      </Box>*/}
        {/*    )*/}
        {/*  })}*/}
        {/*</Card>*/}
      </Box>


      <PlayersView/>
    </>
  );
};

export default AllPlayersPage;