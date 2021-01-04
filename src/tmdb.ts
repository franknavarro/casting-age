import axios from 'axios';
import {
  CreditsDetails,
  PersonDetails,
  SearchResults,
  SearchTypes,
  TheDetails,
  TVDetails,
} from './tmdbTypes';
import moment, { Moment } from 'moment';

// const RESULTS_LENGTH = 5;
// const CASTS_LENGTH = 10;

const API_KEY = process.env.REACT_APP_TMDB;
export const IMAGE_PATH = 'https://image.tmdb.org/t/p/original';

const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: { Authorization: `Bearer ${API_KEY}` },
});

export const searchTMDB = async (query: string) => {
  if (!query) return [];

  const stringQuery = new URLSearchParams({ query }).toString();
  const results = await tmdb.get<SearchResults>(`/search/multi?${stringQuery}`);

  return results.data.results;
};

export const getDetails = async (info: SearchTypes): Promise<TheDetails> => {
  const basePath = `/${info.media_type}/${info.id}`;

  const dates: Moment[] = [];
  if (info.media_type === 'tv') {
    const details = await tmdb.get<TVDetails>(basePath);
    const {
      data: { first_air_date, last_air_date, in_production },
    } = details;
    dates.push(moment(first_air_date));
    if (in_production) dates.push(moment());
    else dates.push(moment(last_air_date));
  } else if (info.media_type === 'movie') {
    dates.push(moment(info.release_date));
  }

  const credits = info.media_type === 'tv' ? '/aggregate_credits' : '/credits';
  const creditResults = await tmdb.get<CreditsDetails>(basePath + credits);
  return {
    ...info,
    dates,
    cast: creditResults.data.cast,
  } as TheDetails;
};

export const getPersonDetails = async (id: number) => {
  const results = await tmdb.get<PersonDetails>(`/person/${id}`);
  return results.data;
};

export const getPosterImage = (data: SearchTypes) => {
  const imagePath =
    data.media_type === 'person' ? data.profile_path : data.poster_path;
  if (imagePath) return `${IMAGE_PATH}/${imagePath}`;
  return '';
};

export const getName = (data: SearchTypes) => {
  const name = data.media_type === 'movie' ? data.title : data.name;

  let year = '';
  if (data.media_type === 'movie') year = data.release_date;
  else if (data.media_type === 'tv') year = data.first_air_date;
  year = year?.split('-')[0];

  return `${name} ${year ? `(${year})` : ''}`;
};
