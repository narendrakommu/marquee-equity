import axios from "axios";

const marqueeServer = axios.create({
//   baseURL: "http://localhost:5000", //dev
    baseURL: "https://marquee-equity-ws-backend.onrender.com",
});

export default marqueeServer;