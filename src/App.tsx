import { useEffect, useState, useCallback } from "react";

import { getAllGenre } from "./helper";
import { Header, Footer } from "./components";
import { genreInterface } from "./definitions";
import GenreContext from "./context/Genre.context";
import Route from "./Route"

function App() {
  const [genres, setGenres] = useState<[genreInterface]>();

  // function to find genre name by id. using useCallback, to reduce memory usage
  const getGenre = useCallback(
    (id: number) =>
      genres && genres.length > 0
        ? genres.find((genre) => genre.id === id)
        : "",
    [genres]
  );

  // get genre list at first render, to get each movie's genre
  useEffect(() => {
    getAllGenre().then((response) => {
      //save genre list to state
      setGenres(response.genres);
    });
  }, []);

  return (
    <div className="App">
    <GenreContext.Provider value={{ genres, getGenre }}>
      <Header />
      <Route />
      <Footer />
    </GenreContext.Provider>
    </div>
  );
}

export default App;
