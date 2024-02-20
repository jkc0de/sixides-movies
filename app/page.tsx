import dayjs from "dayjs";

import MovieCard from "./MovieCard";
import PaginationComponent from "./Pagination";
import { redirect } from "next/navigation";
import Sorting from "./Sorting";

async function getMovieList(searchParams?: { [key: string]: string }) {
  console.log(searchParams);
  const pageNumber = searchParams?.page || "1";
  if (pageNumber === "0") {
    redirect("/?page=1");
  }

  const sortBy = searchParams?.sortBy || "popularity.desc";
  const minDate = dayjs(new Date(Date.now() - 40 * 24 * 60 * 60 * 1000)).format(
    "YYYY-MM-DD"
  ); // 40 days before today
  const maxDate = dayjs(new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)).format(
    "YYYY-MM-DD"
  ); // 2 days after today

  const url = `${process.env.API_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageNumber}&sort_by=${sortBy}&with_release_type=2|3&release_date.gte=${minDate}&release_date.lte=${maxDate}`;

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

export default async function Home({ searchParams }: { searchParams: any }) {
  const movies = await getMovieList(searchParams);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-12 lg:p-18 xl:p-24 bg-primary gap-5">
      <div className="w-full max-w-5xl flex justify-end">
        <Sorting />
      </div>
      <div className="max-w-5xl w-full items-start justify-between font-mono text-sm grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-3 md:gap-5">
        {movies.results.map((movie: MovieProps) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div className="max-w-5xl flex w-full items-center justify-center py-5">
        <PaginationComponent totalPages={movies.total_pages} />
      </div>
    </main>
  );
}
