import {useState} from "react";
import QuizModal from "../QuizModal.tsx";
import {Quiz} from "./Quiz.tsx";

export const QuizPage = () => {
  const [open, setOpen] = useState(true)
  const onHandleClose = async () => {
    setOpen(false)
  }

  return (
    <>
      <QuizModal open={open} handleClose={onHandleClose}/>
      {<Quiz/>}
    </>
  );
};
