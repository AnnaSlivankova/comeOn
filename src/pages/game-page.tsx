import Game from "./Game.tsx";
import {useState} from "react";
import BasicModal from "../components/modal/modal.tsx";

export default function GamePage() {
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
      <BasicModal open={open} handleClose={onHandleClose}/>
      {name && surname && <Game name={name} surname={surname}/>}
    </>
  )
}