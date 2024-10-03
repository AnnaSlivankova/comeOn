import {format} from "date-fns";
import {ru} from "date-fns/locale";

export const formatDate = (dateString: string): {time:string, date:string} => {
  const formattedDate = new Date(dateString)
  const time = format(formattedDate, 'HH:mm:ss', {locale: ru})
  const date = format(formattedDate, 'dd.MM.yy', {locale: ru})

  return {time, date}
}