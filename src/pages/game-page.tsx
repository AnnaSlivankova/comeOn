import Game from "./Game.tsx";
import {useState} from "react";
import RegisterModal from "./RegisterModal.tsx";
import {usePingQuery} from "../services/players.service.ts";

export default function GamePage() {
  const {data} = usePingQuery()
  console.log('ping', data)

  const [open, setOpen] = useState(true)
  const [name, setName] = useState<null | string>(null)
  const [surname, setSurname] = useState<null | string>(null)

  const onHandleClose = (name: string, surname: string) => {
    console.log(`name-${name} surname-${surname}`)
    setName(name)
    setSurname(surname)
    setOpen(false)
  }

  return (
    <>
      <RegisterModal open={open} handleClose={onHandleClose}/>
      {name && surname && <Game name={name} surname={surname}/>}
    </>
  )
}