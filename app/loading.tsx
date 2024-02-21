import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  const skeletons = Array(20).fill(null); // Create an array with 20 null values

  return (
    <div className="max-w-5xl w-full items-start justify-between font-mono text-sm grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-3 md:gap-5">
      {/* {skeletons.map((_, index) => (
        <Skeleton
          key={index}
          className="rounded-lg overflow-hidden border-primary shadow-md w-[171] h-[256] bg-white"
        />
      ))} */}
      <span className="text-lg">Loading....</span>
    </div>
  );
};

export default Loading;
