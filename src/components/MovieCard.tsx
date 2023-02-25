import { useContext } from "react";
import { MdStar } from "react-icons/md";

import { MovieList } from "../definitions";
import GenreContext from "./../context/Genre.context";
import { getPosterPath } from "./../helper";

const MovieCard: React.FC<{ data: MovieList }> = ({ data }) => {
  const context = useContext(GenreContext);

  return (
    <div key={data.id} className={"mb-5 relative"}>
      {data.poster_path ? (
        <img
          src={getPosterPath(data.poster_path, "w400")}
          className="mb-3 movie-poster"
          alt={data.title}
        />
      ) : (
        <div className="w-full h-80 bg-dark mb-5 flex items-center justify-center movie-poster">
          {" "}
          <i className="opacity-60">No Poster</i>{" "}
        </div>
      )}
      <div className="absolute top-0 right-0 h-full w-full bg-dark flex flex-col gap-8 opacity-0 hover:opacity-100 ease-in-out duration-300 justify-center items-center movie-poster">
        <div className="flex gap-2">
          <MdStar className="text-yellow" size={24} />
          <span className="font-bold text-lg">
            {data.vote_average ? data.vote_average : "N/A"}
          </span>
        </div>
        <div className="text-center px-3 text-sm">
          {data.genre_ids
            .map((genre) => context.getGenre(genre).name)
            .join(", ")}
        </div>
        <a href={`/${data.id}`} className="bg-red px-5 py-1 rounded-full">
          View
        </a>
      </div>
      <div className="absolute top-0 right-0 py-1 px-2 bg-dark opacity-80 font-semibold">
        {data.vote_average ? data.vote_average : "N/A"}
      </div>
      <h5 className="font-semibold text-base truncate ...">{data.title}</h5>
      <span className="text-gray">{data.release_date.split("-")[0]}</span>
    </div>
  );
};

export default MovieCard;
