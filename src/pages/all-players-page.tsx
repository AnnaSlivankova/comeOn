import {useGetTopPlayersListQuery} from "../services/players.service.ts";

const AllPlayersPage = () => {
  const {data, isLoading, isError} = useGetTopPlayersListQuery({})
  console.log(isLoading)
  console.log(isError)
  return (
    <>
      {data && data.items.map((p:Player) => <h3 style={{textAlign: 'center'}}
                                       key={p.id}>{`${p.name} ${p.surname} rating: ${100500}`}</h3>)}
    </>
  );
};

export default AllPlayersPage;

type Player = {
  id: string;
  name: string;
  surname: string;
  score: number;
  time: string;
  createdAt: string;
  updatedAt: string;
}

// type Pagination<T> = {
//   pagesCount: number;
//   page: number;
//   pageSize: number;
//   totalCount: number;
//   items: T[];
// }




