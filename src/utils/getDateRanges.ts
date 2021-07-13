import { addDays, format, differenceInDays } from "date-fns";

const getDateRanges = (startDate: Date, endDate: Date) => {
  const days = differenceInDays(endDate, startDate);

  return [...Array(days + 1).keys()].map((i) =>
    format(addDays(startDate, i), "yyyy-MM-dd")
  );
};

export default getDateRanges;
