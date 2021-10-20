import axios from "axios";

const axios_helper = axios.create({
    baseURL: "https://react-stock-prediction.herokuapp.com/api",
    headers: {
        "Content-type": "application/json"
    }
});

export default axios_helper