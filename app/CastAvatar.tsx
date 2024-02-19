import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

// https://image.tmdb.org/t/p/w138_and_h175_face
export default function CastAvatar({ cast }: { cast: CastProps }) {
  return (
    <Card className="rounded-lg overflow-hidden border-primary shadow-md min-w-[128px] w-[128px]">
      {cast.profile_path ? (
        <CardContent className="relative w-full">
          <Image
            src={`https://image.tmdb.org/t/p/w138_and_h175_face/${cast.profile_path}`}
            width={138}
            height={175}
            alt={cast.name}
            style={{ objectFit: "cover" }}
          />
        </CardContent>
      ) : (
        <CardContent className="relative items-center justify-center flex w-full h-[162px]">
          <Image
            src={`default-user.svg`}
            width={138}
            height={175}
            alt={cast.name}
            style={{ objectFit: "cover" }}
          />
        </CardContent>
      )}
      <CardHeader className="p-2">
        {cast.name && (
          <CardTitle className="text-base flex items-center leading-5 line-clamp-3">
            {cast.name}
          </CardTitle>
        )}

        {cast.character && (
          <CardDescription className="text-sm flex items-center leading-5 line-clamp-2">
            {cast.character}
          </CardDescription>
        )}
      </CardHeader>
    </Card>
  );
}
