import axios from "axios";

    export default {
        test : () => {
            return axios({ method: "GET", "url": "https://httpbin.org/ip" })
        }
    }