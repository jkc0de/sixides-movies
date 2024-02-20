import Image from "next/image";
import dayjs from "dayjs";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CastAvatar from "./CastAvatar";

async function getMovieDetails(movieId: number) {
  const url = `${process.env.API_URL}/movie/${movieId}?append_to_response=credits&language=en-US`;

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

export default async function MovieCard({ movie }: { movie: MovieProps }) {
  const movieDetails = await getMovieDetails(movie.id);
  return (
    <Dialog>
      <DialogTrigger className="w-full h-full outline-none">
        <Card className="rounded-lg overflow-hidden border-primary shadow-md w-full h-full">
          <CardContent className="relative">
            {movieDetails.poster_path ? (
              <Image
                src={`https://media.themoviedb.org/t/p/w440_and_h660_face/${movie.poster_path}`}
                width={440}
                height={660}
                alt={movieDetails.title}
              />
            ) : (
              <Image
                src="/default-movie-poster.svg"
                width={440}
                height={660}
                alt={movieDetails.title}
                className="border-b border-gray-400"
              />
            )}
            {Math.ceil(movieDetails.vote_average * 10) > 0 && (
              <span className="absolute h-8 w-8 rounded-full bg-gradient-to-r from-primary to-blue-500 items-center flex justify-center -bottom-3 left-2 md:left-5 text-white font-medium p-2">
                {Math.ceil(movieDetails.vote_average * 10)}
              </span>
            )}
          </CardContent>
          <CardHeader className="md:p-6 p-3">
            {movieDetails.title && (
              <CardTitle className="text-base leading-5 line-clamp-3">
                {movieDetails.title}
              </CardTitle>
            )}

            {movieDetails.release_date && (
              <CardDescription>
                {dayjs(movieDetails.release_date).format("DD MMMM YYYY")}
              </CardDescription>
            )}
          </CardHeader>

          <CardContent className="pb-3 pt-1 md:pb-6 md:px-6 px-3 flex items-center justify-center flex-wrap gap-3">
            {movieDetails.genres.length > 0 &&
              movieDetails.genres.map((genre: GenreProps) => (
                <Badge key={genre.id}>{genre.name}</Badge>
              ))}
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {movieDetails.title && (
            <DialogTitle className="text-xl font-bold text-primary">
              {movieDetails.title}
            </DialogTitle>
          )}
          {movieDetails.release_date && (
            <DialogDescription>
              Released date: {movieDetails.release_date}
            </DialogDescription>
          )}
        </DialogHeader>

        {movieDetails.overview && (
          <div className="flex flex-col gap-1">
            <span className="font-semibold">Synopsis:</span>
            <p>{movieDetails.overview}</p>
          </div>
        )}

        {movieDetails.credits?.cast?.length > 0 && (
          <div className="flex overflow-x-scroll flex-col gap-1">
            <span className="font-semibold">Cast:</span>
            <div className="overflow-x-scroll flex gap-2">
              {movieDetails.credits?.cast
                ?.slice(0, 10)
                .map((cast: CastProps) => (
                  <CastAvatar
                    key={`${movieDetails.title}-${cast.name}`}
                    cast={cast}
                  />
                ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
