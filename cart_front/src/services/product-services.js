import axios from 'axios';
class ProductDataService {
    
        HOST_URL="http://127.0.0.1:8000"
    
    login(data) {
        return axios.post(`${this.HOST_URL}/token/`, data);
    }

    signup(data) {
        return axios.post(`${this.HOST_URL}/register/`, data);
    }
    getAll() {
        // axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        console.log(`${this.HOST_URL}/products/`)
        return axios.get(`${this.HOST_URL}/products/`);
    }
    getCart(token) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        return axios.get(`${this.HOST_URL}/carts/`);
    }
    async updateCartItem(id, data, token) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        return axios.put(`${this.HOST_URL}/cartitems/${id}/`, data);
    }

     deleteCartItem(id, token) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        return axios.delete(`${this.HOST_URL}/cartitems/${id}/`);
    }

     createCartItem(data, token) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        data.product_id = data.product.id
        return axios.post(`${this.HOST_URL}/cartitems/`, data);
    }
    async payCart(data, token) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        return axios.patch(`${this.HOST_URL}/carts/`, data);
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ProductDataService();