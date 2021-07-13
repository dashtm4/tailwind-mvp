import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { DateRangePicker } from "react-date-range";

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "First dataset",
      data: [33, 53, 85, 41, 44, 65],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",
    },
    {
      label: "Second dataset",
      data: [33, 25, 35, 51, 54, 76],
      fill: false,
      borderColor: "#742774",
    },
  ],
};

const Main = () => {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  useEffect(() => {});

  const handleSelect = (ranges: any) => {
    setDateRange(ranges.range1);
  };

  return (
    <section>
      <div className="p-6 pt-1 bg-white rounded-lg shadow-xl ">
        <DateRangePicker ranges={[dateRange]} onChange={handleSelect} />
      </div>
      <input
        className="h-8 px-4 text-sm text-white transition-colors duration-150 bg-indigo-700 rounded-lg cursor-pointer focus:shadow-outline hover:bg-indigo-800"
        type="submit"
        value="Input"
      />
      <Line type="line" data={data} />
      <table className="bg-white shadow-lg">
        <tr>
          <th className="px-8 py-4 text-left text-white bg-indigo-700 border">
            Date
          </th>
          <th className="px-8 py-4 text-left text-white bg-indigo-700 border">
            Product
          </th>
          <th className="px-8 py-4 text-left text-white bg-indigo-700 border">
            Value
          </th>
        </tr>
        <tr>
          <td className="px-8 py-4 border">2021-12-12</td>
          <td className="px-8 py-4 border">1</td>
          <td className="px-8 py-4 border">10</td>
        </tr>
      </table>
    </section>
  );
};

export default Main;
