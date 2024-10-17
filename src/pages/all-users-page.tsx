import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";
import {Button, Card, Stack} from "@mui/material";
import Box from "@mui/material/Box";
import UsersView from "./UsersView.tsx";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import BarChartIcon from '@mui/icons-material/BarChart';
import {PATH} from "../app-settings.ts";

const AllUsersPage = () => {
  const navigate = useNavigate()
  return (
    <>
      <Stack alignItems='center' justifyContent='center' spacing={2} sx={{mt:2}}>
        <Typography variant="h5">Users List</Typography>
        <Button variant='outlined' onClick={() => navigate('/')} color='secondary'><SportsEsportsIcon/>играть</Button>
        <Button variant='outlined' onClick={() => navigate(PATH.players)} color='warning'><BarChartIcon/>статистика игры</Button>
      </Stack>

      <Box sx={{display: 'flex', justifyContent: 'center', mt:2}}>
        <Card sx={{p: 2, maxWidth: 400}}>
          <Typography variant='h6'>💡 Rules</Typography>
          <Typography variant='body2'>
            Зарабатывай баллы играя онлайн, а также дополнительные бонусы приходя на ComeON. В конце сезона топ 3
            участника получат финальные призы 🎁.
          </Typography>
          <Typography variant='subtitle2'>❗️Обновление данных происходит после каждого ComeON</Typography>
        </Card>
      </Box>

      <UsersView/>
    </>
  );
};

export default AllUsersPage;
