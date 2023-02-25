export interface BasicProps {
  children?: JSX.Element[] | JSX.Element | string;
  style?: React.CSSProperties;
  className?: string;
}

export interface ButtonProps extends BasicProps {
  color?: string;
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
}

export interface ListState {
  isLoading: boolean;
  data?: GetMovieRes;
}

export interface MovieList {
  adult: boolean;
  backdrop_path: string;
  genre_ids: [number];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: string;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface GetMovieRes {
  page: number;
  total_pages: number;
  total_result: number;
  results: [MovieList] | any;
}

export interface genreInterface {
  id?: number;
  name?: string;
}

export interface contextInterface {
  genres?: any;
  getGenre: Function;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface DetailInterface {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection?: any;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface AuthorDetails {
  name: string;
  username: string;
  avatar_path: string;
  rating?: any;
}

export interface ReviewInterface {
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: Date;
  id: string;
  updated_at: Date;
  url: string;
}

