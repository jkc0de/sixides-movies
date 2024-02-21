import Sorting from "./Sorting";
import Filter from "./Filter";
import { Suspense } from "react";
import Loading from "./loading";
import MovieList from "./MovieList";

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="flex flex-col items-center justify-between p-4 md:p-12 lg:p-18 xl:px-24 bg-primary gap-5">
      <div className="w-full max-w-5xl flex justify-end">
        <div className="flex items-center gap-3 w-full md:w-1/2 md:gap-5">
          <div className="w-1/2">
            <Filter />
          </div>
          <div className="w-1/2">
            <Sorting />
          </div>
        </div>
      </div>
      <Suspense fallback={<Loading />}>
        <MovieList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
