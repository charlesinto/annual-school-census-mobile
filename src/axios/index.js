import axios from "axios";

const Axios = axios.create({
  baseURL: "https://school-census.herokuapp.com",
  // baseURL: "10.0.2.2",
});

export default Axios;
