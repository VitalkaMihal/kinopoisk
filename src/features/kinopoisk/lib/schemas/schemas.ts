import { z } from 'zod'

export const categoryTypeSchema = z.enum(['now_playing', 'popular', 'top_rated', 'upcoming'])

export const GenresSchema = z.object({
  id: z.number(),
  name: z.string(),
})

export const SortAndFilterParamsSchema = z.object({
  sort_by: z.string().optional(),
  with_genres: z.array(z.number()).optional(),
  'vote_average.gte': z.number().optional(),
  'vote_average.lte': z.number().optional(),
  page: z.number(),
})

export const CategorySchema = z.object({
  category: categoryTypeSchema,
  pageNumber: z.number(),
})

export const SearchSchema = z.object({
  search: z.string(),
  pageNumber: z.number(),
})

export const ResultsSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullable().optional(),
  genre_ids: z.array(z.number()),
  id: z.number(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().nullable().optional(),
  release_date: z.string(), // Можно дополнить форматами даты при необходимости
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
})

// Schema для PopularApi
export const PopularApiSchema = z.object({
  page: z.number(),
  results: z.array(ResultsSchema),
  total_pages: z.number(),
  total_results: z.number(),
})

// Schemas для ProductionCompanies
export const ProductionCompaniesSchema = z.object({
  id: z.number().nullable().optional(),
  logo_path: z.string().nullable().optional(),
  name: z.string().nullable().optional(),
  origin_country: z.string().nullable().optional(),
})

// Schechemas для ProductionCountries
export const ProductionCountriesSchema = z.object({
  iso_3166_1: z.string(),
  name: z.string(),
})

// Schemas для SpokenLanguages
export const SpokenLanguagesSchema = z.object({
  english_name: z.string(),
  iso_639_1: z.string(),
  name: z.string(),
})

// Schema для MovieApi
export const MovieApiSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullable().optional(),
  belongs_to_collection: z.any().optional(),
  budget: z.number(),
  genres: z.array(z.object({ id: z.number(), name: z.string() })),
  homepage: z.string(),
  id: z.number(),
  imdb_id: z.string().nullable().optional(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().nullable().optional(),
  production_companies: z.array(ProductionCompaniesSchema).nullable().optional(),
  production_countries: z.array(ProductionCountriesSchema),
  release_date: z.string(), // Можно дополнительно проверить формат даты
  revenue: z.number(),
  runtime: z.number(),
  spoken_languages: z.array(SpokenLanguagesSchema),
  status: z.string(),
  tagline: z.string(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
})

// Schema для Credits
export const CreditsSchema = z.object({
  adult: z.boolean().nullable().optional(),
  gender: z.number().nullable().optional(),
  id: z.number(),
  known_for_department: z.string().nullable().optional(),
  name: z.string(),
  original_name: z.string().nullable().optional(),
  popularity: z.number(),
  profile_path: z.string().nullable().optional(),
})

// Schema для Cast (расширяет Credits)
export const CastSchema = CreditsSchema.extend({
  cast_id: z.number(),
  character: z.string(),
  credit_id: z.string(),
  order: z.number(),
})

// Schema для Crew (расширяет Credits)
export const CrewSchema = CreditsSchema.extend({
  credit_id: z.string(),
  department: z.string(),
  job: z.string(),
})

// Schema для CreditsApi
export const CreditsApiSchema = z.object({
  id: z.number(),
  cast: z.array(CastSchema),
  crew: z.array(CrewSchema),
})
