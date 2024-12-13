// import {CircularProgress, Fade, Pagination as TablePagination} from "@mui/material";
import {CircularProgress, Fade} from "@mui/material";
import {useGetTopPlayersListQuery} from "../services/players.service.ts";
import {Pagination, Player} from "../services/types.ts";
import PlayersTable from "./PlayersTable.tsx";
import Box from "@mui/material/Box";
// import {useGetUsersAnswersQuery} from "../services/admin-api.ts";
// import {formatDate} from "../common/utils/formatDate.ts";
// import {ChangeEvent, useState} from "react";

const PlayersView = () => {
  // const [pageNumber, setPageNumber] = useState<number>(1)
  // const {data, isLoading} = useGetTopPlayersListQuery({pageSize:100, sortBy: 'prevGamesScore'})
  const {data, isLoading} = useGetTopPlayersListQuery({pageSize:100, sortBy: 'totalScore'})
  const test = data as Pagination<Player>

  // const {data:usersData} = useGetUsersAnswersQuery()
  // const usersAnswers = usersData as any[]

  //  const changePageHandler = (event: ChangeEvent<unknown>, value: number) => {
  //    console.log('event', event)
  //   setPageNumber(value)
  // }

  if (isLoading) {
    return (
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Fade
          in={isLoading}
          style={{
            transitionDelay: isLoading ? '800ms' : '0ms',
          }}
          unmountOnExit
        >
          <CircularProgress/>
        </Fade>
      </Box>
    )
  }

  return (
    <>
      {data && (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: '20px', marginTop: '20px'}}>
          <PlayersTable items={test.items}/>
          {/*<TablePagination count={test && test.pagesCount || 1} color="primary" onChange={changePageHandler} page={pageNumber}/>*/}
          {/*{usersData && usersAnswers.map(ua => {*/}
          {/*  const date =formatDate(ua.createdAt)*/}
          {/*  console.log('date', date)*/}
          {/*  return (*/}
          {/*  <div key={ua.id} >*/}
          {/*    <span style={{marginRight: '10px'}}>{ua.name}</span>*/}
          {/*    <span style={{marginRight: '10px'}}>{ua.surname}</span>*/}
          {/*    <span style={{marginRight: '10px', fontWeight: 'bold'}}>{ua.position}</span>*/}
          {/*    <span style={{marginRight: '10px'}}>{ua.question}</span>*/}
          {/*    <span style={{marginRight: '10px', fontWeight: 'bold'}}>{ua.rightAnswer}</span>*/}
          {/*    <span style={{marginRight: '10px'}}>{ua.userAnswer}</span>*/}
          {/*    <span style={{marginRight: '10px'}}>{date.time}</span>*/}
          {/*    <span>{date.date}</span>*/}
          {/*  </div>*/}
          {/*)})}*/}
        </div>
      )}
    </>
  )
};

export default PlayersView;