// import {CircularProgress, Fade, Pagination as TablePagination} from "@mui/material";
import {CircularProgress, Fade} from "@mui/material";
import {useGetTopPlayersListQuery} from "../services/players.service.ts";
import {Pagination, Player} from "../services/types.ts";
import PlayersTable from "./PlayersTable.tsx";
import Box from "@mui/material/Box";
// import {ChangeEvent, useState} from "react";

const PlayersView = () => {
  // const [pageNumber, setPageNumber] = useState<number>(1)
  const {data, isLoading, isError} = useGetTopPlayersListQuery({pageNumber: 1})
  console.log(isError)
  const test = data as Pagination<Player>
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
        </div>
      )}
    </>
  )
};

export default PlayersView;