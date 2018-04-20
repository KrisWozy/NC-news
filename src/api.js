import axios from 'axios'

const api = {
    ncURL: `https://kris-ncnews.herokuapp.com/api`,
    getTopics : () => {
        return axios.get(`${api.ncURL}/topics`)
    },
    getUser : (user) => {
        return axios.get(`${api.ncURL}/users/${user}`)
    },
    articleVotePut : (id, value) => {
        return axios.put(`${api.ncURL}/articles/${id}/?vote=${value}`)
    },
    getComments : (id) => {
        return axios.get(`${api.ncURL}/articles/${id}/comments`)
    },
    commentVotePut : (id, value) => {
        return axios.put(`${api.ncURL}/comments/${id}/?vote=${value}`)
    },
    postNewComment : (id, comment) => {
        return axios.post(`${api.ncURL}/articles/${id}/comments`, comment)
    },
    deleteCommentRequest : (id) => {
        return axios.delete(`${api.ncURL}/comments/${id}`)
    }
}

export default api