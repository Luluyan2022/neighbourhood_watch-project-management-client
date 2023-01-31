

import axios from "axios";

const api = axios.create({
  
  baseURL: process.env.REACT_APP_API_URL + "/api"
  // withCredentials: true // => you might need this option if using cookies and sessions
});

const errorHandler = (err) => {
  throw err;
};



const uploadImage = (file) => {
  return api.post("/upload", file)
    .then(res => {
      return res.data
     
    })
    .catch(errorHandler);
};



// eslint-disable-next-line
export default {uploadImage};
