import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdStar } from "react-icons/md";
import {
  getDetail,
  getPosterPath,
  getReview,
  getRecommendation,
  getDate
} from "../helper";
import { DetailInterface, ReviewInterface, MovieList } from "./../definitions";
import { MovieCard } from "../components";

const DetailKey: React.FC<{ name: string; value: string; last?: boolean }> = ({
  name,
  value,
  last = false,
}) => {
  return (
    <div className={`pr-8 pl-8 ${!last ? "border-r" : ""} border-gray`}>
      <div className="font-light uppercase opacity-60">{name}</div>
      <div className="font-semibold uppercase">{value}</div>
    </div>
  );
};

const isUrl = (s: string) => s?.includes("https://");

const Detail = () => {
  const { id }: { id?: number } = useParams();
  const [detail, setDetail] = useState<DetailInterface>();
  const [reviews, setReviews] = useState<[ReviewInterface]>();
  const [expandText, setExpandText] = useState<string>();
  const [recommedations, setRecommedations] = useState<[MovieList]>();

  useEffect(() => {
    if (id) {
      getDetail(id).then((response) => {
        setDetail(response);
      });
      getReview(id).then((response) => {
        setReviews(response.results);
      });
      getRecommendation(id).then((response) => {
        setRecommedations(response.results);
      });
    }
  }, [id]);

  return detail ? (
    <div>
      <div className="relative h-96">
        <div className="bg-dark opacity-60 absolute top-0 right-0 left-0 bottom-0 z-20"></div>
        <img
          src={getPosterPath(detail.backdrop_path)}
          className="absolute top-0 z-10 right-0 left-0w-full object-cover object-top w-full h-full"
          alt=""
        />
        <img
          className="absolute -bottom-28 left-20 z-40 shadow-lg"
          src={getPosterPath(detail.poster_path, "w300")}
          width="280"
          alt=""
        />
        <div className="flex items-end h-full relative z-30">
          <div className="flex-1">
            <div className="py-5 pl-96">
              <div className="text-2xl">
                {detail.release_date.split("-")[0]}
              </div>
              <h1 className="text-5xl font-semibold">{detail.title}</h1>
              <div className="text">
                {detail.genres.map((genre) => genre.name).join(", ")}
              </div>
            </div>
            <div className="bg-dark/70 py-3 pl-96">
              <div className="flex justify-start">
                <div className="flex items-center gap-3">
                  <MdStar size={48} className="text-yellow" />
                  <span className="text-5xl font-semibold">
                    {String(detail.vote_average).slice(0, 3)}
                  </span>
                </div>
                <DetailKey
                  name="User score"
                  value={`${detail.vote_count} votes`}
                />
                <DetailKey name="Status" value={`${detail.status}`} />
                <DetailKey
                  name="Language"
                  value={`${detail.spoken_languages[0].english_name}`}
                />
                <DetailKey
                  last
                  name="Production"
                  value={`${detail.production_companies[0].name}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-light py-8 container">
        <div className="pl-80 mb-10">
          <h5 className="uppercase text-red font-semibold mb-3">Overview</h5>
          <p className="text-dark">{detail.overview}</p>
        </div>
        <h5 className="uppercase text-red font-semibold mb-3">Reviews</h5>
        <div className="grid grid-cols-2 gap-5 items-start">
          {reviews &&
            reviews.length > 0 &&
            reviews
              .map((review) => (
                <div
                  key={review.id}
                  className="text-dark bg-gray/20 rounded-lg shadow-sm p-5 text-dark"
                >
                  <div className="flex mb-5 items-start justify-between">
                    <div className="flex gap-4">
                      <img
                        className="rounded-full"
                        src={
                          isUrl(review.author_details.avatar_path)
                            ? review.author_details.avatar_path.slice(1)
                            : getPosterPath(review.author_details.avatar_path)
                        }
                        width="60"
                        height="60"
                        alt=""
                      />
                      <div>
                        <div className="font-semibold">{review.author}</div>
                        <div className="font-light">
                          {getDate(review.created_at)}
                        </div>
                      </div>
                    </div>
                    {review.author_details.rating && (
                      <div className="flex text-dark/70 bg-gray/30 items-start p-2 px-4 rounded-xl">
                        <MdStar size={16} className="text-yellow mt-1" />
                        <div className="text-4xl">
                          {review.author_details.rating}
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="italic text-ellipsis overflow-hidden ...">
                    {expandText === review.id
                      ? String(review.content)
                      : String(review.content).slice(0, 170)}
                    {expandText !== review.id &&
                    Number(review.content.length) > 170
                      ? " ... "
                      : ""}
                    {expandText !== review.id &&
                    Number(review.content.length) > 170 ? (
                      <button
                        className="text-red underline"
                        onClick={() => setExpandText(review.id)}
                      >
                        read the rest
                      </button>
                    ) : (
                      ""
                    )}
                  </p>
                </div>
              ))
              .slice(0, 2)}
        </div>
      </div>
      <div className="bg-dark py-10">
        <div className="container">
          <h5 className="uppercase text-light font-semibold mb-10">
            Recommendation Movie
          </h5>
          <div className="grid grid-cols-5 gap-5">
            {recommedations && recommedations.length > 0
              ? recommedations
                  .map((recommedation) => <MovieCard data={recommedation} />)
                  .slice(0, 5)
              : ""}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="text-center text-4xl p-32">Not Found</div>
  );
};

export default Detail;
