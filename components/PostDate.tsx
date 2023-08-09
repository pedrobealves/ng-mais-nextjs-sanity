import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

export default function PostDate({ dateString }: { dateString: string }) {
  console.log('Data' + dateString)

  if (!dateString) return null

  const date = parseISO(dateString)
  return (
    <time dateTime={dateString}>
      {format(date, 'LLLL	d, yyyy', { locale: ptBR })}
    </time>
  )
}
