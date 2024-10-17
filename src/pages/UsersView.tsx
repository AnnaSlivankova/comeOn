// import {CircularProgress, Fade, Pagination as TablePagination} from "@mui/material";
import {CircularProgress, Fade} from "@mui/material";
import {Pagination, User} from "../services/types.ts";
import Box from "@mui/material/Box";
import {useGetUsersListQuery} from "../services/users.service.ts";
import UsersTable from "./UsersTable.tsx";
import {memo} from "react";
// import {ChangeEvent, useState} from "react";

const UsersView = () => {
  // const [pageNumber, setPageNumber] = useState<number>(1)
  const {data, isLoading, isError} = useGetUsersListQuery({})
  console.log(isError)
  const test = data as Pagination<User>
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
          <UsersTable items={test.items}/>
          {/*<TablePagination count={test && test.pagesCount || 1} color="primary" onChange={changePageHandler} page={pageNumber}/>*/}
        </div>
      )}
    </>
  )
};

export default memo(UsersView);