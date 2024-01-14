import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { getBuzzs, deleteBuzz } from "./api/operateBuzz";
const index = () => {
  const [buzzs, setBuzzs] = useState(null);
  const [search, setSearch] = useState({
    nm: "",
    type: "",
  });
  const handleChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };
  const setData = async () => {
    setBuzzs(await getBuzzs(search).then((res) => res));
  };
  const itemDel = async (id) => {
    let res = await deleteBuzz(id).then((res) => res);
    res.status === 200
      ? toast.success("Transaction Deleted")
      : toast.error("Something went wrong!");
    setData();
  };
  useEffect(() => {
    setData();
  }, [search]);
  return (
    <div className="w-11/12 mx-auto">
      <Toaster />
      <Navbar />
      <div>
        <div className="w-full mx-auto py-6 flex flex-wrap justify-center rounded-xl">
          <div className="flex m-2 justify-center">
            <label
              className="mx-2 text-md font-semibold w-fit whitespace-nowrap"
              htmlFor="nm"
            >
              Name
            </label>
            <span className="mx-2">:</span>
            <input
              autoComplete="off"
              className="mx-2 text-md italic px-2 outline-none focus:border-sky-500 bg-black text-white border-b-2 w-32"
              placeholder="item name"
              type="text"
              id="nm"
              name="nm"
              onChange={handleChange}
              value={search.nm}
            />
          </div>
          <div className="flex m-2 justify-center">
            <label
              className="mx-2 text-md font-semibold w-fit whitespace-nowrap"
              htmlFor="type"
            >
              Type
            </label>
            <span className="mx-2">:</span>
            <select
              className="mx-2 text-md italic outline-none focus:border-sky-500 px-2 bg-black text-white border-b-2 w-32"
              placeholder=""
              type="tel"
              id="type"
              name="type"
              onChange={handleChange}
              value={search.type}
            >
              <option value={""}>all</option>
              <option value={"sold"}>Sold</option>
              <option value={"purchased"}>Purchased</option>
            </select>
          </div>
        </div>
        <div className="w-fit mx-auto">
          <div>
            <Link
              className="text-xl w-fit block float-right border rounded-md border-sky-500 font-semibold py-1 my-1 px-4"
              href={"/newbuzz"}
            >
              New +
            </Link>
          </div>
          <table className=" ">
            <thead className="p-2 border sticky top-0 bg-gray-800 rounded-xl">
              <tr className="">
                <th className="text-2xl font-semibold p-4 ml-2 ">Sr.</th>
                <th className="text-2xl font-semibold p-4 ml-2 ">Item Name</th>
                <th className="text-2xl font-semibold p-4 ml-2 ">Price/unit</th>
                <th className="text-2xl font-semibold p-4 ml-2 ">Quantity</th>
                <th className="text-2xl font-semibold p-4 ml-2 ">Discount</th>
                <th className="text-2xl font-semibold p-4 ml-2 ">Total</th>
                <th className="text-2xl font-semibold p-4 ml-2 ">Edit</th>
                <th className="text-2xl font-semibold p-4 ml-2 ">Delete</th>
              </tr>
            </thead>
            <tbody>
              {buzzs &&
                buzzs.map((item, i) => (
                  <tr className="border border-b-1 border-x-0 border-t-0 hover:border-sky-500">
                    <td className="p-4 ml-2 bg-gray-500 border-none text-xl">
                      {i + 1}
                    </td>
                    <td className="p-4 ml-2 bg-gray-500 border-none text-xl">
                      {item.name}
                    </td>
                    <td className="p-4 ml-2 bg-gray-500 border-none text-xl">
                      {item.price}
                    </td>
                    <td className="p-4 ml-2 bg-gray-500 border-none text-xl">
                      {item.qty}
                    </td>
                    <td className="p-4 ml-2 bg-gray-500 border-none text-xl">
                      {item.disc ? item.disc : 0}%
                    </td>
                    <td className="p-4 ml-2 bg-gray-500 border-none text-xl">
                      <i>Rs.</i> {item.total}
                    </td>
                    <td className="p-4 ml-2 bg-gray-500 border-none text-xl">
                      <Link href={`/editbuzz/${item._id}`}>
                        <svg
                          className="hover:cursor-pointer"
                          xmlns="http://www.w3.org/2000/svg"
                          height="22"
                          width="22"
                          viewBox="0 0 512 512"
                          fill="#ffffff"
                        >
                          <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                        </svg>
                      </Link>
                    </td>
                    <td className="p-4 ml-2 bg-gray-500 border-none text-xl">
                      <svg
                        onClick={() => itemDel(item._id)}
                        className="hover:cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        height="22"
                        width="20"
                        viewBox="0 0 448 512"
                        fill="#ffff2d"
                      >
                        <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                      </svg>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default index;
