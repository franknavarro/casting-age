import { Moment } from 'moment';

export interface SearchResults {
  page: number;
  results: SearchResultTypes;
  total_results: number;
  total_pages: number;
}

export type SearchTypes = MovieSearch | TVSearch | PersonSearch;

export type SearchResultTypes = Array<SearchTypes>;

export interface MovieSearch {
  poster_path: string | null;
  adult: boolean;
  overview: string;
  release_date: string;
  original_title: string;
  genre_ids: number[];
  id: number;
  media_type: 'movie';
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

export interface TVSearch {
  poster_path: string | null;
  popularity: number;
  id: number;
  overview: string;
  backdrop_path: string | null;
  vote_average: number;
  media_type: 'tv';
  first_air_date: string;
  origin_country: string[];
  genre_ids: number[];
  original_language: string;
  vote_count: number;
  name: string;
  original_name: string;
}

export interface PersonSearch {
  profile_path: string | null;
  adult: boolean;
  id: number;
  media_type: 'person';
  known_for: Array<MovieSearch | TVSearch>;
  name: string;
  popularity: number;
}

export type TheDetails = TVInfo | MovieInfo | PersonInfo;

export interface TVInfo extends TVSearch {
  dates: Moment[];
  cast: TVCast[];
}
export interface PersonInfo extends PersonSearch {
  dates: Moment[];
  cast: MovieCast[];
}
export interface MovieInfo extends MovieSearch {
  dates: Moment[];
  cast: MovieCast[];
}

export interface CastDetails {
  adult: boolean;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
}

export interface TVCast extends CastDetails {
  roles?: [
    {
      credit_id: string;
      character: string;
      episode_count: number;
    },
  ];
  total_episode_count?: number;
}

export interface MovieCast extends CastDetails {
  cast_id?: number;
  character?: string;
}

export interface CreditsDetails {
  cast: TVCast[] | MovieCast[];
}

export interface MovieDetails {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: null | object;
  budget: number;
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  revenue: number;
  runtime: number | null;
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface TVDetails {
  backdrop_path: string | null;
  first_air_date: string;
  homepage: string;
  id: number;
  in_production: boolean;
  last_air_date: string;
  last_episode_to_air: object;
  name: string;
  next_episode_to_air: null;
  number_of_episodes: number;
  number_of_seasons: number;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

export interface PersonDetails {
  birthday: string | null;
  known_for_department: string;
  deathday: null | string;
  id: number;
  name: string;
  also_known_as: string[];
  gender: number;
  biography: string;
  popularity: number;
  place_of_birth: string | null;
  profile_path: string | null;
  adult: boolean;
  imdb_id: string;
  homepage: null | string;
}
