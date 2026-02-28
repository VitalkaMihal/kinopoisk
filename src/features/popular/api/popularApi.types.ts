export type Results = {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export type PopularApi = {
  page: number
  results: Results[]
  total_pages: number
  total_results: number
}

type Genres = {
  id: number
  name: string
}

type ProductionCompanies = {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

type ProductionCountries = {
  iso_3166_1: string
  name: string
}

type SpokenLanguages = {
  english_name: string
  iso_639_1: string
  name: string
}

export type MovieApi = {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: null
  budget: number
  genres: Genres[]
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: ProductionCompanies[]
  production_countries: ProductionCountries[]
  release_date: '1999-10-15'
  revenue: 100853753
  runtime: 139
  spoken_languages: SpokenLanguages[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

type Credits = {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
}

type Cast = Credits & {
  cast_id: number
  character: string
  credit_id: string
  order: number
}

type Crew = Credits & {
  credit_id: string
  department: string
  job: string
}

export type CreditsApi = {
  id: number
  cast: Cast[]
  crew: Crew[]
}

export type SortAndFilterParams = {
  sort_by?: string
  with_genres?: number[]
  'vote_average.gte'?: number
  'vote_average.lte'?: number
  page: number
}
