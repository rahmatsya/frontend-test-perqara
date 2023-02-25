import { createContext } from "react";
import { contextInterface } from "./../definitions";

const GenreContext = createContext<contextInterface>({
  genres: undefined,
  getGenre: () => {},
});

export default GenreContext;
