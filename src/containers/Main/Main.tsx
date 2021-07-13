import { useState, useEffect, Fragment } from "react";
import { Line } from "react-chartjs-2";
import { DateRangePicker } from "react-date-range";
import random from "random";
import { format } from "date-fns";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

import { getDateRanges } from "../../utils";

const CHART_BORDER_COLOR = "#3B82F6";
const CHART_BG_COLOR = "#60A5FA32";

const CHART_DATASET = {
  fill: 1,
  backgroundColor: CHART_BG_COLOR,
  borderColor: CHART_BORDER_COLOR,
  data: [] as number[],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

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
  const [selectedProduct, setProduct] = useState([
    "Both",
    "Product 1",
    "Product 2",
  ]);

  useEffect(() => {
    const { startDate, endDate } = dateRange;
    const minDataSet = { label: "min", ...CHART_DATASET };
    const maxDataSet = { label: "max", ...CHART_DATASET };
    const currentDay = format(new Date(), "yyyy-MM-dd");
    const labels: string[] = getDateRanges(startDate, endDate);

    let delta = 0;
    minDataSet.data = [];
    maxDataSet.data = [];

    labels.map((label) => {
      const value = random.int(0, 100);
      currentDay === label && (delta = 5);
      minDataSet.data.push(value - delta);
      maxDataSet.data.push(value + delta);
    });

    const datasets = [minDataSet, maxDataSet];

    setChartData({ labels, datasets });
  }, [dateRange]);

  const handleSelect = (ranges: any) => {
    setDateRange(ranges.range1);
  };

  return (
    <section className="flex flex-wrap p-5">
      <div className="px-10">
        <div className="p-6 pt-1 bg-white rounded-lg shadow-xl ">
          <DateRangePicker ranges={[dateRange]} onChange={handleSelect} />
        </div>

        <Line type="line" data={chartData} />
      </div>

      <div className="px-10">
        <input
          className="h-8 px-4 text-sm text-white transition-colors duration-150 bg-blue-500 rounded-lg cursor-pointer focus:shadow-outline hover:bg-blue-600"
          type="submit"
          value="Input"
        />
        <Menu as="div" className="relative inline-block text-left">
          {({ open }) => (
            <>
              <div>
                <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                  Product Selector
                  <ChevronDownIcon
                    className="w-5 h-5 ml-2 -mr-1"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  static
                  className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div className="py-1">
                    {selectedProduct.map((product, productIndex) => (
                      <Menu.Item key={productIndex}>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            {product}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
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
          <tr>
            <td className="px-4 py-2 border">2021-12-12</td>
            <td className="px-4 py-2 border">1</td>
            <td className="px-4 py-2 border">10</td>
          </tr>
        </table>
      </div>
    </section>
  );
};

export default Main;
