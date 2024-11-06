import {FC} from 'react';
import {Player} from "../services/types.ts";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import {EmojiEvents} from "@mui/icons-material";

const PlayersTable: FC<Props> = ({items=[]}) => {
  return (
    <TableContainer component={Paper} sx={{maxWidth: 650}}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center"><SentimentVerySatisfiedIcon/></TableCell>
            <TableCell align="left">Игрок</TableCell>
            <TableCell align="center">Баллы</TableCell>
            <TableCell align="center">Сыграно сегодня</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {items.map((p, i) => {
            return (
              <TableRow
                key={p.id}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
              >
                <TableCell component="th" scope="row" align="center">
                  {i === 0 ? <EmojiEvents sx={{color: 'gold'}}/> :
                    i === 1 ? <EmojiEvents sx={{color: 'silver'}}/> :
                      i === 2 ? <EmojiEvents sx={{color: '#cd7f32'}}/> :
                        i + 1
                  }
                </TableCell>

                <TableCell align="left">{`${p.name} ${p.surname}`}</TableCell>
                <TableCell align="center">{p.prevGamesScore + p.totalScore || '🤷🏻‍♀️'}</TableCell>
                <TableCell align="center">{p.gamesCount}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PlayersTable;

type Props = {
  items: Player[]
}