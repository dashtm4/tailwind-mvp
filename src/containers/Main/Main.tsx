import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { DateRangePicker } from "react-date-range";
import { format } from "date-fns";
import random from "random";

import BaseMenu from "../../components/BaseMenu";
import ProductTable from "../../components/ProductTable";
import { getDateRange, getProductRange } from "../../utils";
import { CHART_DATASET } from "../../constants";
import { IProduct, IProducts } from "../../types";

const PRODUCTS_LIST = ["Both", "Product 1", "Product 2"];

const Main = () => {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [
      { label: "min", ...CHART_DATASET },
      { label: "max", ...CHART_DATASET },
    ],
  });
  const [products, setProducts] = useState<IProducts>([
    { name: "Product 1", values: [] },
    { name: "Product 2", values: [] },
  ]);
  const [selectedProduct, setProduct] = useState<number | null>(null);

  useEffect(() => {
    const { startDate, endDate } = dateRange;
    const { datasets } = chartData;
    const labels: string[] = getDateRange(startDate, endDate);

    setChartData({ labels, datasets });
    randomize(labels.length);
  }, [dateRange]);

  useEffect(() => {
    const { labels } = chartData;
    const minDataSet = { label: "min", ...CHART_DATASET };
    const maxDataSet = { label: "max", ...CHART_DATASET };
    const currentDay = format(new Date(), "yyyy-MM-dd");

    let delta = 0;
    minDataSet.data = [];
    maxDataSet.data = [];

    labels.map((label, labelIndex) => {
      if (selectedProduct == null) {
        return false;
      }

      const value =
        selectedProduct === 0
          ? products.reduce(
              (acc: number, curr: IProduct) => acc + curr.values[labelIndex],
              0
            )
          : products[selectedProduct - 1].values[labelIndex];

      const { min, max } = getProductRange(value, delta);
      minDataSet.data.push(min);
      maxDataSet.data.push(max);

      currentDay === label && (delta = 5);
      return true;
    });

    const datasets = [minDataSet, maxDataSet];

    setChartData({ labels, datasets });
  }, [products, selectedProduct]);

  const handleSelectDateRange = (ranges: any) => {
    setDateRange(ranges.range1);
  };

  const handleSelectMenu = (index: number) => () => {
    setProduct(index);
  };

  const randomize = (len: number) => {
    const updatedProducts = products.map(({ name, values }) => {
      const updatedProductsLen = len === -1 ? values.length : len;
      return {
        name: name,
        values: [...Array(updatedProductsLen)].map(() => random.int(0, 100)),
      };
    });
    setProducts(updatedProducts);
  };

  return (
    <section className="flex flex-wrap p-5">
      <div className="px-10">
        <div className="p-6 mb-5 bg-white rounded-lg shadow-xl ">
          <DateRangePicker
            ranges={[dateRange]}
            onChange={handleSelectDateRange}
          />
        </div>
        <div className="mb-5">
          <Line type="line" data={chartData} />
        </div>
      </div>

      <div className="px-10">
        <div className="mb-5">
          <BaseMenu
            options={PRODUCTS_LIST}
            selectedId={selectedProduct}
            placeholder="Product Selector"
            onSelect={handleSelectMenu}
          />
        </div>
        <div className="mb-5">
          <ProductTable products={products} dates={chartData.labels} />
        </div>
        <div className="mb-5">
          <input
            className="w-full px-4 text-sm text-white transition-colors duration-150 bg-blue-500 rounded-lg cursor-pointer h-9 focus:shadow-outline hover:bg-blue-600"
            type="button"
            value="Randomize"
            onClick={() => randomize(-1)}
          />
        </div>
      </div>
    </section>
  );
};

export default Main;
