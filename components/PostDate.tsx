import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

export default function PostDate({ dateString }: { dateString: string }) {
  if (!dateString) return null

  const date = parseISO(dateString)
  return (
    <time dateTime={dateString}>
      {format(date, 'LLLL	d, yyyy', { locale: ptBR })}
    </time>
  )
}
