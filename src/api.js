import axios from 'axios'

const api = {
    getData : () => {
        return axios.get(`https://kris-ncnews.herokuapp.com/api/`)
    }
}

export default api