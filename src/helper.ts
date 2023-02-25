const API_KEY = "05fbe900ddcfa99ae5937c7ea581f18d";
const config: any = {
  method: "GET",
  mode: "cors",
};

//Get Poster Path
export function getPosterPath(name: string, w: string = "original") {
  return `https://image.tmdb.org/t/p/${w}/${name}`;
}

export const getDate = (d: Date) => {
  const date = new Date(d);
  const months = [
    "Januari",
    "Februari",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

// Get Discovery Movie
export async function getMovies({
  sortBy,
  withGenres,
  page
}: {
  sortBy?: string;
  withGenres?: string;
  page?: number;
}) {
  const date = new Date();
  const currentDate = `${date.getFullYear()}-${
    date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
  }-${date.getDate() + 1}`;
  const params: any = {
    api_key: API_KEY,
    page: page || 1,
  };
  if (sortBy) {
    params.sort_by = sortBy;
    params["release_date.lte"] = currentDate;
  }
  if (withGenres) params.with_genres = withGenres;
  const URLParams = new URLSearchParams(params);
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?${URLParams}`,
    config
  );
  return response.json();
}

// Get Popular Movies
export async function getPopularMovies() {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=4`,
    config
  );
  return response.json();
}

// Get All Genre
export async function getAllGenre() {
  const response = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`,
    config
  );
  return response.json();
}

// Search Movie
export async function searchMovie(query: string) {
  const params = {
    api_key: API_KEY,
    query,
  };
  const URLParams = new URLSearchParams(params);
  const response = await fetch(
    "https://api.themoviedb.org/3/search/movie?" + URLParams,
    config
  );
  return response.json();
}

// GET MOVIE DETAILS
export async function getDetail(movieId?: number) {
  const params = new URLSearchParams({
    api_key: API_KEY,
  });
  const response = await fetch(
    `https://api.themoviedb.org/3//movie/${movieId}?` + params,
    config
  );
  return response.json();
}

// GET MOVIE Reviews
export async function getReview(movieId?: number) {
  const params = new URLSearchParams({
    api_key: API_KEY,
  });
  const response = await fetch(
    `https://api.themoviedb.org/3//movie/${movieId}/reviews?` + params,
    config
  );
  return response.json();
}

export async function getRecommendation(movieId?: number) {
  const params = new URLSearchParams({
    api_key: API_KEY,
  });
  const response = await fetch(
    `https://api.themoviedb.org/3//movie/${movieId}/similar?` + params,
    config
  );
  return response.json();
}
