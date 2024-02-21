"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { formatGenre } from "@/lib/format";
import { debounce } from "lodash";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

import genreList from "@/public/data/genre.json";
import RangeSlider from "@/components/ui/rangeslider";
import { Button } from "@/components/ui/button";

interface filterProps {
  genres: Array<string>;
  minRange: number;
  maxRange: number;
}

export default function Filter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [selectedGenres, setSelectedGenres] = useState<Array<string>>([]);
  const [selectedRatingsRange, setSelectedRatingsRange] = useState<
    Array<number>
  >([0, 100]);
  const [filterChanges, setFilterChanges] = useState<filterProps>({
    genres: [],
    minRange: 0,
    maxRange: 100,
  });

  const handleCheckChange = (value: string) => {
    let newSelectedGenres = [...selectedGenres];
    if (newSelectedGenres.includes(value)) {
      newSelectedGenres = newSelectedGenres.filter((gID) => gID !== value);
    } else {
      newSelectedGenres.push(value);
    }
    setSelectedGenres(newSelectedGenres);
    setFilterChanges({ ...filterChanges, genres: newSelectedGenres });
  };

  const debouncedSetRatingsRange = useCallback(
    debounce((range) => {
      setSelectedRatingsRange(range);
      setFilterChanges({
        ...filterChanges,
        minRange: range[0],
        maxRange: range[1],
      });
    }, 800), // Adjust the debounce delay (in milliseconds) as needed
    [filterChanges]
  );

  const handleSliderChange = (range: Array<number>) => {
    debouncedSetRatingsRange(range);
  };

  const handleDeleteGenre = (genre: string) => {
    const filteredGenres = selectedGenres.filter((genreId) => {
      return genreId !== genre;
    });

    setSelectedGenres(filteredGenres);
    setFilterChanges({ ...filterChanges, genres: filteredGenres });
  };

  useEffect(() => {
    const genresFromUrl =
      Array.from(new URLSearchParams(searchParams.toString()).entries()).reduce(
        (accumulator, entry) => {
          if (entry[0].toLowerCase().startsWith("genres")) {
            accumulator.push(entry[1]);
          }
          return accumulator;
        },
        [] as string[]
      ) || [];
    setSelectedGenres(genresFromUrl);

    const minRangeFromUrl = searchParams.get("minRange");
    const maxRangeFromUrl = searchParams.get("maxRange");

    setSelectedRatingsRange([
      Number(minRangeFromUrl) || 0,
      Number(maxRangeFromUrl) || 100,
    ]);
    setFilterChanges({
      ...filterChanges,
      genres: genresFromUrl,
      minRange: Number(minRangeFromUrl) || 0,
      maxRange: Number(maxRangeFromUrl) || 100,
    });
  }, [searchParams]);

  const handleApplyFilter = () => {
    setIsLoading(true);
    try {
      const updatedParams = new URLSearchParams(searchParams.toString());
      if (filterChanges.genres) {
        updatedParams.delete("genres"); // Remove existing genres param before appending new ones
        if (updatedParams.has("page")) {
          updatedParams.set("page", "1"); // Set the page query parameter to 1
        }
        filterChanges.genres.forEach((genreID) => {
          updatedParams.append("genres", genreID);
        });
      }
      if (filterChanges.minRange >= 0) {
        if (filterChanges.minRange === 0) {
          updatedParams.delete("minRange");
        } else {
          updatedParams.set("minRange", filterChanges.minRange.toString());
        }
      }
      if (filterChanges.maxRange) {
        if (filterChanges.maxRange === 100) {
          updatedParams.delete("maxRange");
        } else {
          updatedParams.set("maxRange", filterChanges.maxRange.toString());
        }
      }
      router.push(pathname + "?" + updatedParams.toString(), { scroll: false });
    } catch (error) {
      console.log("routing error filter");
    } finally {
      setIsLoading(false);
      setFilterOpen(false);
    }
  };

  const handleClearFilter = () => {
    setFilterChanges({ genres: [], minRange: 0, maxRange: 100 });
    setSelectedGenres([]);
    setSelectedRatingsRange([0, 100]);
  };

  return (
    <Popover open={filterOpen} onOpenChange={setFilterOpen}>
      <PopoverTrigger className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus:ring-slate-300">
        Filters
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2 pb-2" align="start">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Genres</span>
            <span className="items-end">
              <Button
                className="w-full text-sm"
                onClick={handleClearFilter}
                variant="outline"
              >
                Clear
              </Button>
            </span>
          </div>
          <div className="flex flex-wrap gap-1 pb-1">
            {selectedGenres.map((genre) => (
              <Badge key={genre}>
                <div className="flex items-center gap-2.5 justify-between">
                  <span>{formatGenre(Number(genre))}</span>
                  <X
                    className="h-4 w-4 cursor-pointer"
                    onClick={() => handleDeleteGenre(genre)}
                  />
                </div>
              </Badge>
            ))}
          </div>
          <Separator orientation="horizontal" />
          <div className="flex flex-col gap-2 max-h-64 overflow-y-scroll">
            {genreList.genres.length > 0 &&
              genreList.genres.map((genre) => (
                <div
                  key={genre.id}
                  className="flex items-center border-b pb-1.5 pt-1 last:border-none gap-2"
                >
                  <Checkbox
                    id={genre.id}
                    checked={selectedGenres.includes(genre.id)}
                    onCheckedChange={() => handleCheckChange(genre.id)}
                  />
                  <label
                    htmlFor={genre.id}
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {genre.name}
                  </label>
                </div>
              ))}
          </div>
        </div>
        <Separator orientation="horizontal" />
        <div className="flex flex-col gap-1.5">
          <span className="text-lg font-semibold">Ratings</span>
          <Separator orientation="horizontal" />
          <div className="flex flex-col pt-5 pb-10">
            <RangeSlider
              min={0}
              max={100}
              step={1}
              minDistance={10}
              rangeValue={selectedRatingsRange}
              setRangeValue={handleSliderChange}
            />
          </div>
        </div>
        <Separator orientation="horizontal" />
        <div className="flex items-center gap-4">
          <Button
            className="w-full text-lg"
            onClick={handleApplyFilter}
            disabled={isLoading}
          >
            Apply
          </Button>
          <Button
            className="w-full text-lg"
            onClick={() => {
              setFilterOpen(false);
            }}
            variant="secondary"
          >
            Close
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
