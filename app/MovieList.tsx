import dayjs from "dayjs";

import MovieCard from "./MovieCard";
import PaginationComponent from "./Pagination";
import { redirect } from "next/navigation";

async function getMovieList(searchParams?: { [key: string]: string }) {
  //   await new Promise((resolve) => setTimeout(resolve, 3000));

  const pageNumber = searchParams?.page || "1";
  if (pageNumber === "0") {
    redirect("/?page=1");
  }

  const genreList = searchParams?.genres || [];

  let genres = "";

  if (genreList.length > 0) {
    const test = Array(genreList).join();
    genres = test.replaceAll(",", "%7C");
  }

  const minRange = Number(searchParams?.minRange) / 10 || 0;
  const maxRange = Number(searchParams?.maxRange) / 10 || 10;

  const sortBy = searchParams?.sortBy || "popularity.desc";
  const minDate = dayjs(new Date(Date.now() - 40 * 24 * 60 * 60 * 1000)).format(
    "YYYY-MM-DD"
  ); // 40 days before today
  const maxDate = dayjs(new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)).format(
    "YYYY-MM-DD"
  ); // 2 days after today

  const url = `${process.env.API_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageNumber}&sort_by=${sortBy}&with_release_type=2|3&release_date.gte=${minDate}&release_date.lte=${maxDate}&vote_average.gte=${minRange}&vote_average.lte=${maxRange}&with_genres=${genres}`;

  console.log(url);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function MovieList({
  searchParams,
}: {
  searchParams: any;
}) {
  const movies = await getMovieList(searchParams);

  return (
    <>
      <div className="max-w-5xl w-full items-start justify-between font-mono text-sm grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-3 md:gap-5">
        {movies.results.map((movie: MovieProps) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div className="max-w-5xl flex w-full items-center justify-center py-5">
        <PaginationComponent totalPages={movies.total_pages} />
      </div>
    </>
  );
}
