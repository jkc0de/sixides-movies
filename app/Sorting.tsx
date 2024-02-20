"use client";

import { useCallback } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import sortingList from "@/public/data/sorting.json";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Sorting() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSelectChange = (value: string) => {
    const updatedParams = new URLSearchParams(searchParams.toString());
    updatedParams.set("sortBy", value);
    updatedParams.set("page", "1"); // Set the page query parameter to 1

    router.push(pathname + "?" + updatedParams.toString());
  };
  return (
    <Select onValueChange={handleSelectChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        {sortingList.sorting.map((sort) => (
          <SelectItem key={sort.value} value={sort.value}>
            {sort.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
