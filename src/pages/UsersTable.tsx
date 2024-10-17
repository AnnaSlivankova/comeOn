import {FC} from 'react';
import {User} from "../services/types.ts";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import {EmojiEvents} from "@mui/icons-material";

const UsersTable: FC<Props> = ({items}) => {
  return (
    <TableContainer component={Paper} sx={{maxWidth: 650}}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center"><SentimentVerySatisfiedIcon/></TableCell>
            <TableCell align="left">User</TableCell>
            <TableCell align="center">Rating</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {items.map((p) => {
            return (
              <TableRow
                key={p.id}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
              >
                <TableCell component="th" scope="row" align="center">
                  {p.position === 1 ? <EmojiEvents sx={{color: 'gold'}}/> :
                    p.position === 2 ? <EmojiEvents sx={{color: 'silver'}}/> :
                      p.position === 3 ? <EmojiEvents sx={{color: '#cd7f32'}}/> :
                        p.position
                  }
                </TableCell>

                <TableCell align="left">{`${p.name} ${p.surname}`}</TableCell>
                <TableCell align="center">{p.rating || '🤷🏻‍♀️'}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;

type Props = {
  items: User[]
}