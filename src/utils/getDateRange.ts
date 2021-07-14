import { addDays, format, differenceInDays } from "date-fns";

const getDateRange = (startDate: Date, endDate: Date) => {
  const days = differenceInDays(endDate, startDate);

  return [...Array(days + 1).keys()].map((i) =>
    format(addDays(startDate, i), "yyyy-MM-dd")
  );
};

export default getDateRange;
