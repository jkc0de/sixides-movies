import genreList from "@/public/data/genre.json"

const genreNameMap = genreList.genres.reduce((map, genre) => {
    map[genre.id] = genre.name;
    return map;
  }, {} as Record<number, string>);

export const formatGenre = (genreId: number): string => {
    return genreNameMap[genreId] || 'Unknown genre'; // Handle the case when the genre ID is not found
  };
