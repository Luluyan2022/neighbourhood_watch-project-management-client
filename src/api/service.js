

import axios from "axios";

const api = axios.create({
  
  baseURL: "http://localhost:5005/api"
  // withCredentials: true // => you might need this option if using cookies and sessions
});

const errorHandler = (err) => {
  throw err;
};

// const getSecondHandGoodsInfoFromAPI = () => {
//   return api.get("`${process.env.REACT_APP_API_URL}/api/secondHandGoods`")
//     .then((res) => res.data)
//     .catch(errorHandler);
// };

const uploadImage = (file) => {
  return api.post("/upload", file)
    .then(res => {
      return res.data
     
    })
    .catch(errorHandler);
};

// const createNewSecondHandObj = (newSecondHandObj) => {
//   return api.post(`${process.env.REACT_APP_API_URL}/api/secondHandGoods`, newSecondHandObj)
//     .then(res => res.data)
//     .catch(errorHandler);
// };

// eslint-disable-next-line
export default {uploadImage};
