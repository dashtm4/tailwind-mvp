import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { DateRangePicker } from "react-date-range";
import { format } from "date-fns";
import random from "random";

import BaseMenu from "../../components/BaseMenu";
import { getDateRange, getProductRange } from "../../utils";
import { CHART_DATASET } from "../../constants";

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
  const [products, setProducts] = useState([
    { name: "Product 1", values: [] as number[] },
    { name: "Product 2", values: [] as number[] },
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

    products.map((product) => {
      labels.map((label, labelIndex) => {
        const { min, max } = getProductRange(product.values[labelIndex], delta);
        minDataSet.data.push(min);
        maxDataSet.data.push(max);

        currentDay === label && (delta = 5);
        return false;
      });
    });

    const datasets = [minDataSet, maxDataSet];

    setChartData({ labels, datasets });
  }, [products]);

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
        <div className="p-6 pt-1 bg-white rounded-lg shadow-xl ">
          <DateRangePicker
            ranges={[dateRange]}
            onChange={handleSelectDateRange}
          />
        </div>

        <Line type="line" data={chartData} />
      </div>

      <div className="px-10">
        <BaseMenu
          options={PRODUCTS_LIST}
          selectedId={selectedProduct}
          placeholder="Product Selector"
          onSelect={handleSelectMenu}
        />
        <table className="bg-white shadow-lg">
          <tr>
            <th className="px-4 py-2 text-left text-white bg-blue-500 border">
              Date
            </th>
            <th className="px-4 py-2 text-left text-white bg-blue-500 border">
              Product
            </th>
            <th className="px-4 py-2 text-left text-white bg-blue-500 border">
              Value
            </th>
          </tr>
          {products.map((product, productIndex) =>
            chartData.labels.map((label, labelIndex) => (
              <tr key={`${productIndex}-${labelIndex}`}>
                <td className="px-4 py-2 border">{label}</td>
                <td className="px-4 py-2 border">{product.name}</td>
                <td className="px-4 py-2 border">
                  {product.values[labelIndex] || 0}
                </td>
              </tr>
            ))
          )}
        </table>
        <input
          className="w-full px-4 text-sm text-white transition-colors duration-150 bg-blue-500 rounded-lg cursor-pointer h-9 focus:shadow-outline hover:bg-blue-600"
          type="button"
          value="Randomize"
          onClick={() => randomize(-1)}
        />
      </div>
    </section>
  );
};

export default Main;
