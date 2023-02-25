import { useEffect, useState } from "react";
import { SectionTitle, Button, MovieCard, Carousel } from "../components";
import { getMovies } from "./../helper";
import { GetMovieRes, MovieList, ListState } from "../definitions";
import { INIT_LIST_STATE, INIT_FILTER_STATE } from "../constants";

const Home = () => {
  const [lists, setLists] = useState<ListState>(INIT_LIST_STATE);
  const [sortBy, setSortBy] = useState<string>(INIT_FILTER_STATE);
  useEffect(() => {
    getMovies({ sortBy })
      .then((response: GetMovieRes) => {
        setLists({
          isLoading: false,
          data: response,
        });
      })
      .catch((error) => {
        throw error;
      });
  }, [sortBy]);

  return (
    <>
      <Carousel />
      <div className="container relative py-20">
        <div className="absolute top-0 left-0 h-56 w-full bg-white/5"></div>
        <div className="flex relative z-10 justify-between items-center mb-14">
          <SectionTitle>Discover Movies</SectionTitle>
          <div className="flex gap-2">
            <Button
              color={sortBy === "popularity.desc" ? "red" : "dark"}
              onClick={() => setSortBy("popularity.desc")}
            >
              Popularity
            </Button>
            <Button
              color={sortBy === "release_date.desc" ? "red" : "dark"}
              onClick={() => setSortBy("release_date.desc")}
            >
              Release Date
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-5">
          {lists.isLoading
            ? Array(10)
                .fill("")
                .map((_, i) => (
                  <div key={i} className="w-full h-64 bg-dark mb-5 pulse movie-poster"></div>
                ))
            : lists.data?.results.map((result: MovieList) => (
                <MovieCard key={result.id} data={result} />
              ))}
        </div>
      </div>
    </>
  );
};

export default Home;
