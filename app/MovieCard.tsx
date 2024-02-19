import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import dayjs from "dayjs";
import { Badge } from "@/components/ui/badge";
import { formatGenre } from "@/lib/format";

export default function MovieCard({ movie }: { movie: MovieProps }) {
  return (
    <Card className="rounded-lg overflow-hidden border-primary shadow-md w-full h-full">
      {movie.poster_path && (
        <CardContent>
          <Image
            src={`https://media.themoviedb.org/t/p/w440_and_h660_face/${movie.poster_path}`}
            width={440}
            height={660}
            alt={movie.title}
          />
        </CardContent>
      )}
      <CardHeader className="md:p-6 p-3">
        {movie.title && (
          <CardTitle className="text-base leading-5 line-clamp-3">
            {movie.title}
          </CardTitle>
        )}

        {movie.release_date && (
          <CardDescription>
            {dayjs(movie.release_date).format("DD MMMM YYYY")}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="pb-3 pt-1 md:pb-6 md:px-6 px-3 justify-start flex items-center flex-wrap gap-3">
        {movie.genre_ids.length > 0 &&
          movie.genre_ids.map((genreId: number) => (
            <Badge>{formatGenre(genreId)}</Badge>
          ))}
      </CardContent>
      {/* <CardContent className="px-6 py-2 line-clamp-[8]">
        <p>{movie.overview}</p>
      </CardContent> */}
      {/* <CardFooter className="p-6">
        <p>Card Footer</p>
      </CardFooter> */}
    </Card>
  );
}
