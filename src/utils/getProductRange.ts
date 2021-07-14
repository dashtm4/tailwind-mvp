import { RANGE } from "../constants";

const getProductRange = (value: number, percent: number) => {
  const delta = ((RANGE.max - RANGE.min) * percent) / 100;

  return {
    min: value - delta,
    max: value + delta,
  };
};

export default getProductRange;
