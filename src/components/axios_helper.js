import axios from "axios";

const axios_helper = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
        "Content-type": "application/json"
    }
});

export default axios_helper