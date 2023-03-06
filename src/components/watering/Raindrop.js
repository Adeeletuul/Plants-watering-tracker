import React, { useMemo } from "react";
import moment from "moment";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

export const days = {
  1: 28,
  2: 14,
  3: 10,
  4: 7,
};

const Raindrop = ({ plant, frequency, nextWaterDay }) => {
  const teardropFill = useMemo(() => {
    if (plant.lastWater === null) {
      return 0;
    }

    const daysTil = moment(nextWaterDay).diff(moment(), "days");
    console.log(daysTil, days[frequency]);

    const gradiant_percentage = (daysTil / days[frequency]) * 100;
    return gradiant_percentage;
  }, [plant.lastWater, frequency, nextWaterDay]);

  return (
    <div>
      {teardropFill > 0 && (
        <svg height={60} width={40}>
          <defs>
            <linearGradient id="grad" y1="100%" x2="0%">
              <stop offset={`0%`} stopColor="lightblue" />
              <stop offset={`${teardropFill}%`} stopColor="lightblue" />
              <stop offset={`${teardropFill}%`} stopColor="white" />
              <stop offset={`100%`} stopColor="white" />
            </linearGradient>
          </defs>

          <path
            id="tear"
            className="tear"
            d="M15 6
                Q 15 6, 25 18
                A 12.8 12.8 0 1 1 5 18
                Q 15 6 15 6z"
            fill="url(#grad)"
          />
        </svg>
      )}
      {teardropFill <= 0 && (
        <PriorityHighIcon color="error" sx={{ fontSize: 40 }} />
      )}
    </div>
  );
};

export default Raindrop;
