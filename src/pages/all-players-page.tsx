import PlayersView from "./PlayersView.tsx";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";

const AllPlayersPage = () => {
  const navigate = useNavigate()
  return (
    <>
      <Typography variant="h5" sx={{textAlign: 'center', padding: '20px'}}>
        Players List
        <Button sx={{marginLeft:'30px', gap: '10px'}} variant='outlined' onClick={() => navigate('/')}>
          <HomeIcon/>
          home
        </Button>
      </Typography>
      <PlayersView/>
    </>
  );
};

export default AllPlayersPage;