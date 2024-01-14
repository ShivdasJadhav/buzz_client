import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { createBuzz } from "./api/operateBuzz";
import Link from "next/link";

function Newbuzz() {
  const [buzz, setBuzz] = useState({
    nm: "",
    type: "",
    date: "",
    price: "",
    qty: "",
    disc: "",
  });
  const handleChange = (e) => {
    setBuzz((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const postBuzz = async () => {
    let res = await createBuzz(buzz).then((res) => res);
    if (res === "ok") {
      setBuzz({
        nm: "",
        type: "",
        date: "",
        price: "",
        qty: "",
        disc: "",
      });
      toast.success("Transaction Saved!");
    } else {
      toast.error("Something went wrong!");
    }
  };
  const validate = () => {
    let { nm, type, date, price, qty, disc} = buzz;
    if (nm === "") {
      toast("Name is Required", { icon: "⚠️" });
      return;
    } else if (type === "") {
      toast("Transaction type is Required", { icon: "⚠️" });
      return;
    } else if (date === "") {
      toast("Date is Required", { icon: "⚠️" });
      return;
    } else if (price === "") {
      toast("Pricing is Required", { icon: "⚠️" });
      return;
    } else if (qty === "") {
      toast("Quantity is Required", { icon: "⚠️" });
      return;
    }
    postBuzz();
  };
  return (
    <div className="w-11/12 mx-auto">
      <Toaster />
      <Navbar />
      <h2 className="text-2xl my-4 text-center italic">New Transaction</h2>
      <div className="w-6/12 mx-auto py-6 flex flex-col border border-2 border-gray-300 rounded-xl">
        <div className="flex m-2 justify-center">
          <label className="mx-2 text-xl font-semibold w-3/12" htmlFor="nm">
            Name
          </label>
          <span className="mx-2">:</span>
          <input
            autoComplete="off"
            className="mx-2 text-xl italic px-2 outline-none focus:border-sky-500 bg-black text-white border-b-2 w-5/12"
            placeholder="item name"
            type="text"
            id="nm"
            name="nm"
            onChange={handleChange}
            value={buzz.nm}
          />
        </div>
        <div className="flex m-2 justify-center">
          <label className="mx-2 text-xl font-semibold w-3/12" htmlFor="type">
            Type
          </label>
          <span className="mx-2">:</span>
          <select
            className="mx-2 text-xl italic outline-none focus:border-sky-500 px-2 bg-black text-white border-b-2 w-5/12"
            placeholder=""
            type="tel"
            id="type"
            name="type"
            onChange={handleChange}
            value={buzz.type}
          >
            <option value={""}>None</option>
            <option value={"sold"}>Sold</option>
            <option value={"purchased"}>Purchased</option>
          </select>
        </div>
        <div className="flex m-2 justify-center">
          <label className="mx-2 text-xl font-semibold w-3/12" htmlFor="date">
            Date
          </label>
          <span className="mx-2">:</span>
          <input
            autoComplete="off"
            className="mx-2 text-xl italic px-2 outline-none focus:border-sky-500 bg-black text-white border-b-2 w-5/12"
            placeholder="item name"
            type="date"
            id="date"
            name="date"
            onChange={handleChange}
            value={buzz.date}
          />
        </div>
        <div className="flex m-2 justify-center">
          <label className="mx-2 text-xl font-semibold w-3/12" htmlFor="price">
            Price/unit
          </label>
          <span className="mx-2">:</span>
          <input
            autoComplete="off"
            className="mx-2 text-xl italic px-2 outline-none focus:border-sky-500 bg-black text-white border-b-2 w-5/12"
            placeholder="Rs. 00"
            type="tel"
            id="price"
            name="price"
            onChange={handleChange}
            value={buzz.price}
          />
        </div>
        <div className="flex m-2 justify-center">
          <label className="mx-2 text-xl font-semibold w-3/12" htmlFor="qty">
            Quantity
          </label>
          <span className="mx-2">:</span>
          <input
            autoComplete="off"
            className="mx-2 text-xl italic px-2 outline-none focus:border-sky-500 bg-black text-white border-b-2 w-5/12"
            placeholder="00"
            type="tel"
            id="qty"
            name="qty"
            onChange={handleChange}
            value={buzz.qty}
          />
        </div>
        <div className="flex m-2 justify-center">
          <label className="mx-2 text-xl font-semibold w-3/12" htmlFor="disc">
            Discount
          </label>
          <span className="mx-2">:</span>
          <input
            autoComplete="off"
            className="mx-2 text-xl italic px-2 outline-none focus:border-sky-500 bg-black text-white border-b-2 w-5/12"
            placeholder="0%"
            type="tel"
            id="disc"
            name="disc"
            onChange={handleChange}
            value={buzz.disc}
          />
        </div>
        <div className="flex m-2 justify-center">
          <label className="mx-2 text-xl font-semibold w-3/12" htmlFor="total">
            Total
          </label>
          <span className="mx-2">:</span>
          <input
            autoComplete="off"
            readOnly
            className="mx-2 text-xl italic px-2 outline-none focus:border-sky-500 bg-black bg-gray-900 rounded-md text-white border-b-2 w-5/12"
            placeholder="Rs. 00"
            type="tel"
            id="total"
            name="total"
            value={ buzz.price * buzz.qty -
              ((buzz.disc ? buzz.disc : 0) / 100) * (buzz.price * buzz.qty)}
          />
        </div>
        <div className="bg-gray-200 h-[2px] w-9/12 mx-auto my-2"></div>
        <div className="w-fit mx-auto">
          <Link
            href={"/"}
            className="mr-2 w-32 inline-block text-center px-10 border border-gray-300 border-2 rounded-md py-1 px-3 bg-gray-800"
          >
            Home
          </Link>
          <button
            onClick={() => validate()}
            className="ml-2 w-32 flex-1 border border-sky-500 border-2 rounded-md py-1 px-3 bg-gray-800 "
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Newbuzz;
