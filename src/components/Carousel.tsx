import { useEffect, useState, useContext, useRef } from "react";
import { BsCircleFill, BsStarFill } from "react-icons/bs";

import { getPopularMovies, getPosterPath } from "../helper";
import { INIT_LIST_STATE } from "../constants";
import { GetMovieRes, ListState, MovieList } from "../definitions";
import GenreContext from "../context/Genre.context";

const List = () => {
  const [lists, setLists] = useState<ListState>(INIT_LIST_STATE);
  const [activeItem, setActiveItem] = useState(2);
  const carouselRef = useRef<HTMLDivElement>(null);
  const context = useContext(GenreContext);

  useEffect(() => {
    getPopularMovies()
      .then((response: GetMovieRes) => {
        setLists({
          isLoading: false,
          data: {
            ...response,
            results: response.results.splice(0, 5),
          },
        });
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  useEffect(() => {
    if (carouselRef.current && !lists.isLoading) {
      const el = carouselRef.current;
      el.style.transform = `translate(-${activeItem * 50 + (activeItem * 17)}%, 0)`;
    }
  }, [lists, activeItem]);
  return (
    <div className="container relative py-12">
      <div className="pr-96">
        <div
          className="flex flex-nowrap gap-16 carousel-container transition duration-300 ease-in-out"
          ref={carouselRef}
        >
          {!lists.isLoading &&
            lists?.data?.results.map((list: MovieList, i: number) => (
              <div
                className={`flex items-center justify-center flex-none transition duration-300 ease-in-out w-9/12 carousel-item ${
                  activeItem === i ? "opacity-100" : "opacity-20"
                }`}
                key={list.id}
              >
                <img src={getPosterPath(list.poster_path, "w300")} alt="" />
                <div className="bg-black flex-1 p-5">
                  <div className="flex font-semibold items-center gap-2 mb-2">
                    <BsStarFill className="text-yellow" />
                    {list.vote_average}
                  </div>
                  <div className="font-semibold mb-2 text-xl">{list.title}</div>
                  <div className="font-normal flex gap-2 items-center mb-3">
                    {list.release_date.split("-")[0]}{" "}
                    <BsCircleFill size={7} className="opacity-30" />{" "}
                    {context.getGenre(list.genre_ids[0]).name}
                  </div>
                  <p className="opacity-70 font-light text-sm">
                    {list.overview}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="flex gap-2 justify-center mt-12">
        {lists.data?.results.map((list: any, i: number) => (
          <button onClick={() => setActiveItem(i)} key={list.id}>
            <div
              className={`w-2 h-2 rounded-full trans transition duration-200 ${
                activeItem === i ? "bg-red" : "bg-gray"
              } ${activeItem === i ? "px-4" : "px-0"}`}
            ></div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default List;
