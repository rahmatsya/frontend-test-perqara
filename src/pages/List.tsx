import { useEffect, useState, useContext } from "react";

import { ListState, GetMovieRes, MovieList, Genre } from "../definitions";
import { INIT_LIST_STATE, INIT_FILTER_STATE } from "../constants";
import { getMovies } from "../helper";
import { Button, MovieCard, SectionTitle } from "../components";
import GenreContext from "./../context/Genre.context";

const List = () => {
  const [lists, setLists] = useState<ListState>(INIT_LIST_STATE);
  const [genres, setGenres] = useState<[number?]>([]);
  const [sortBy, setSortBy] = useState<string>(INIT_FILTER_STATE);
  const context = useContext(GenreContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nGenres: [number?] = [...genres];
    const value: number = Number(e.target.value);
    if (nGenres?.includes(value)) {
      nGenres.splice(
        nGenres.findIndex((v) => v === value),
        1
      );
    } else {
      nGenres?.push(Number(value));
    }
    setGenres(nGenres);
  };

  const loadMore = () => {
    getMovies({
      withGenres: genres.join(", "),
      sortBy: sortBy,
      page: lists.data?.page ? lists.data?.page + 1 : 1,
    })
      .then((response: GetMovieRes) => {
        setLists((s) => ({
          isLoading: false,
          data: {
            ...response,
            results: [...s.data?.results, ...response.results],
          },
        }));
      })
      .catch((error) => {
        throw error;
      });
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  useEffect(() => {
    setLists({
      isLoading: true,
      data: undefined,
    });
    getMovies({ withGenres: genres.join(", "), sortBy: sortBy })
      .then((response: GetMovieRes) => {
        setLists({
          isLoading: false,
          data: response,
        });
      })
      .catch((error) => {
        throw error;
      });
  }, [genres, sortBy]);

  return (
    <div className="container relative py-16">
      <div className="absolute top-0 left-0 h-56 w-full bg-white/5"></div>
      <div className="relative z-10">
        <SectionTitle className="mb-7">Movies</SectionTitle>
        <div className="flex gap-12 items-start">
          <div className="flex-none w-72 bg-dark rounded-lg">
            <div className="p-4 border-b border-black">
              <h5 className="font-semibold">Sort result by</h5>
            </div>
            <div className="p-4 border-b border-black">
              <select
                id=""
                onChange={handleSelect}
                className="bg-black/40 p-2 rounded-sm focus:outline-none"
              >
                <option value="popularity.asc">Popularity Ascending</option>
                <option value="popularity.desc">Popularity Descending</option>
                <option value="release_date.asc">Release Date Ascending</option>
                <option value="release_date.desc">
                  Release Date Descending
                </option>
                <option value="vote_count.asc">Rating Ascending</option>
                <option value="vote_count-desc">Rating Descending</option>
              </select>
            </div>
            <div className="p-4 border-b border-black">
              <h5 className="font-semibold">Genre</h5>
            </div>
            <div className="p-4 border-b border-black">
              {context?.genres?.map((genre: Genre) => (
                <div className="flex justify-between mb-2">
                  <label htmlFor={String(genre.id)} className="opacity-70">
                    {genre.name}
                  </label>
                  <input
                    type="checkbox"
                    className="mr-3 checked:after:bg-red after:content-[''] after:absolute after:top-0 after:left-o relative after:border-white/30 after:rounded-sm after:border after:bg-black/30 appearance-none after:w-3 after:h-3"
                    id={String(genre.id)}
                    onChange={handleChange}
                    value={genre.id}
                    checked={genres?.includes(genre.id)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex-auto grid grid-cols-4 gap-5">
            {lists.isLoading
              ? Array(10)
                  .fill("")
                  .map((_) => (
                    <div className="h-64 bg-dark mb-5 w-48 pulse movie-poster"></div>
                  ))
              : lists.data?.results.map((result: MovieList) => (
                  <MovieCard data={result} />
                ))}
          </div>
        </div>
      </div>
      {lists.data && lists.data?.page < lists.data?.total_pages && (
        <div className="text-center mt-16">
          <Button color="red" onClick={loadMore}>
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

export default List;
