"use client";

import { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";

export default function RangeSlider({
  min,
  max,
  step,
  minDistance,
  label,
  rangeValue,
  setRangeValue,
}: {
  min: number;
  max: number;
  step: number;
  minDistance: number;
  label?: string;
  rangeValue: Array<number>;
  setRangeValue: (range: Array<number>) => void;
}) {
  const [value, setValue] = useState<Array<number>>([]);

  useEffect(() => {
    setValue(rangeValue);
  }, [rangeValue]);

  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
      setRangeValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
      setRangeValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };

  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full justify-between text-sm">
        <span>
          {label}
          {/* {rangeValue && rangeValue[0]} */}
          {min}
        </span>
        <span>
          {label}
          {/* {rangeValue && rangeValue[1]} */}
          {max}
        </span>
      </div>

      <div className="px-1">
        <Slider
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={handleChange}
          valueLabelDisplay="auto"
          disableSwap
          sx={{ color: "#7CC5DE" }}
        />
      </div>

      <div className="flex w-full justify-center gap-1 text-center text-base text-gray-500 sm:text-sm lg:text-base">
        <span>
          {label}
          {/* {rangeValue && rangeValue[0]} */}
          {value && value[0]}
        </span>
        <span>-</span>
        <span>
          {label}
          {/* {rangeValue && rangeValue[1]} */}
          {value && value[1]}
        </span>
      </div>
    </div>
  );
}
