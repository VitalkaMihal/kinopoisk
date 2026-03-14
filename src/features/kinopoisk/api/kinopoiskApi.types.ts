import { z } from 'zod'
import {
  CastSchema,
  CreditsApiSchema,
  CreditsSchema,
  CrewSchema,
  MovieApiSchema,
  PopularApiSchema,
  ProductionCompaniesSchema,
  ProductionCountriesSchema,
  ResultsSchema,
  SpokenLanguagesSchema,
} from '@/features/kinopoisk/lib/schemas'

export type Results = z.infer<typeof ResultsSchema>
export type PopularApi = z.infer<typeof PopularApiSchema>
export type ProductionCompanies = z.infer<typeof ProductionCompaniesSchema>
export type ProductionCountries = z.infer<typeof ProductionCountriesSchema>
export type SpokenLanguages = z.infer<typeof SpokenLanguagesSchema>
export type MovieApi = z.infer<typeof MovieApiSchema>
export type Credits = z.infer<typeof CreditsSchema>
export type Cast = z.infer<typeof CastSchema>
export type Crew = z.infer<typeof CrewSchema>
export type CreditsApi = z.infer<typeof CreditsApiSchema>
