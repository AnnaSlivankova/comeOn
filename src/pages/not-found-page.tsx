import {NotFound} from "../components/icons";
import {useRouteError} from "react-router-dom";

export default function NotFoundPage() {
  const error = useRouteError();
  console.log(error)

  return (
    <>
      <NotFound/>
    </>
  )
}
