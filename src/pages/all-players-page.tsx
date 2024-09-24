import {useGetTopPlayersListQuery} from "../services/players.service.ts";

const AllPlayersPage = () => {
  const {data, isLoading, isError} =useGetTopPlayersListQuery({})
  console.log(isLoading)
  console.log(isError)
  return (
    <>
      {data && data.items.map(p => <h3 style={{textAlign:'center'}} key={p.id}>{`${p.name} ${p.surname} rating: ${100500}`}</h3>)}
    </>
  );
};

export default AllPlayersPage;