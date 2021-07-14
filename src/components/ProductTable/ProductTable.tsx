import { IProducts } from "../../types";

interface IProps {
  products: IProducts;
  dates: string[];
}

const ProductTable = ({ products, dates }: IProps) => {
  return (
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
        dates.map((label, labelIndex) => (
          <tr key={`${productIndex}-${labelIndex}`}>
            <td className="px-4 py-2 border">{label}</td>
            <td className="px-4 py-2 border">{product.name}</td>
            <td className="px-4 py-2 border">
              {product.values[labelIndex] || 0}
            </td>
          </tr>
        ))
      )}
      {dates.length === 0 && (
        <tr>
          <td colSpan={3} className="px-4 py-2 text-center border">
            No Data
          </td>
        </tr>
      )}
    </table>
  );
};

export default ProductTable;
