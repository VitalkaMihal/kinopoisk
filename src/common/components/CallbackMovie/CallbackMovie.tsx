import { Card } from '@/common/components'
import type { Results } from '@/features/kinopoisk/api/kinopoiskApi.types.ts'

export const CallbackMovie = (movie: Results) => {
  const poster = movie.poster_path || 'https://placehold.co/280x420/transparent/FOO/png?text=NO+IMAGE'
  return <Card key={movie.id} id={movie.id} title={movie.title} poster={poster} rating={movie.vote_average} />
}
