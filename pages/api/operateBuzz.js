const { server } = require("@/components/assets/constants");
import axios from "axios";
import toast from "react-hot-toast";
export const createBuzz = async (buzz) => {
  let data = {
    ...buzz,
    name: buzz.nm,
    total:
      buzz.price * buzz.qty -
      ((buzz.disc ? buzz.disc : 0) / 100) * (buzz.price * buzz.qty),
  };
  let res = await axios
    .post(`${server}/buzz/create`, data)
    .then((res) => {
      if (res.status === 201) {
        return "ok";
      }
      return "failed";
    })
    .catch((e) => "failed");
  return res;
};
export const updateBuzz = async (buzz,id) => {
  let data = {
    ...buzz,
    name: buzz.nm,
    total:
      buzz.price * buzz.qty -
      ((buzz.disc ? buzz.disc : 0) / 100) * (buzz.price * buzz.qty),
  };
  let res = await axios
    .put(`${server}/buzz/update/${id}`, data)
    .then((res) => {
      if (res.status === 200) {
        return "ok";
      }
      return "failed";
    })
    .catch((e) => "failed");
  return res;
};
export const getBuzzs = async (search) => {
  let { nm, from, upto, type } = search;
  let res = await axios
    .get(
      `${server}/buzz/getall/?name=${nm}&type=${type}`
    )
    .then((res) => res);
  if (res.status === 200) {
    return res.data;
  } else {
    return [];
  }
};

export const deleteBuzz = async (id) => {
  let res = await axios
    .delete(`${server}/buzz/delete/${id}`)
    .then((res) => res);
  return res;
};

export const getBuzz = async (id) => {
  let res = await axios.get(`${server}/buzz/getone/${id}`).then((res) => res);
  if (res.status === 200) {
    let data = res.data[0];
    return {
      nm: data.name,
      type: data.type,
      date: data.date,
      price: data.price,
      qty: data.qty,
      disc: data.disc,
    };
  }

  toast.error("something went wrong");
};
