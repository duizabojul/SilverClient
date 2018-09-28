import axios from "axios";
    const headers = { 'Accept': 'application/json', 'Authorization': 'Basic Y29tcHRlLWFwcGxpY2F0aW9uQHNpbHZlci1zbW9rLmNvbTo0R0FVWVpCRlo2OE1ZRDRINk42U0tVU1U3MzE3NDZNWUROSQ==', 'Content-Type': 'application/x-www-form-urlencoded' }
    export default {
        customer_details : (id:Number) => {
            return new Promise((resolve, reject) => {
                axios({ method: "GET", headers, url: `https://silversmok.hiboutik.com/api/customer/${id}` }).then(data => {
                    if(data && data.data){
                        const customerDetails = data.data[0]
                        resolve(customerDetails)
                    } else {
                        reject()
                    }
                }).catch(reject)
            })
        }
    }