import { TMDB } from '@/services/TMDB'
import { MovieCard } from './movie-card'

type Variant = 'popular' | 'nowPlaying' | 'topRated' | 'upcoming'

type MoviesListProps = {
  variant: Variant
}

export const MoviesList = async ({ variant }: MoviesListProps) => {
  const { results } = await TMDB.movies[variant]()

  const title: Record<Variant, string> = {
    nowPlaying: 'Now playing movies',
    popular: 'Popular movies',
    topRated: 'Top rated movies',
    upcoming: 'Up coming movies',
  }

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-end">
        <div className="flex gap-2 items-center">
          <div className="h-3 w-3 bg-muted rounded-sm" />
          <h2 className="text-2xl font-bold">{title[variant]}</h2>
        </div>

        <span className="underline text-xs  cursor-pointer text-muted-foreground">
          Show all
        </span>
      </div>

      <div className="grid grid-cols-5 gap-6">
        {results.slice(0, 5).map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </section>
  )
}