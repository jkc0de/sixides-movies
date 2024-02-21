"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const DismissableBanner = () => {
  const [openBanner, setIsOpenBanner] = useState<boolean>(true);

  return (
    <>
      <div className={openBanner ? "block" : "hidden"}>
        <div className="flex w-full items-center font-mono justify-center gap-2 bg-[#FCCD8B] p-2 text-center text-black  md:gap-5 md:text-xl ">
          <div className="text-base flex gap-2">
            Elevate your movie night experience!
            <span className="cursor-pointer underline text-primary">
              <Link href="https://www.sixides.com/" target="_blank">
                Upgrade Now
              </Link>
            </span>
          </div>

          <span
            className="mt-0.5  cursor-pointer text-lg font-thin md:text-3xl"
            onClick={() => {
              setIsOpenBanner(false);
            }}
          >
            <X className="size-6" />
          </span>
        </div>
      </div>
    </>
  );
};
