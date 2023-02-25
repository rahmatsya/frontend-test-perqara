import { useEffect, useState } from "react";
import { searchMovie } from "../helper";

const Searchbar = () => {
  const [searchResult, setSearchResult] = useState<[]>();
  const [keyword, setKeyword] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    if (keyword) {
      searchMovie(keyword)
        .then((response) => {
          setSearchResult(response.results);
        })
        .catch((error) => {
          throw error;
        });
    } else setSearchResult([]);
  }, [keyword]);

  return (
    <div className="h-full w-full">
      <input
        type="text"
        placeholder="Find movie"
        className="bg-darken h-full w-full text-light p-3 focus:outline-none"
        onChange={handleChange}
      />
      {searchResult && (
        <div className="absolute top-15 left-10 right-10 z-50 shadow-lg">
          {searchResult
            .map((result: any) => (
              <a href={`/${result.id}`}>
                <div className="bg-dark hover:bg-black px-4 py-2">
                  {result.title}{" "}
                  {result.release_date.split("-")[0] ? (
                    <span className="opacity-30">{`(${
                      result.release_date.split("-")[0]
                    })`}</span>
                  ) : (
                    ""
                  )}
                </div>
              </a>
            ))
            .slice(0, 7)}
        </div>
      )}
    </div>
  );
};
export default Searchbar;
